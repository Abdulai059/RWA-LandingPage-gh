import type { Metadata } from "next";
import { ButtonLink, PageShell, Section } from "@/components/ui";
import { LIMITS, MAX_FILE_MB, TRACKS } from "@/lib/config";
import { dates } from "@/data/content";

export const metadata: Metadata = {
  title: "Call for Papers | ARWATS 2027",
  description:
    "Submit original research, policy perspectives and case studies on real-world asset tokenization in Africa. Free submission.",
};

const audience = [
  "Academics and postgraduate researchers",
  "Financial institutions and regulators",
  "Policymakers and trade negotiators",
  "Web3 developers and startups",
  "Asset-sector professionals",
];

const guidelines = [
  { label: "Abstract", value: `${LIMITS.abstractMinWords} to ${LIMITS.abstractMaxWords} words` },
  { label: "Full paper", value: "3,000 to 6,000 words" },
  { label: "Keywords", value: `${LIMITS.keywordsMin} to ${LIMITS.keywordsMax} keywords` },
  { label: "Style", value: "APA 7th edition" },
  { label: "Language", value: "English" },
  { label: "File format", value: `PDF or DOCX, up to ${MAX_FILE_MB} MB` },
  { label: "Fee", value: "Free submission" },
];

export default function CallForPapersPage() {
  return (
    <PageShell
      eyebrow="Call for Papers | ARWATS 2027"
      title={
        <>
          Submit your research.
          <br />
          Shape Africa&apos;s real-world asset future.
        </>
      }
      intro="We invite original research papers, policy perspectives, technical contributions and industry case studies on RWA tokenization across Africa."
    >
      <Section title="Conference theme">
        <p className="max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
          Unlocking Africa&apos;s Real-World Assets Through Tokenization: Building
          Inclusive, Transparent and Integrated Digital Asset Markets.
        </p>
        <div className="mt-8">
          <ButtonLink href="/submit">Submit your research. It&apos;s free</ButtonLink>
        </div>
      </Section>

      <Section title="Research tracks" id="tracks">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((t) => (
            <li key={t.name} className="rounded-2xl border border-ink/15 bg-tint/40 p-5">
              <h3 className="mb-2 font-bold">{t.name}</h3>
              <p className="text-sm leading-6 text-ink/70">{t.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Who can submit">
        <ul className="grid gap-3 sm:grid-cols-2">
          {audience.map((a) => (
            <li key={a} className="flex items-start gap-3">
              <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-brand ring-1 ring-ink" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Submission guidelines">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {guidelines.map((g) => (
            <div key={g.label} className="bg-white p-5">
              <dt className="text-xs font-bold uppercase tracking-widest text-ink/55">{g.label}</dt>
              <dd className="mt-1 text-lg font-semibold">{g.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-ink/65">
          Work must be original and not under review elsewhere. Please prepare the
          manuscript without author names so it can be reviewed anonymously.
        </p>
      </Section>

      <Section title="Review process">
        <p className="max-w-3xl leading-7 text-ink/80">
          Every submission goes through editorial screening. Full research papers
          selected for academic consideration then enter double-blind peer review.
          Publication and proceedings arrangements will be announced once they are
          formally confirmed.
        </p>
      </Section>

      <Section title="Important dates">
        <ul className="divide-y divide-ink/15 rounded-2xl border border-ink/15">
          {dates.map((d) => (
            <li key={d.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between">
              <span className="font-semibold">{d.label}</span>
              <span className="text-ink/70">{d.date}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink/60">Dates will be confirmed on this page.</p>
      </Section>

      <Section>
        <div className="rounded-3xl bg-ink p-8 text-white sm:p-12">
          <h2 className="mb-3 text-3xl font-black tracking-tight">Ready to submit?</h2>
          <p className="mb-7 max-w-xl text-white/70">
            Free submission. You&apos;ll receive a reference number and a confirmation email.
          </p>
          <ButtonLink href="/submit" variant="brand">
            Submit your research
          </ButtonLink>
        </div>
      </Section>
    </PageShell>
  );
}
