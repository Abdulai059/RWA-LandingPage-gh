import type { ReactNode } from "react";
import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { signOut } from "@/actions/admin";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const staff = await requireStaff();

  return (
    <>
      <header className="border-b border-ink/10 bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-serif text-lg font-semibold">
              ARWATS <span className="text-brand">Admin</span>
            </Link>
            <nav aria-label="Admin" className="flex gap-4 text-sm text-white/80">
              <Link href="/admin" className="hover:text-brand">Submissions</Link>
              <Link href="/admin/messages" className="hover:text-brand">Messages</Link>
              <Link href="/" className="hover:text-brand">View site</Link>
            </nav>
          </div>
          <form action={signOut} className="flex items-center gap-3 text-sm">
            <span className="hidden text-white/60 sm:inline">
              {staff.email} ({staff.role})
            </span>
            <button type="submit" className="rounded-full border border-white/30 px-4 py-1.5 hover:border-brand hover:text-brand">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8">{children}</div>
    </>
  );
}
