import { NextResponse } from "next/server";
import { getStaff, logAudit } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient, MANUSCRIPT_BUCKET } from "@/lib/supabase/admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const staff = await getStaff();
  if (!staff) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new NextResponse("Not found", { status: 404 });

  // Read through the user-scoped client so Row Level Security also applies.
  const supabase = await createClient();
  const { data } = await supabase!
    .from("submissions")
    .select("file_path, file_name")
    .eq("id", id)
    .maybeSingle();
  if (!data?.file_path) return new NextResponse("Not found", { status: 404 });

  const service = createServiceClient();
  if (!service) return new NextResponse("Storage not configured", { status: 503 });

  const { data: signed, error } = await service.storage
    .from(MANUSCRIPT_BUCKET)
    .createSignedUrl(data.file_path, 60, { download: data.file_name ?? true });
  if (error || !signed) return new NextResponse("Could not create download link", { status: 500 });

  await logAudit(staff, "file_downloaded", id);

  const res = NextResponse.redirect(signed.signedUrl);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}
