import type { Metadata } from "next";
import { PageShell, Section, Notice } from "@/components/ui";
import SubmitForm from "./SubmitForm";
import { getSubmissionWindow } from "@/lib/config";
import { isSupabaseConfigured } from "@/lib/supabase/env";

// The open/closed state depends on the current date, so render on every request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit Research | ARWATS 2027",
  description: "Research submission portal for ARWATS 2027. Submission is free.",
};

export default function SubmitPage() {
  const win = getSubmissionWindow();
  const configured = isSupabaseConfigured();

  return (
    <PageShell
      eyebrow="ARWATS 2027 | Submission fee: Free"
      title="Research Submission Portal"
      intro="Submit your abstract and full paper. You will receive a reference number and a confirmation email."
    >
      <Section>
        <div className="mx-auto max-w-3xl">
          {!win.open ? (
            <Notice tone="info">{win.reason} Please check the Call for Papers page for updates.</Notice>
          ) : !configured ? (
            <Notice tone="info">
              The submission system is being set up and will open soon. Please check back
              or see the Call for Papers page.
            </Notice>
          ) : (
            <SubmitForm />
          )}
        </div>
      </Section>
    </PageShell>
  );
}
