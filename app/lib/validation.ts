import { LIMITS, TRACK_NAMES, AFRICAN_COUNTRIES } from "@/lib/config";

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function parseKeywords(raw: string) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of raw.split(/[,;\n]/)) {
    const t = k.trim();
    if (t && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      out.push(t);
    }
  }
  return out;
}

export function validateSubmissionFields(formData: FormData) {
  const errors: FieldErrors = {};

  const author_name = str(formData, "author_name");
  const email = str(formData, "email").toLowerCase();
  const institution = str(formData, "institution");
  const country = str(formData, "country");
  const title = str(formData, "title");
  const track = str(formData, "track");
  const abstract = str(formData, "abstract");
  const keywords = parseKeywords(str(formData, "keywords"));
  const funding = str(formData, "funding");
  const conflict = str(formData, "conflict");
  const originality = formData.get("originality") === "on";
  const consent = formData.get("consent") === "on";

  if (author_name.length < 2) errors.author_name = "Enter the author’s full name.";
  if (author_name.length > 200) errors.author_name = "Name is too long.";
  if (!EMAIL_RE.test(email) || email.length > 254)
    errors.email = "Enter a valid email address.";
  if (institution.length > 300) errors.institution = "Too long (300 characters max).";
  if (!AFRICAN_COUNTRIES.includes(country)) errors.country = "Select a country.";
  if (title.length < 5) errors.title = "Enter the paper title.";
  if (title.length > 300) errors.title = "Title is too long (300 characters max).";
  if (!TRACK_NAMES.includes(track)) errors.track = "Select a research track.";

  const words = countWords(abstract);
  if (words < LIMITS.abstractMinWords || words > LIMITS.abstractMaxWords) {
    errors.abstract = `Abstract must be ${LIMITS.abstractMinWords} to ${LIMITS.abstractMaxWords} words (currently ${words}).`;
  }

  if (
    keywords.length < LIMITS.keywordsMin ||
    keywords.length > LIMITS.keywordsMax ||
    keywords.some((k) => k.length > 60)
  ) {
    errors.keywords = `Enter ${LIMITS.keywordsMin} to ${LIMITS.keywordsMax} keywords separated by commas.`;
  }

  if (!funding || funding.length > 1000)
    errors.funding = "Describe funding, or write “None” (1000 characters max).";
  if (!conflict || conflict.length > 1000)
    errors.conflict = "Declare any conflict of interest, or write “None” (1000 characters max).";
  if (!originality)
    errors.originality = "You must confirm the work is original and not under review elsewhere.";
  if (!consent)
    errors.consent = "All authors must consent to the submission and the privacy notice.";

  return {
    errors,
    values: {
      author_name, email, institution, country, title, track, abstract,
      keywords: keywords.join(", "), funding, conflict,
    },
    data: {
      author_name, email, institution: institution || null, country, title, track,
      abstract, keywords, funding, conflict, originality, consent,
    },
  };
}

const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46, 0x2d]; // %PDF-
const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04]; // PK..  (DOCX is a zip)
const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Checks size, extension and file signature (not just the browser-supplied MIME type). */
export async function validatePaperFile(file: unknown): Promise<{
  error?: string;
  ext?: "pdf" | "docx";
  mime?: string;
}> {
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Upload your full paper as a PDF or DOCX file." };
  }
  if (file.size > LIMITS.maxFileBytes) {
    return {
      error: `File is too large. The limit is ${LIMITS.maxFileBytes / 1024 / 1024} MB.`,
    };
  }
  const name = file.name.toLowerCase();
  const ext = name.endsWith(".pdf") ? "pdf" : name.endsWith(".docx") ? "docx" : null;
  if (!ext) return { error: "Only PDF or DOCX files are accepted." };

  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  const magic = ext === "pdf" ? PDF_MAGIC : ZIP_MAGIC;
  if (!magic.every((b, i) => head[i] === b)) {
    return { error: "The file does not look like a valid PDF or DOCX document." };
  }
  return { ext, mime: ext === "pdf" ? "application/pdf" : DOCX_MIME };
}

export function safeFileName(name: string) {
  return name.replace(/[^\w.\- ()]/g, "_").slice(0, 120);
}

export function validateContact(formData: FormData) {
  const errors: FieldErrors = {};
  const name = str(formData, "name");
  const email = str(formData, "email").toLowerCase();
  const subject = str(formData, "subject");
  const message = str(formData, "message");
  if (name.length < 2 || name.length > 200) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (subject.length > 200) errors.subject = "Subject is too long.";
  if (message.length < 10 || message.length > 5000)
    errors.message = "Message must be between 10 and 5000 characters.";
  return { errors, values: { name, email, subject, message } };
}
