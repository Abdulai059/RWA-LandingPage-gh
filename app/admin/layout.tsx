import type { Metadata } from "next";
import type { ReactNode } from "react";

// Admin pages depend on the signed-in user; never prerender or cache them.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | ARWATS 2027",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-neutral-50 text-ink">{children}</div>;
}
