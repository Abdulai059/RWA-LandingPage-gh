"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getStaff, logAudit, requireStaff } from "@/lib/auth";
import { STATUS_VALUES } from "@/lib/config";

export type LoginState = { error?: string };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  if (!supabase) return { error: "The admin portal is not configured yet." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };

  const staff = await getStaff();
  if (!staff) {
    await supabase.auth.signOut();
    return { error: "This account does not have access to the admin portal." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function updateSubmission(formData: FormData) {
  const staff = await requireStaff();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const notes = String(formData.get("internal_notes") ?? "").slice(0, 5000);

  if (!/^[0-9a-f-]{36}$/i.test(id) || !STATUS_VALUES.includes(status)) {
    redirect("/admin");
  }

  const supabase = await createClient();
  if (!supabase) redirect("/admin/login");

  const { data: before } = await supabase
    .from("submissions")
    .select("status, internal_notes")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("submissions")
    .update({
      status,
      internal_notes: notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/submissions/${id}?error=1`);
  }

  if (before?.status !== status) {
    await logAudit(staff, "status_changed", id, { from: before?.status, to: status });
  }
  if ((before?.internal_notes ?? "") !== notes) {
    await logAudit(staff, "notes_updated", id);
  }

  revalidatePath("/admin");
  redirect(`/admin/submissions/${id}?saved=1`);
}
