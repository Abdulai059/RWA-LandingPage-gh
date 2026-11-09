import type { Metadata } from "next";
import { PageShell, Section } from "@/components/ui";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Notice | ARWATS 2027",
};

/*
 * DRAFT: have the organisers (and ideally legal counsel) review and complete the
 * bracketed items before launch.
 */
const items = [
  {
    h: "What we collect",
    p: "When you submit a paper we collect your name, email address, institution, country, the paper title, abstract, keywords, your uploaded manuscript, and your funding and conflict-of-interest declarations. When you use the contact form we collect your name, email address and message.",
  },
  {
    h: "Why we collect it",
    p: "To receive, screen and review submissions, to communicate with authors about their submission, and to run the summit. We do not sell your data.",
  },
  {
    h: "Who can see it",
    p: "Authorised ARWATS staff and reviewers. For double-blind review, reviewers receive the manuscript without author identity wherever possible. Authors should remove identifying details from the manuscript itself.",
  },
  {
    h: "How we store it",
    p: "Submissions and files are stored with our hosting and database provider (Supabase). Manuscripts are kept in private storage and are not publicly accessible. Access by staff is logged.",
  },
  {
    h: "How long we keep it",
    p: "[Retention period to be confirmed by the organisers, for example for the duration of the summit and its follow-up publications, then deleted or anonymised.]",
  },
  {
    h: "Your rights",
    p: "You may ask to access, correct or delete your personal data, subject to applicable data-protection law, including Ghana’s Data Protection Act, 2012 (Act 843). Contact the Secretariat to make a request.",
  },
  {
    h: "Contact",
    p: SITE.contactEmail
      ? `Email ${SITE.contactEmail}.`
      : "[Secretariat contact email to be confirmed.] You can also use the contact form.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="ARWATS 2027" title="Privacy Notice" intro="How ARWATS 2027 handles your personal data.">
      <Section>
        <div className="max-w-3xl space-y-8">
          {items.map((i) => (
            <div key={i.h}>
              <h2 className="mb-2 text-xl font-black">{i.h}</h2>
              <p className="leading-7 text-ink/80">{i.p}</p>
            </div>
          ))}
          <p className="text-sm text-ink/55">Last updated: [date]</p>
        </div>
      </Section>
    </PageShell>
  );
}
