import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/pages/Footer";
import { hero, navLinks } from "@/data/hero.content";

/** Header band + footer used by every inner page. */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <header className="bg-ink text-white">
        <Navbar
          siteName={hero.siteName}
          links={navLinks}
          ctaLabel="Submit Paper"
          ctaHref="/submit"
        />
        <div className="mx-auto max-w-220 px-5 pb-14 pt-14 sm:px-7 sm:pb-20 sm:pt-20">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            <span className="h-1 w-8 bg-brand" />
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-sm">
              {intro}
            </p>
          )}
        </div>
      </header>
      <main id="main" className="bg-white text-ink">
        {children}
      </main>
      <Footer />
    </>
  );
}

export function Section({
  title,
  children,
  id,
}: {
  title?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-220 px-5 py-12 sm:px-7 sm:py-16">
      {title && (
        <h2 className="mb-6 text-2xl font-black tracking-tight sm:text-3xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "brand";
}) {
  const styles =
    variant === "dark"
      ? "bg-ink text-brand hover:shadow-xl"
      : "bg-brand text-ink hover:shadow-xl";
  return (
    <Link
      href={href}
      className={`inline-block rounded-full px-8 py-4 text-center text-sm font-semibold tracking-wide transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none ${styles}`}
    >
      {children}
    </Link>
  );
}

/* ---- Form primitives (used by the submission and contact forms) ---- */

export const inputClass =
  "w-full rounded-sm border border-ink/25 bg-white px-4 py-1 text-base text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink aria-[invalid=true]:border-red-600";

export function Field({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden className="text-red-600">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-sm text-ink/60">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(name: string, error?: string, hint?: string) {
  if (error) return `${name}-error`;
  if (hint) return `${name}-hint`;
  return undefined;
}

export function Notice({
  tone,
  children,
}: {
  tone: "error" | "info" | "success";
  children: ReactNode;
}) {
  const styles = {
    error: "border-red-300 bg-red-50 text-red-900",
    info: "border-ink/15 bg-tint text-ink",
    success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  }[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm leading-6 ${styles}`}
    >
      {children}
    </div>
  );
}
