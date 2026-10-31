import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Why Attend", href: "#experience" },
  { label: "Speakers", href: "#speakers" },
  { label: "Programme", href: "#programme" },
  { label: "FAQs", href: "#faqs" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-footer-bg text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Main CTA */}
        <div className="grid gap-10 border-b border-white/15 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:py-28">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-white/55">
              <span className="h-2.5 w-2.5 bg-accent" />
              ARWATS 2027
            </p>

            <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-7xl lg:text-[7rem]">
              Ideas move
              <br />
              <span className="text-accent">us forward.</span>
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              Be part of the conversation on business, entrepreneurship, and
              leadership.
            </p>
          </div>

          <Link
            href="#register"
            className="group flex min-h-16 w-fit items-center justify-between gap-10 bg-accent px-6 py-5 text-sm font-bold text-footer-bg transition-colors hover:bg-white"
          >
            Register your interest
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Navigation and brand */}
        <div className="grid gap-12 py-12 sm:py-16 md:grid-cols-[1fr_1fr]">
          <div>
            <Link
              href="#top"
              aria-label="ARWATS 2027, back to top"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center bg-accent text-sm font-black text-footer-bg">
                A.
              </span>

              <span className="text-lg font-black uppercase tracking-tight">
                ARWATS <span className="text-accent">2027</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              A space for ideas, connections, and conversations shaping
              business, entrepreneurship, and leadership.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Explore
            </p>

            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/15 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2027 ARWATS 2027. All rights reserved.</p>

          <Link
            href="#top"
            className="group inline-flex w-fit items-center gap-2 font-bold uppercase tracking-[0.12em] transition-colors hover:text-accent"
          >
            Back to top
            <ArrowDown
              size={14}
              className="rotate-180 transition-transform group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
