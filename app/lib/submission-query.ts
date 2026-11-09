import type { SupabaseClient } from "@supabase/supabase-js";
import { STATUS_VALUES, TRACK_NAMES } from "@/lib/config";

export type Filters = {
  q: string;
  status: string;
  track: string;
  from: string;
  to: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function parseFilters(
  sp: Record<string, string | string[] | undefined>,
): Filters {
  const one = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v) ?? "";
  };
  const status = one("status");
  const track = one("track");
  const from = one("from");
  const to = one("to");
  return {
    q: one("q").slice(0, 100),
    status: STATUS_VALUES.includes(status) ? status : "",
    track: TRACK_NAMES.includes(track) ? track : "",
    from: DATE_RE.test(from) ? from : "",
    to: DATE_RE.test(to) ? to : "",
  };
}

export function filtersToQuery(f: Filters, extra: Record<string, string> = {}) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...f, ...extra })) if (v) p.set(k, v);
  return p.toString();
}

/** Builds a filtered select on submissions. Caller adds ordering and range. */
export function filteredSubmissions(
  supabase: SupabaseClient,
  columns: string,
  f: Filters,
  opts?: { count?: "exact" },
) {
  let query = supabase.from("submissions").select(columns, opts);
  if (f.status) query = query.eq("status", f.status);
  if (f.track) query = query.eq("track", f.track);
  if (f.from) query = query.gte("created_at", `${f.from}T00:00:00.000Z`);
  if (f.to) query = query.lte("created_at", `${f.to}T23:59:59.999Z`);
  // Strip characters that have meaning in PostgREST filter syntax.
  const term = f.q.replace(/[,()*%\\:"']/g, " ").trim();
  if (term) {
    query = query.or(
      `title.ilike.%${term}%,author_name.ilike.%${term}%,email.ilike.%${term}%,ref.ilike.%${term}%`,
    );
  }
  return query;
}
