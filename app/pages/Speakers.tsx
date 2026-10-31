import Link from "next/link";
import { ArrowUpRight, Mic2, UserRound } from "lucide-react";

export default function Speakers() {
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="bg-white px-5 py-20 text-black sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-310">
        {/* Section introduction */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black/55">
              <span className="h-1 w-8 bg-[#E6FF27]" />
              The People Behind The Ideas
            </p>

            <h2
              id="speakers-heading"
              className="max-w-3xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.065em] sm:text-7xl lg:text-8xl"
            >
              MEET THE
              <br />
              <span className="font-serif italic font-normal normal-case tracking-tighter">
                minds.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-black/60 sm:text-base">
            Every great conversation starts with a different perspective.
            Discover the voices and ideas coming to ARWATS 2027.
          </p>
        </div>

        {/* Editorial speaker poster */}
        <div className="grid grid-cols-1 gap-1.5 border-[3px] border-black bg-black p-1.5 sm:grid-cols-[minmax(0,1fr)_110px] lg:grid-cols-[minmax(0,1fr)_150px]">
          {/* Main poster */}
          <div className="grid min-w-0 grid-cols-1 gap-1.5 sm:grid-cols-[minmax(0,0.55fr)_minmax(0,1.8fr)]">
            {/* Heading panel */}
            <div className="relative flex min-h-47.5 items-end overflow-hidden bg-section-bg p-6 pt-12 sm:col-span-2 sm:min-h-56.25 sm:p-9 sm:pt-12 lg:p-12">
              <span className="absolute right-5 top-4 font-mono text-[10px] font-bold tracking-[0.2em] sm:right-8 sm:top-7">
                ARWATS / 2027
              </span>

              {/* Smaller clamp on mobile so "CONFERENCE" never clips */}
              <h3 className="max-w-4xl font-serif text-[clamp(2rem,9.5vw,3.5rem)] font-black uppercase leading-[0.82] tracking-[-0.065em] sm:text-[clamp(3rem,8vw,7.5rem)]">
                CONFERENCE
                <br />
                SPEAKERS
              </h3>

              {/* Only from lg, where it can't collide with the heading */}
              <span className="absolute bottom-5 right-5 hidden text-xs font-bold uppercase tracking-widest lg:block">
                IDEAS. PEOPLE. IMPACT.
              </span>
            </div>

            {/* Vertical editorial strip (narrow column, left of portrait) */}
            <div className="hidden items-center justify-center overflow-hidden bg-section-bg p-4 sm:flex">
              <p className="[writing-mode:vertical-rl] rotate-180 font-serif text-base font-black uppercase leading-none tracking-tight lg:text-xl">
                BUSINESS · LEADERSHIP · INNOVATION
              </p>
            </div>

            {/* Portrait / announcement panel (wide column) */}
            <div className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden bg-panel-bg p-6 pb-14 sm:min-h-95 lg:min-h-110">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#e9e9e5_62%,#d5d5d0_100%)]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-4 border border-black/10 sm:inset-6"
              />

              <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-black bg-[#E6FF27] sm:size-32">
                <UserRound
                  className="size-12 stroke-[1.25] sm:size-16"
                  aria-hidden="true"
                />
              </div>

              <div className="relative mt-7 max-w-xs text-center">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/55">
                  The lineup
                </span>

                <p className="mt-3 font-serif text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
                  Coming
                  <br />
                  Soon.
                </p>

                <p className="mx-auto mt-3 max-w-60 text-xs leading-5 text-black/60 sm:text-sm">
                  Speaker announcements will be revealed as details are
                  confirmed.
                </p>
              </div>

              <span className="absolute bottom-5 left-6 font-mono text-[9px] font-bold tracking-[0.2em] sm:left-8">
                FIG. 001 — THE VOICES
              </span>
            </div>
          </div>

          {/* Right information rail */}
          <aside className="grid grid-cols-2 gap-1.5 sm:grid-cols-1 sm:grid-rows-2">
            <div className="flex min-h-42.5 min-w-0 flex-col justify-between overflow-hidden bg-section-bg p-5 sm:min-h-0 sm:items-center sm:p-4 lg:p-6">
              <span className="font-mono text-[10px] font-bold tracking-widest sm:[writing-mode:vertical-rl] sm:rotate-180">
                ARWATS 2027
              </span>

              <div className="sm:[writing-mode:vertical-rl] sm:rotate-180">
                <p className="font-serif text-3xl font-black uppercase leading-none sm:text-4xl lg:text-5xl">
                  BIG
                  <br className="hidden sm:block" />
                  IDEAS
                </p>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-widest">
                GHANA
              </span>
            </div>

            <div className="flex min-h-42.5 min-w-0 flex-col justify-between overflow-hidden bg-section-bg p-5 sm:min-h-0 sm:items-center sm:p-4 lg:p-6">
              <span className="font-mono text-[10px] font-bold tracking-widest sm:[writing-mode:vertical-rl] sm:rotate-180">
                THE CONVERSATION
              </span>

              <div className="sm:[writing-mode:vertical-rl] sm:rotate-180">
                <p className="font-serif text-3xl font-black uppercase leading-none sm:text-4xl lg:text-5xl">
                  NEXT
                  <br className="hidden sm:block" />
                  LEVEL
                </p>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-widest">
                2027
              </span>
            </div>
          </aside>
        </div>

        {/* Bottom call to action */}
        <div className="mt-6 flex flex-col gap-5 border-b border-black/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center bg-[#E6FF27]">
              <Mic2 className="size-5" aria-hidden="true" />
            </span>

            <div>
              <p className="text-sm font-bold uppercase">
                The stage is being set.
              </p>
              <p className="mt-1 text-xs text-black/55 sm:text-sm">
                Stay tuned for speaker announcements.
              </p>
            </div>
          </div>

          <Link
            href="#register"
            className="inline-flex w-fit items-center gap-2 border-b-2 border-section-bg pb-2 text-xs font-black uppercase tracking-wide transition-colors hover:border-black focus-visible:outline-2  focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Get event updates
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
