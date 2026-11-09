"use client";

import { useActionState, useState } from "react";
import { submitPaper, type SubmitState } from "@/actions/submit";
import { Field, Notice, describedBy, inputClass } from "@/components/ui";
import { AFRICAN_COUNTRIES, LIMITS, MAX_FILE_MB, TRACKS } from "@/lib/config";
import { countWords } from "@/lib/validation";

const initial: SubmitState = {};

export default function SubmitForm() {
  const [state, action, pending] = useActionState(submitPaper, initial);
  const [words, setWords] = useState(countWords(state.values?.abstract ?? ""));
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const wordsOk =
    words >= LIMITS.abstractMinWords && words <= LIMITS.abstractMaxWords;

  const abstractHint = `${LIMITS.abstractMinWords} to ${LIMITS.abstractMaxWords} words`;

  return (
    <form action={action} className="space-y-6" noValidate>
      {state.message && <Notice tone="error">{state.message}</Notice>}

      {/* Honeypot: hidden from people, bots tend to fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Author full name" name="author_name" error={e.author_name} required>
          <input
            id="author_name" name="author_name" type="text" autoComplete="name"
            defaultValue={v.author_name} required maxLength={200}
            aria-invalid={!!e.author_name} aria-describedby={describedBy("author_name", e.author_name)}
            className={inputClass}
          />
        </Field>
        <Field label="Email address" name="email" error={e.email} hint="Your confirmation is sent here." required>
          <input
            id="email" name="email" type="email" autoComplete="email"
            defaultValue={v.email} required maxLength={254}
            aria-invalid={!!e.email} aria-describedby={describedBy("email", e.email, "x")}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Institution / organisation" name="institution" error={e.institution} hint="Independent researchers can leave this blank.">
          <input
            id="institution" name="institution" type="text" autoComplete="organization"
            defaultValue={v.institution} maxLength={300}
            aria-invalid={!!e.institution} aria-describedby={describedBy("institution", e.institution, "x")}
            className={inputClass}
          />
        </Field>
        <Field label="Country" name="country" error={e.country} required>
          <select
            id="country" name="country" defaultValue={v.country ?? ""} required
            aria-invalid={!!e.country} aria-describedby={describedBy("country", e.country)}
            className={inputClass}
          >
            <option value="" disabled>Select a country</option>
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Paper title" name="title" error={e.title} required>
        <input
          id="title" name="title" type="text" defaultValue={v.title} required maxLength={300}
          aria-invalid={!!e.title} aria-describedby={describedBy("title", e.title)}
          className={inputClass}
        />
      </Field>

      <Field label="Research track" name="track" error={e.track} required>
        <select
          id="track" name="track" defaultValue={v.track ?? ""} required
          aria-invalid={!!e.track} aria-describedby={describedBy("track", e.track)}
          className={inputClass}
        >
          <option value="" disabled>Select a research track</option>
          {TRACKS.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
      </Field>

      <Field label="Abstract" name="abstract" error={e.abstract} hint={abstractHint} required>
        <textarea
          id="abstract" name="abstract" rows={10} defaultValue={v.abstract} required
          onChange={(ev) => setWords(countWords(ev.target.value))}
          aria-invalid={!!e.abstract} aria-describedby={describedBy("abstract", e.abstract, "x")}
          className={inputClass}
        />
        <p
          aria-live="polite"
          className={`mt-1.5 text-sm font-medium ${wordsOk ? "text-emerald-700" : "text-ink/60"}`}
        >
          {words} words
        </p>
      </Field>

      <Field label="Keywords" name="keywords" error={e.keywords} hint="3 to 5 keywords, separated by commas." required>
        <input
          id="keywords" name="keywords" type="text" defaultValue={v.keywords} required
          placeholder="tokenization, real estate, AfCFTA"
          aria-invalid={!!e.keywords} aria-describedby={describedBy("keywords", e.keywords, "x")}
          className={inputClass}
        />
      </Field>

      <Field
        label="Upload full paper (PDF or DOCX)" name="paper" error={e.paper}
        hint={`3,000 to 6,000 words. Maximum ${MAX_FILE_MB} MB. Please remove author names from the manuscript for blind review.`}
        required
      >
        <input
          id="paper" name="paper" type="file" required
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-invalid={!!e.paper} aria-describedby={describedBy("paper", e.paper, "x")}
          className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand`}
        />
      </Field>

      <fieldset className="space-y-5 rounded-2xl border border-ink/15 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-widest text-ink/60">Declarations</legend>

        <Field label="Funding statement" name="funding" error={e.funding} hint="Write “None” if not applicable." required>
          <textarea
            id="funding" name="funding" rows={2} defaultValue={v.funding} required maxLength={1000}
            aria-invalid={!!e.funding} aria-describedby={describedBy("funding", e.funding, "x")}
            className={inputClass}
          />
        </Field>
        <Field label="Conflict-of-interest statement" name="conflict" error={e.conflict} hint="Write “None” if not applicable." required>
          <textarea
            id="conflict" name="conflict" rows={2} defaultValue={v.conflict} required maxLength={1000}
            aria-invalid={!!e.conflict} aria-describedby={describedBy("conflict", e.conflict, "x")}
            className={inputClass}
          />
        </Field>

        <div>
          <label className="flex items-start gap-3 text-sm leading-6">
            <input type="checkbox" name="originality" required className="mt-1 size-4 accent-ink" aria-invalid={!!e.originality} />
            <span>I confirm this work is original and is not under review elsewhere.</span>
          </label>
          {e.originality && <p role="alert" className="mt-1 text-sm font-medium text-red-700">{e.originality}</p>}
        </div>
        <div>
          <label className="flex items-start gap-3 text-sm leading-6">
            <input type="checkbox" name="consent" required className="mt-1 size-4 accent-ink" aria-invalid={!!e.consent} />
            <span>
              All authors consent to this submission, and I have read the{" "}
              <a href="/privacy" target="_blank" rel="noopener" className="font-semibold underline">privacy notice</a>.
            </span>
          </label>
          {e.consent && <p role="alert" className="mt-1 text-sm font-medium text-red-700">{e.consent}</p>}
        </div>
      </fieldset>

      <button
        type="submit" disabled={pending}
        className="w-full rounded-full bg-ink px-9 py-4 text-sm font-semibold uppercase tracking-wide text-brand transition hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Submitting…" : "Submit research"}
      </button>
    </form>
  );
}
