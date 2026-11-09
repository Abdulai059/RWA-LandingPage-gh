"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { createServiceClient, MANUSCRIPT_BUCKET } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { LIMITS, SITE, getSubmissionWindow } from "@/lib/config";
import {
  safeFileName,
  validatePaperFile,
  validateSubmissionFields,
  type FieldErrors,
} from "@/lib/validation";
import { escapeHtml, sendEmail } from "@/lib/email";

export type SubmitState = {
  errors?: FieldErrors;
  message?: string;
  values?: Record<string, string>;
};

export async function submitPaper(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  // Honeypot: real users never see or fill this field. Pretend success to bots.
  if (typeof formData.get("website") === "string" && formData.get("website")) {
    redirect("/submit/success");
  }

  const submissionWindow = getSubmissionWindow();
  if (!submissionWindow.open) return { message: submissionWindow.reason };

  const supabase = createServiceClient();
  if (!supabase || !isSupabaseConfigured()) {
    return {
      message:
        "The submission system is not available yet. Please try again later or contact the Secretariat.",
    };
  }

  const { errors, values, data } = validateSubmissionFields(formData);
  const file = formData.get("paper");
  const fileCheck = await validatePaperFile(file);
  if (fileCheck.error) errors.paper = fileCheck.error;

  if (Object.keys(errors).length > 0 || !(file instanceof File)) {
    return { errors, values, message: "Please fix the highlighted fields." };
  }

  // Light abuse guard: limit submissions per email address per 24h.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("email", data.email)
    .gte("created_at", since);
  if ((count ?? 0) >= LIMITS.maxPerEmailPerDay) {
    return {
      values,
      message: "Too many submissions from this email address today. Please try again tomorrow.",
    };
  }

  // 1. Upload the manuscript to the private bucket under a random path.
  const id = randomUUID();
  const path = `${id}/paper.${fileCheck.ext}`;
  const { error: uploadError } = await supabase.storage
    .from(MANUSCRIPT_BUCKET)
    .upload(path, Buffer.from(await file.arrayBuffer()), {
      contentType: fileCheck.mime,
      upsert: false,
    });
  if (uploadError) {
    console.error("manuscript upload failed", uploadError.message);
    return { values, message: "We couldn’t upload your file. Please try again." };
  }

  // 2. Save the record. Roll the file back if this fails.
  const { data: row, error: insertError } = await supabase
    .from("submissions")
    .insert({
      id,
      author_name: data.author_name,
      email: data.email,
      institution: data.institution,
      country: data.country,
      title: data.title,
      track: data.track,
      abstract: data.abstract,
      keywords: data.keywords,
      declarations: {
        originality: data.originality,
        consent: data.consent,
        funding: data.funding,
        conflict: data.conflict,
      },
      file_path: path,
      file_name: safeFileName(file.name),
      file_size: file.size,
      file_type: fileCheck.mime,
    })
    .select("ref")
    .single();

  if (insertError || !row) {
    console.error("submission insert failed", insertError?.message);
    await supabase.storage.from(MANUSCRIPT_BUCKET).remove([path]);
    return { values, message: "We couldn’t save your submission. Please try again." };
  }

  // 3. Confirmation email (best effort: never blocks the submission).
  const ref = row.ref as string;
  await sendEmail({
    to: data.email,
    subject: `${SITE.name}: submission received (${ref})`,
    text: [
      `Dear ${data.author_name},`,
      ``,
      `Thank you for submitting to ${SITE.fullName} (${SITE.name}).`,
      ``,
      `Reference: ${ref}`,
      `Title: ${data.title}`,
      `Track: ${data.track}`,
      ``,
      `Please quote this reference in any correspondence. Your paper will go through editorial screening, and selected full papers will enter double-blind peer review. We will contact you by email about next steps.`,
      ``,
      `${SITE.name} Secretariat`,
    ].join("\n"),
    html: `<p>Dear ${escapeHtml(data.author_name)},</p>
<p>Thank you for submitting to ${escapeHtml(SITE.fullName)} (${escapeHtml(SITE.name)}).</p>
<p><strong>Reference:</strong> ${escapeHtml(ref)}<br><strong>Title:</strong> ${escapeHtml(data.title)}<br><strong>Track:</strong> ${escapeHtml(data.track)}</p>
<p>Please quote this reference in any correspondence. Your paper will go through editorial screening, and selected full papers will enter double-blind peer review. We will contact you by email about next steps.</p>
<p>${escapeHtml(SITE.name)} Secretariat</p>`,
  });

  redirect(`/submit/success?ref=${encodeURIComponent(ref)}`);
}
