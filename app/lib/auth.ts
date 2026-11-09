import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Staff = {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "editor";
};

/** Returns the signed-in staff member, or null. Verifies the session with Supabase Auth. */
export const getStaff = cache(async (): Promise<Staff | null> => {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? "",
    name: profile.full_name,
    role: profile.role,
  };
});

/** Use at the top of every admin page, server action and route handler. */
export async function requireStaff(): Promise<Staff> {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

export async function logAudit(
  staff: Staff,
  action: string,
  submissionId: string | null,
  details: Record<string, unknown> = {},
) {
  const supabase = await createClient();
  if (!supabase) return;
  await supabase.from("audit_logs").insert({
    actor_id: staff.id,
    actor_email: staff.email,
    action,
    submission_id: submissionId,
    details,
  });
}
