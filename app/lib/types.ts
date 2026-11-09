export type Submission = {
  id: string;
  ref: string;
  author_name: string;
  email: string;
  institution: string | null;
  country: string;
  title: string;
  track: string;
  abstract: string;
  keywords: string[];
  declarations: {
    originality: boolean;
    consent: boolean;
    funding: string;
    conflict: string;
  };
  status: string;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  file_type: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type AuditEntry = {
  id: number;
  actor_email: string | null;
  action: string;
  details: Record<string, unknown> | null;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};
