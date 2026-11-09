import Link from "next/link";
import { notFound } from "next/navigation";
import { logAudit, requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { STATUSES, statusMeta } from "@/lib/config";
import { updateSubmission } from "@/actions/admin";
import type { AuditEntry, Submission } from "@/lib/types";

const UUID_RE = /^[0-9a-f-]{36}$/i;

function bytes(n: number | null) {
  if (!n) return "";
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
}

export default async function SubmissionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const staff = await requireStaff();
  const { id } = await params;
  const { saved, error } = await searchParams;
  if (!UUID_RE.test(id)) notFound();

  const supabase = await createClient();
  if (!supabase) notFound();

  const { data } = await supabase.from("submissions").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const s = data as Submission;

  const { data: audit } = await supabase
    .from("audit_logs")
    .select("id, actor_email, action, details, created_at")
    .eq("submission_id", id)
    .order("created_at", { ascending: false })
    .limit(50);

  await logAudit(staff, "viewed", id);
  const meta = statusMeta(s.status);

  return (
    <div className="space-y-8">
      <Link href="/admin" className="text-sm underline">&larr; All submissions</Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-ink/60">{s.ref}</p>
          <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight">{s.title}</h1>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${meta.tone}`}>{meta.label}</span>
      </div>

      {saved && <p role="status" className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">Changes saved.</p>}
      {error && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">Couldn&apos;t save changes. Please try again.</p>}

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/55">Abstract</h2>
            <p className="whitespace-pre-wrap leading-7">{s.abstract}</p>
            <p className="mt-4 text-sm text-ink/70"><strong>Keywords:</strong> {s.keywords.join(", ")}</p>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/55">Declarations</h2>
            <ul className="space-y-2 text-sm">
              <li>Original and not under review elsewhere: <strong>{s.declarations.originality ? "Confirmed" : "No"}</strong></li>
              <li>All authors consent: <strong>{s.declarations.consent ? "Confirmed" : "No"}</strong></li>
              <li>Funding: {s.declarations.funding}</li>
              <li>Conflict of interest: {s.declarations.conflict}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/55">Activity</h2>
            <ul className="space-y-2 text-sm">
              {(audit as AuditEntry[] | null)?.map((a) => (
                <li key={a.id} className="flex flex-wrap justify-between gap-2 border-b border-ink/5 pb-2">
                  <span>
                    <strong>{a.action.replace(/_/g, " ")}</strong>
                    {a.details && Object.keys(a.details).length > 0 && (
                      <span className="text-ink/60"> {JSON.stringify(a.details)}</span>
                    )}
                  </span>
                  <span className="text-ink/55">{a.actor_email}, {new Date(a.created_at).toLocaleString("en-GB")}</span>
                </li>
              ))}
              {!audit?.length && <li className="text-ink/55">No activity yet.</li>}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-ink/10 bg-white p-6 text-sm">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/55">Author</h2>
            <p className="font-semibold">{s.author_name}</p>
            <p><a className="underline" href={`mailto:${s.email}`}>{s.email}</a></p>
            <p>{s.institution || "Independent"}, {s.country}</p>
            <p className="mt-3 text-ink/60">Track: {s.track}</p>
            <p className="text-ink/60">Submitted: {new Date(s.created_at).toLocaleString("en-GB")}</p>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-white p-6 text-sm">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/55">Manuscript</h2>
            {s.file_path ? (
              <>
                <p className="mb-3 break-all">{s.file_name} <span className="text-ink/55">({bytes(s.file_size)})</span></p>
                <a href={`/admin/submissions/${s.id}/file`}
                  className="inline-block rounded-full bg-ink px-5 py-2 font-semibold text-brand">
                  Download
                </a>
                <p className="mt-2 text-xs text-ink/55">Link expires after 60 seconds. Downloads are logged.</p>
              </>
            ) : (
              <p className="text-ink/55">No file attached.</p>
            )}
          </section>

          <form action={updateSubmission} className="space-y-4 rounded-2xl border border-ink/10 bg-white p-6 text-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink/55">Screening &amp; decision</h2>
            <input type="hidden" name="id" value={s.id} />
            <div>
              <label htmlFor="status" className="mb-1 block font-semibold">Status</label>
              <select id="status" name="status" defaultValue={s.status} className="w-full rounded-lg border border-ink/20 px-3 py-2">
                {STATUSES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="internal_notes" className="mb-1 block font-semibold">Internal notes</label>
              <textarea id="internal_notes" name="internal_notes" rows={5} maxLength={5000}
                defaultValue={s.internal_notes ?? ""} className="w-full rounded-lg border border-ink/20 px-3 py-2" />
              <p className="mt-1 text-xs text-ink/55">Never shown to authors.</p>
            </div>
            <button type="submit" className="rounded-full bg-ink px-6 py-2.5 font-semibold text-brand">Save changes</button>
          </form>
        </aside>
      </div>
    </div>
  );
}
