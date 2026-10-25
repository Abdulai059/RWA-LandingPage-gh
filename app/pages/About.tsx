import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Lightbulb,
  Network,
  Target,
} from "lucide-react";

const highlights = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Ideas that inspire",
    description:
      "Explore fresh perspectives, challenge conventional thinking, and discover new possibilities.",
  },
  {
    number: "02",
    icon: Network,
    title: "Connections that matter",
    description:
      "Meet professionals, exchange experiences, and build relationships that can create opportunities.",
  },
  {
    number: "03",
    icon: Target,
    title: "Action with purpose",
    description:
      "Turn meaningful conversations into practical insights for business, entrepreneurship, and leadership.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white py-20 text-ink sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 size-80 rounded-full bg-brand/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-310 px-5 sm:px-7">
        {/* Section introduction */}
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/60 sm:text-sm">
              <span className="h-1 w-8 rounded-full bg-brand" />
              About the Conference
            </p>

            <h2
              id="about-heading"
              className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            >
              Where ideas meet{" "}
              <span className="relative inline-block">
                opportunity.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 -z-0 h-2 w-full bg-brand/70"
                />
              </span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-8 text-ink/70 sm:text-lg">
              ARWATS 2027 is a gathering for professionals interested in
              business growth, entrepreneurial thinking, and effective
              leadership. It creates space for people to exchange ideas, learn
              from different perspectives, and explore possibilities for the
              future.
            </p>

            <a
              href="#experience"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Discover the experience
              <ArrowDownRight className="size-4 text-ink" />
            </a>
          </div>
        </div>

        {/* Main feature panel */}
        <div className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden p-7 sm:p-10 lg:min-h-[440px] lg:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 size-44 rounded-full border border-brand/30"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-2/3 bg-brand"
            />

            <div className="relative">
              <span className="inline-grid size-12 place-items-center rounded-2xl bg-brand text-ink">
                <Target className="size-6" />
              </span>
            </div>

            <div className="relative mt-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                The vision
              </p>

              <h3 className="max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Think beyond today. Build for tomorrow.
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/65 sm:text-base">
                A space to reflect on where we are, exchange ideas about where
                we want to go, and consider the steps that move us forward.
              </p>
            </div>
          </div>

          {/* Conference values */}
          <div className="divide-y divide-white/10 px-7 py-3 sm:px-10 lg:px-12">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group grid gap-4 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-5 sm:py-9"
                >
                  <span className="pt-1 text-xs font-semibold tracking-widest text-brand/80">
                    {item.number}
                  </span>

                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 text-brand transition-colors group-hover:bg-brand group-hover:text-ink">
                        <Icon className="size-4" />
                      </span>

                      <h4 className="text-lg font-semibold sm:text-xl">
                        {item.title}
                      </h4>
                    </div>

                    <p className="max-w-md text-sm leading-7 text-white/60">
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight className="hidden size-5 text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand sm:block" />
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-12 flex flex-col gap-5 border-b border-ink/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-ink/60 sm:text-base">
            The conversations start here. The opportunities depend on what we do
            next.
          </p>

          <Link
            href="#register"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold transition-colors hover:border-brand hover:bg-brand/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Be part of it
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
