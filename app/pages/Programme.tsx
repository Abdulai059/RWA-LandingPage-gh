import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

const programme = [
  {
    number: "01",
    time: "08:30 AM",
    duration: "ARRIVAL",
    title: "Registration & Welcome",
    description:
      "Arrive, check in, meet other attendees, and settle in for the day.",
  },
  {
    number: "02",
    time: "09:30 AM",
    duration: "OPENING",
    title: "Opening Remarks",
    description:
      "An introduction to the conference, its purpose, and the conversations ahead.",
  },
  {
    number: "03",
    time: "10:00 AM",
    duration: "KEYNOTE",
    title: "Ideas That Move Business Forward",
    description:
      "A keynote session exploring business growth, entrepreneurship, and leadership.",
  },
  {
    number: "04",
    time: "11:00 AM",
    duration: "DISCUSSION",
    title: "The Business of What's Next",
    description:
      "A focused discussion on emerging opportunities, practical challenges, and new ways of thinking.",
  },
  {
    number: "05",
    time: "12:30 PM",
    duration: "NETWORKING",
    title: "Connect & Collaborate",
    description:
      "Make introductions, exchange ideas, and explore potential collaborations.",
  },
  {
    number: "06",
    time: "02:00 PM",
    duration: "CLOSING",
    title: "Closing Reflections",
    description:
      "Bring the key takeaways together and consider the next steps beyond the conference.",
  },
];

export default function Programme() {
  return (
    <section
      id="programme"
      aria-labelledby="programme-heading"
      className="bg-white px-5 py-20 text-black sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="grid gap-8 border-b border-black pb-10 sm:pb-14 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/55">
              <span className="h-1 w-8 bg-section-bg" />
              ARWATS 2027 / The Schedule
            </p>

            <h2
              id="programme-heading"
              className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.065em] sm:text-7xl lg:text-8xl"
            >
              THE
              <br />
              PROGRAMME<span className="text-programme-accent">.</span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-base leading-7 text-black/65 sm:text-lg">
              A day for fresh perspectives, meaningful conversations, and new
              connections across business, entrepreneurship, and leadership.
            </p>

            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-black/50">
              <Clock3 className="size-4" />
              Illustrative schedule · Subject to confirmation
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-8 sm:mt-12">
          {programme.map((item, index) => (
            <article
              key={item.number}
              className="group grid grid-cols-[76px_1fr] gap-4 border-b border-black/15 py-7 sm:grid-cols-[120px_1fr] sm:gap-8 sm:py-9 lg:grid-cols-[150px_1fr_150px]"
            >
              {/* Time and timeline marker */}
              <div className="relative">
                {index !== programme.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-29px] left-[7px] top-8 w-px bg-black/15 sm:bottom-[-37px] sm:left-[9px] sm:top-9"
                  />
                )}

                <span className="relative z-10 mt-1 block size-4 rounded-full border-[4px] border-black bg-section-bg transition-transform group-hover:scale-125" />

                <p className="mt-4 font-mono text-[11px] font-bold leading-5 sm:text-sm">
                  {item.time}
                </p>
              </div>

              {/* Session details */}
              <div className="min-w-0">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                  {item.number} / {item.duration}
                </p>

                <h3 className="max-w-2xl text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-black/65 sm:text-2xl lg:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  {item.description}
                </p>
              </div>

              {/* Index */}
              <div className="hidden items-start justify-end lg:flex">
                <span className="font-mono text-sm text-black/35">
                  {item.number} — 06
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-7 text-black/55">
            Session titles, timings, speakers, and activities will be updated
            when the official programme is confirmed.
          </p>

          <Link
            href="/submit"
            className="inline-flex min-h-12 w-fit items-center gap-3 bg-section-bg px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Stay Informed
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
