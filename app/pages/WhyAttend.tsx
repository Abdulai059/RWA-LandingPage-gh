import Link from "next/link";
import {
  ArrowUpRight,
  Lightbulb,
  Network,
  TrendingUp,
  Target,
} from "lucide-react";

const benefits = [
  {
    number: "A",
    title: "STRATEGIC INSIGHTS",
    points: [
      "Discover fresh perspectives on business and leadership.",
      "Explore ideas to support your professional growth.",
      "Identify practical opportunities to move forward.",
    ],
  },
  {
    number: "B",
    title: "NETWORKING OPPORTUNITIES",
    points: [
      "Connect with professionals and entrepreneurs.",
      "Build meaningful relationships and partnerships.",
      "Exchange experiences with people who share your ambitions.",
    ],
  },
  {
    number: "C",
    title: "FOCUSED CONTENT & COLLABORATION",
    points: [
      "Explore business, entrepreneurship, and leadership challenges.",
      "Take part in conversations that encourage new thinking.",
      "Discover possibilities for collaboration and innovation.",
    ],
  },
];

export default function WhyAttend() {
  return (
    <section
      id="experience"
      aria-labelledby="why-attend-heading"
      className="relative overflow-hidden bg-section-bg text-black"
    >
      <div className="mx-auto max-w-310 px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-12">
        {/* Oversized headline */}
        <h2
          id="why-attend-heading"
          className="max-w-362.5 text-[clamp(3rem,9.5vw,9rem)] font-black uppercase leading-[0.79] tracking-[-0.075em]"
        >
          <span className="block">
            <span className="mr-2 sm:mr-4">{"{"}</span>
            WHY SHOULD
          </span>
          <span className="block">YOU ATTEND{"}"}</span>
        </h2>

        {/* Benefits and central artwork */}
        <div className="relative mt-12 grid gap-x-8 gap-y-10 lg:mt-14 lg:min-h-97.5 lg:grid-cols-[1fr_0.85fr_1fr]">
          {/* Left column */}
          <div className="relative z-10 flex flex-col gap-10 sm:gap-12">
            {benefits.slice(0, 2).map((benefit) => (
              <article
                key={benefit.number}
                className="grid grid-cols-[28px_1fr] gap-3 sm:grid-cols-[48px_1fr] sm:gap-4"
              >
                <span className="pt-1 font-mono text-[10px] font-bold tracking-[0.2em] sm:text-xs">
                  [{benefit.number}]
                </span>

                <div>
                  <h3 className="max-w-sm text-2xl font-black uppercase leading-[0.94] tracking-[-0.045em] sm:text-3xl">
                    {benefit.title}
                  </h3>

                  <ol className="mt-5 space-y-2">
                    {benefit.points.map((point, index) => (
                      <li
                        key={point}
                        className="grid grid-cols-[22px_1fr] gap-2 text-xs font-medium leading-relaxed sm:text-[13px]"
                      >
                        <span className="font-mono text-[10px]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>

          {/* Right column */}
          <div className="relative z-10">
            <article className="grid grid-cols-[28px_1fr] gap-3 sm:grid-cols-[48px_1fr] sm:gap-4">
              <span className="pt-1 font-mono text-[10px] font-bold tracking-[0.2em] sm:text-xs">
                [{benefits[2].number}]
              </span>

              <div>
                <h3 className="max-w-md text-2xl font-black uppercase leading-[0.94] tracking-[-0.045em] sm:text-3xl">
                  {benefits[2].title}
                </h3>

                <ol className="mt-5 space-y-2">
                  {benefits[2].points.map((point, index) => (
                    <li
                      key={point}
                      className="grid grid-cols-[22px_1fr] gap-2 text-xs font-medium leading-relaxed sm:text-[13px]"
                    >
                      <span className="font-mono text-[10px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col gap-4 border-t border-black/20 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-[10px] font-semibold hidden md:block uppercase tracking-wide sm:text-xs">
            {"//"} THINK BIGGER. BUILD WHAT'S NEXT.
          </p>

          <Link
            href="#register"
            className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-wide transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Be part of the conversation
            <ArrowUpRight className="size-4" />
          </Link>

          <p className="font-mono text-[10px] font-semibold hidden md:block uppercase tracking-wide sm:text-right sm:text-xs">
            ARWATS 2027 {"//"} YOUR NEXT STEP STARTS HERE
          </p>
        </div>
      </div>
    </section>
  );
}
