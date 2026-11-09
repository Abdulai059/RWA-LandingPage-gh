import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { STATUSES, TRACK_NAMES, statusMeta } from "@/lib/config";
import { filteredSubmissions, filtersToQuery, parseFilters } from "@/lib/submission-query";

const PAGE_SIZE = 25;

type Row = {
  id: string; ref: string; author_name: string; email: string; institution: string | null;
  country: string; title: string; track: string; status: string; created_at: string;
};

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireStaff();
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const pageParam = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page);
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const supabase = await createClient();
  if (!supabase) return <p>Admin portal is not configured.</p>;

  const [list, ...counts] = await Promise.all([
    filteredSubmissions(
      supabase,
      "id, ref, author_name, email, institution, country, title, track, status, created_at",
      filters,
      { count: "exact" },
    )
      .order("created_at", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1),
    ...STATUSES.map((s) =>
      supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", s.value),
    ),
  ]);

  const rows = (list.data ?? []) as unknown as Row[];
  const total = list.count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const allCount = counts.reduce((n, c) => n + (c.count ?? 0), 0);
  const qs = (extra: Record<string, string>) => filtersToQuery(filters, extra);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Submissions</h1>
          <p className="text-ink/60">{allCount} total</p>
        </div>
        <a
          href={`/admin/export?${filtersToQuery(filters)}`}
          className="rounded-full border border-ink px-5 py-2 text-sm font-semibold hover:bg-ink hover:text-brand"
        >
          Export CSV{total !== allCount ? ` (${total} filtered)` : ""}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {STATUSES.map((s, i) => (
          <Link
            key={s.value}
            href={`/admin?status=${s.value}`}
            className="rounded-xl border border-ink/10 bg-white p-4 hover:border-ink"
          >
            <p className="text-2xl font-black">{counts[i]?.count ?? 0}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">{s.label}</p>
          </Link>
        ))}
      </div>

      <form method="get" className="grid gap-3 rounded-2xl border border-ink/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-6">
        <input name="q" defaultValue={filters.q} placeholder="Search title, author, email, ref"
          className="rounded-lg border border-ink/20 px-3 py-2 lg:col-span-2" aria-label="Search" />
        <select name="status" defaultValue={filters.status} className="rounded-lg border border-ink/20 px-3 py-2" aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select name="track" defaultValue={filters.track} className="rounded-lg border border-ink/20 px-3 py-2" aria-label="Track">
          <option value="">All tracks</option>
          {TRACK_NAMES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="date" name="from" defaultValue={filters.from} className="rounded-lg border border-ink/20 px-3 py-2" aria-label="From date" />
        <input type="date" name="to" defaultValue={filters.to} className="rounded-lg border border-ink/20 px-3 py-2" aria-label="To date" />
        <div className="flex gap-2 sm:col-span-2 lg:col-span-6">
          <button type="submit" className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-brand">Apply filters</button>
          <Link href="/admin" className="rounded-full border border-ink/30 px-5 py-2 text-sm font-semibold">Reset</Link>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-neutral-100 text-xs uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Track</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-ink/55">No submissions found.</td></tr>
            )}
            {rows.map((r) => {
              const meta = statusMeta(r.status);
              return (
                <tr key={r.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link href={`/admin/submissions/${r.id}`} className="font-semibold underline">{r.ref}</Link>
                  </td>
                  <td className="max-w-xs px-4 py-3">{r.title}</td>
                  <td className="px-4 py-3">
                    {r.author_name}
                    <span className="block text-xs text-ink/55">{r.institution || r.country}</span>
                  </td>
                  <td className="px-4 py-3">{r.track}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meta.tone}`}>{meta.label}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{new Date(r.created_at).toLocaleDateString("en-GB")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
          {page > 1 ? <Link className="underline" href={`/admin?${qs({ page: String(page - 1) })}`}>Previous</Link> : <span />}
          <span className="text-ink/60">Page {page} of {pages}</span>
          {page < pages ? <Link className="underline" href={`/admin?${qs({ page: String(page + 1) })}`}>Next</Link> : <span />}
        </nav>
      )}
    </div>
  );
}
