import type { Metadata } from "next";
import { PageShell, Section } from "@/components/ui";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact | ARWATS 2027",
  description: "Contact the ARWATS 2027 Secretariat.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="ARWATS 2027"
      title="Contact the Secretariat"
      intro="Questions about submissions, partnerships or the summit? Send us a message."
    >
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/55">Email</h2>
              {SITE.contactEmail ? (
                <a href={`mailto:${SITE.contactEmail}`} className="mt-1 block text-lg font-semibold underline">
                  {SITE.contactEmail}
                </a>
              ) : (
                <p className="mt-1 text-sm text-ink/70">Secretariat email to be confirmed. Use the form.</p>
              )}
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/55">Location</h2>
              <p className="mt-1 text-lg font-semibold">{SITE.location}</p>
              <p className="text-ink/70 text-sm">{SITE.date} (exact date to be confirmed)</p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/55">Partnering?</h2>
              <p className="mt-1 text-sm text-ink/70">
                Interested in partnering with ARWATS 2027? Tell us in your message.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </PageShell>
  );
}
