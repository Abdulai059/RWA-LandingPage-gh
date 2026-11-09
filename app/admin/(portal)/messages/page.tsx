import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/lib/types";

export default async function MessagesPage() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase!
    .from("contact_messages")
    .select("id, name, email, subject, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  const messages = (data ?? []) as ContactMessage[];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight">Contact messages</h1>
      {messages.length === 0 && <p className="text-ink/60">No messages yet.</p>}
      <ul className="space-y-4">
        {messages.map((m) => (
          <li key={m.id} className="rounded-2xl border border-ink/10 bg-white p-5">
            <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm">
              <span>
                <strong>{m.name}</strong>{" "}
                <a className="underline" href={`mailto:${m.email}`}>{m.email}</a>
              </span>
              <span className="text-ink/55">{new Date(m.created_at).toLocaleString("en-GB")}</span>
            </div>
            {m.subject && <p className="font-semibold">{m.subject}</p>}
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6">{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
