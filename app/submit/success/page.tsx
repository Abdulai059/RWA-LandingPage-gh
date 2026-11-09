import type { Metadata } from "next";
import { ButtonLink, PageShell, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Submission received | ARWATS 2027",
  robots: { index: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { ref } = await searchParams;
  const value = typeof ref === "string" && /^ARWATS27-\d{4,}$/.test(ref) ? ref : null;

  return (
    <PageShell eyebrow="ARWATS 2027" title="Submission received">
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          {value && (
            <>
              <p className="text-sm font-bold uppercase tracking-widest text-ink/55">Your reference</p>
              <p className="mt-2 mb-6 font-mono text-4xl font-black tracking-tight">{value}</p>
            </>
          )}
          <p className="mb-8 leading-7 text-ink/75">
            Thank you. We&apos;ve sent a confirmation email. Keep your reference
            number and quote it in any correspondence. If the email doesn&apos;t arrive
            within a few minutes, check your spam folder or contact the Secretariat.
          </p>
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </Section>
    </PageShell>
  );
}
