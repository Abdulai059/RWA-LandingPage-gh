"use server";

import { createServiceClient } from "@/lib/supabase/admin";
import { validateContact, type FieldErrors } from "@/lib/validation";
import { escapeHtml, sendEmail } from "@/lib/email";

export type ContactState = {
  errors?: FieldErrors;
  message?: string;
  values?: Record<string, string>;
  ok?: boolean;
};

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (formData.get("website")) return { ok: true }; // honeypot

  const { errors, values } = validateContact(formData);
  if (Object.keys(errors).length > 0) {
    return { errors, values, message: "Please fix the highlighted fields." };
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return { values, message: "The contact form is not available yet. Please email the Secretariat." };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: values.name,
    email: values.email,
    subject: values.subject || null,
    message: values.message,
  });
  if (error) {
    console.error("contact insert failed", error.message);
    return { values, message: "We couldn’t send your message. Please try again." };
  }

  const to = process.env.SECRETARIAT_EMAIL;
  if (to) {
    await sendEmail({
      to,
      replyTo: values.email,
      subject: `ARWATS 2027 contact: ${values.subject || "New message"}`,
      text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(values.name)} &lt;${escapeHtml(values.email)}&gt;</p><p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p>`,
    });
  }

  return { ok: true };
}
