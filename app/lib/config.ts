/* Central, editable settings for the submission system. */

export const SITE = {
  name: "ARWATS 2027",
  fullName: "Africa RWA & Tokenization Summit",
  location: "Accra, Ghana",
  date: "February 2027",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

/* TODO: the template names 8 of the 12 research tracks. Add the remaining 4 here. */
export const TRACKS = [
  {
    name: "Real Estate & Land",
    text: "Fractional ownership, land registries, titling and housing finance.",
  },
  {
    name: "Gold & Commodities",
    text: "Tokenized gold, minerals, oil and gas: provenance, custody and value capture.",
  },
  {
    name: "Agriculture & Food",
    text: "Commodity receipts, smallholder finance and supply chain traceability.",
  },
  {
    name: "Financial Markets",
    text: "Tokenized securities, bonds, funds, settlement and market structure.",
  },
  {
    name: "Law & Regulation",
    text: "Licensing, investor protection, property rights and harmonized frameworks.",
  },
  {
    name: "Blockchain Infrastructure",
    text: "Identity, custody, interoperability, oracles and payment rails.",
  },
  {
    name: "AfCFTA & Trade",
    text: "Tokenized trade finance, cross-border settlement and digital trade protocols.",
  },
  {
    name: "Carbon & Green Finance",
    text: "Carbon credits, green bonds and renewable energy assets.",
  },
  {
    name: "Other / Cross-cutting",
    text: "Work that spans several tracks or does not fit the tracks above.",
  },
] as const;

export const TRACK_NAMES: string[] = TRACKS.map((t) => t.name);

export const LIMITS = {
  abstractMinWords: 250,
  abstractMaxWords: 300,
  keywordsMin: 3,
  keywordsMax: 5,
  /* Vercel serverless request bodies are capped at 4.5 MB, so stay below it. */
  maxFileBytes: 4 * 1024 * 1024,
  maxPerEmailPerDay: 5,
};

export const MAX_FILE_MB = LIMITS.maxFileBytes / (1024 * 1024);

export const STATUSES = [
  { value: "received", label: "Received", tone: "bg-sky-100 text-sky-900" },
  { value: "incomplete", label: "Incomplete", tone: "bg-amber-100 text-amber-900" },
  { value: "desk_rejected", label: "Desk-rejected", tone: "bg-rose-100 text-rose-900" },
  { value: "under_review", label: "Under review", tone: "bg-violet-100 text-violet-900" },
  { value: "accepted", label: "Accepted", tone: "bg-emerald-100 text-emerald-900" },
  { value: "revise", label: "Revise", tone: "bg-orange-100 text-orange-900" },
  { value: "rejected", label: "Rejected", tone: "bg-neutral-200 text-neutral-800" },
] as const;

export type StatusValue = (typeof STATUSES)[number]["value"];

export const STATUS_VALUES: string[] = STATUSES.map((s) => s.value);

export function statusMeta(value: string) {
  return STATUSES.find((s) => s.value === value) ?? STATUSES[0];
}

/*
 * Submission window. Set in the environment (no redeploy of code needed):
 *   SUBMISSIONS_OPEN=false            closes submissions immediately
 *   SUBMISSION_DEADLINE=2026-12-31    ISO date; closes after the end of that day (UTC)
 */
export function getSubmissionWindow(): { open: boolean; reason?: string } {
  if (process.env.SUBMISSIONS_OPEN === "false") {
    return { open: false, reason: "Submissions are currently closed." };
  }
  const deadline = process.env.SUBMISSION_DEADLINE;
  if (deadline) {
    const end = new Date(`${deadline}T23:59:59Z`);
    if (!Number.isNaN(end.getTime()) && Date.now() > end.getTime()) {
      return { open: false, reason: "The submission deadline has passed." };
    }
  }
  return { open: true };
}

export const AFRICAN_COUNTRIES = [
  "Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon",
  "Central African Republic","Chad","Comoros","Congo (Republic)","Congo (DR)","Côte d’Ivoire",
  "Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia",
  "Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi",
  "Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda",
  "São Tomé and Príncipe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa",
  "South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe",
  "Other (outside Africa)",
];
