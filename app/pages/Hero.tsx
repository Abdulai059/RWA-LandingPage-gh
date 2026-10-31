import type { ReactNode } from "react";
import { MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { hero, navLinks } from "@/data/hero.content";

function InfoPill({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: ReactNode;
}) {
  return (
    <li className="flex w-full items-center gap-2.5 rounded-xl bg-ink px-4 py-2.5 text-[0.95rem] text-white sm:w-auto">
      <Icon className="size-4.5 shrink-0 stroke-brand" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export default function Hero() {
  const { cta, secondary } = hero;

  return (
    <header
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-white text-ink"
    >
      <Navbar
        siteName="ARWATS 2027"
        links={navLinks}
        ctaLabel="Register Your Interest"
        ctaHref="#register"
      />

      <div className="relative mx-auto grid max-w-310 items-center gap-8 px-5 pb-24 pt-6 sm:px-7 lg:min-h-[calc(100vh-150px)] lg:grid-cols-[1.12fr_0.88fr] lg:pt-12">
        <div className="relative z-10">
          <p className="mb-6 inline-block rounded-full bg-brand px-4 py-1.5 text-[0.95rem] font-medium text-ink">
            {hero.badge}
          </p>

          <p className="mb-1.5 text-xs text-ink/60">
            <strong className="font-semibold text-ink">{hero.fullName}</strong>{" "}
            {hero.shortName}
          </p>

          <h1 className="mb-5 text-5xl font-black sm:text-7xl lg:text-[4rem] leading-[1.04] tracking-tight text-ink">
            {hero.slogan}
          </h1>

          <p className="mb-8 max-w-prose text-base text-ink/75">{hero.theme}</p>

          <ul className="mb-9 flex flex-wrap gap-3">
            <InfoPill icon={MapPin}>{hero.location}</InfoPill>
            <InfoPill icon={Calendar}>
              {hero.date}{" "}
              <small className="text-[0.8rem] text-white/60">
                {hero.dateNote}
              </small>
            </InfoPill>
          </ul>

          <div className="hidden flex-wrap items-center gap-4">
            <a
              href={cta.href}
              className="w-full rounded-full bg-ink px-9 py-4 text-center font-semibold tracking-wide text-brand transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none sm:w-auto"
            >
              {cta.label}
            </a>
            <a
              href={secondary.href}
              className="border-b-2 border-ink/30 px-1.5 py-3.5 font-medium text-ink transition hover:border-ink"
            >
              {secondary.label}
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none max-lg:absolute max-lg:right-[-10%] max-lg:top-[2%] max-lg:w-[95%] max-lg:opacity-30 lg:w-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto block h-auto max-h-[700px] w-full object-cover"
          >
            <source src="/rwavideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </header>
  );
}
