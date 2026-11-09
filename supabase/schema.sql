-- ARWATS 2027: run this once in the Supabase SQL Editor.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE where possible).

-- 1. Staff profiles --------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null check (role in ('admin', 'editor', 'reviewer')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'editor')
  );
$$;
revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;

-- 2. Submissions -----------------------------------------------------------
create sequence if not exists public.submission_ref_seq;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique
    default ('ARWATS27-' || lpad(nextval('public.submission_ref_seq')::text, 4, '0')),
  author_name text not null,
  email text not null,
  institution text,
  country text not null,
  title text not null,
  track text not null,
  abstract text not null,
  keywords text[] not null,
  declarations jsonb not null,
  status text not null default 'received'
    check (status in ('received','incomplete','desk_rejected','under_review','accepted','revise','rejected')),
  file_path text,
  file_name text,
  file_size bigint,
  file_type text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists submissions_status_idx on public.submissions (status);
create index if not exists submissions_track_idx on public.submissions (track);
create index if not exists submissions_created_idx on public.submissions (created_at desc);
create index if not exists submissions_email_idx on public.submissions (email, created_at);

-- 3. Audit log ---------------------------------------------------------------
create table if not exists public.audit_logs (
  id bigserial primary key,
  actor_id uuid references auth.users(id) on delete set null,
  actor_email text,
  action text not null,
  submission_id uuid references public.submissions(id) on delete set null,
  details jsonb,
  created_at timestamptz not null default now()
);

-- 4. Contact messages ---------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- 5. Row Level Security: nothing is public. -----------------------------------
alter table public.profiles enable row level security;
alter table public.submissions enable row level security;
alter table public.audit_logs enable row level security;
alter table public.contact_messages enable row level security;

revoke all on public.profiles, public.submissions, public.audit_logs, public.contact_messages from anon;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());

drop policy if exists "staff read submissions" on public.submissions;
create policy "staff read submissions" on public.submissions
  for select to authenticated using (public.is_staff());

drop policy if exists "staff update submissions" on public.submissions;
create policy "staff update submissions" on public.submissions
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

-- Staff may only change these columns; everything else is write-once.
revoke update on public.submissions from authenticated;
grant update (status, internal_notes, updated_at) on public.submissions to authenticated;
revoke insert, delete on public.submissions from authenticated;

drop policy if exists "staff read audit" on public.audit_logs;
create policy "staff read audit" on public.audit_logs
  for select to authenticated using (public.is_staff());

drop policy if exists "staff write audit" on public.audit_logs;
create policy "staff write audit" on public.audit_logs
  for insert to authenticated
  with check (public.is_staff() and actor_id = auth.uid());
revoke update, delete on public.audit_logs from authenticated;

drop policy if exists "staff read messages" on public.contact_messages;
create policy "staff read messages" on public.contact_messages
  for select to authenticated using (public.is_staff());
revoke insert, update, delete on public.contact_messages from authenticated;

-- Public inserts happen ONLY through the Next.js server (service-role key),
-- which validates input first. There is no anonymous insert policy on purpose.

-- 6. Private storage bucket for manuscripts -------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'manuscripts', 'manuscripts', false, 4194304,
  array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
-- No storage policies are created: only the server (service role) can read or write files.

-- 7. Create your first admin ---------------------------------------------------
-- a) Supabase dashboard > Authentication > Users > Add user (email + password).
-- b) Then run, with that user's email:
--
-- insert into public.profiles (id, full_name, role)
-- select id, 'Your Name', 'admin' from auth.users where email = 'you@example.com';
