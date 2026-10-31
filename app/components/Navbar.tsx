"use client";

import { useState, useEffect, useRef } from "react";

export type NavLink = {
  label: string;
  href: string;
};

type Props = {
  siteName: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
};

export default function Navbar({ siteName, links, ctaLabel, ctaHref }: Props) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleOutsideClick = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [open]);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      setActiveHash(href);
    }

    setOpen(false);
  };

  return (
    <div className="w-full px-4 pt-4">
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="relative z-50 isolate mx-auto flex max-w-310 items-center justify-between gap-6 rounded-full border border-brand/20 bg-ink-2/50 px-5 md:py-4 py-2  shadow-xl backdrop-blur-2xl sm:px-6"
      >
        {/* Background glow, clipped independently */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
        >
          <div className="absolute -left-10 -top-10 size-40 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-tint/5 blur-3xl" />
        </div>

        {/* Brand */}
        <a
          href="/"
          onClick={() => {
            setActiveHash("");
            setOpen(false);
          }}
          className="relative z-10 flex shrink-0 items-center gap-3 font-serif text-lg font-semibold text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:text-xl"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-brand text-ink shadow-sm"
          >
            <LogoIcon />
          </span>

          <span>{siteName}</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="relative z-30 grid size-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-ink/50 transition-colors hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand md:hidden"
        >
          <div className="relative size-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${
                open ? "top-2.5 rotate-45" : "top-1"
              }`}
            />

            <span
              className={`absolute left-0 top-2.5 h-0.5 w-5 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${
                open ? "top-2.5 -rotate-45" : "top-4"
              }`}
            />
          </div>
        </button>

        {/* Navigation links */}
        <ul
          id="nav-links"
          className={`absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 flex flex-col gap-1 rounded-2xl border border-brand/20 bg-ink-2/95 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-200 ease-out md:static md:z-auto md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0 pointer-events-none md:visible md:pointer-events-auto md:translate-y-0 md:opacity-100"
          }`}
        >
          {links.map((link) => {
            const isActive = activeHash === link.href;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => handleNavigation(link.href)}
                  className={`block rounded-lg px-3.5 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand md:px-0 md:py-2 ${
                    isActive
                      ? "font-semibold text-brand"
                      : "text-white/80 hover:text-brand"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}

          {/* CTA */}
          <li className="mt-2 md:mt-0 md:pl-1">
            <a
              href={ctaHref}
              onClick={() => handleNavigation(ctaHref)}
              className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold tracking-wide text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(206,232,93,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:py-2.5"
            >
              {ctaLabel}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function LogoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="#1a1d14"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="m7.7 8.2 3 8M16.7 7.7l-3.6 8.6M8 7h8" />
    </svg>
  );
}
