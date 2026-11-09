"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/actions/contact";
import { Field, Notice, describedBy, inputClass } from "@/components/ui";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.ok) {
    return <Notice tone="success">Thank you. Your message has been sent. We&apos;ll reply by email.</Notice>;
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {state.message && <Notice tone="error">{state.message}</Notice>}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={e.name} required>
          <input id="name" name="name" defaultValue={v.name} autoComplete="name" required maxLength={200}
            aria-invalid={!!e.name} aria-describedby={describedBy("name", e.name)} className={inputClass} />
        </Field>
        <Field label="Email" name="email" error={e.email} required>
          <input id="email" name="email" type="email" defaultValue={v.email} autoComplete="email" required
            aria-invalid={!!e.email} aria-describedby={describedBy("email", e.email)} className={inputClass} />
        </Field>
      </div>
      <Field label="Subject" name="subject" error={e.subject}>
        <input id="subject" name="subject" defaultValue={v.subject} maxLength={200}
          aria-invalid={!!e.subject} aria-describedby={describedBy("subject", e.subject)} className={inputClass} />
      </Field>
      <Field label="Message" name="message" error={e.message} required>
        <textarea id="message" name="message" rows={7} defaultValue={v.message} required maxLength={5000}
          aria-invalid={!!e.message} aria-describedby={describedBy("message", e.message)} className={inputClass} />
      </Field>
      <button type="submit" disabled={pending}
        className="rounded-full bg-ink px-9 py-4 text-sm font-semibold uppercase tracking-wide text-brand transition hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
