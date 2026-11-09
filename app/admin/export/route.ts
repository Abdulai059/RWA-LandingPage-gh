import { NextResponse, type NextRequest } from "next/server";
import { getStaff, logAudit } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { filteredSubmissions, parseFilters } from "@/lib/submission-query";
import type { Submission } from "@/lib/types";

/** Neutralise spreadsheet formula injection and escape for CSV. */
function cell(value: unknown) {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const staff = await getStaff();
  if (!staff) return new NextResponse("Unauthorized", { status: 401 });

  const supabase = await createClient();
  const filters = parseFilters(Object.fromEntries(request.nextUrl.searchParams));

  const { data, error } = await filteredSubmissions(supabase!, "*", filters)
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error) return new NextResponse("Export failed", { status: 500 });

  const rows = (data ?? []) as unknown as Submission[];
  const header = [
    "Reference","Status","Submitted","Author","Email","Institution","Country",
    "Title","Track","Keywords","Funding","Conflict of interest","File name","File size (bytes)",
  ];
  const lines = [header.map(cell).join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.ref, r.status, r.created_at, r.author_name, r.email, r.institution, r.country,
        r.title, r.track, r.keywords.join("; "), r.declarations.funding,
        r.declarations.conflict, r.file_name, r.file_size,
      ].map(cell).join(","),
    );
  }

  await logAudit(staff, "exported_csv", null, { rows: rows.length, filters });

  return new NextResponse("\uFEFF" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="arwats-submissions-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
