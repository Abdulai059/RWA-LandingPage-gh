# ARWATS 2027: setup guide

## 1. Supabase
1. Create a project at supabase.com.
2. SQL Editor: paste and run `supabase/schema.sql`. It creates the tables, Row Level
   Security policies and the **private** `manuscripts` bucket.
3. Authentication > Users > **Add user** (email + password) for each staff member.
   (Turn OFF "Allow new users to sign up" under Authentication > Sign In / Providers.)
4. Make that user staff by running (SQL Editor):
   ```sql
   insert into public.profiles (id, full_name, role)
   select id, 'Your Name', 'admin' from auth.users where email = 'you@example.com';
   ```

## 2. Environment variables
Copy `.env.example` to `.env.local` for local work, and add the same values in
Vercel > Project > Settings > Environment Variables, then **redeploy**.
`SUPABASE_SERVICE_ROLE_KEY` is a server secret: never expose it in the browser.

## 3. Email (Resend)
Verify your sending domain in Resend (SPF/DKIM), then set `RESEND_API_KEY` and
`EMAIL_FROM`. Without these, submissions still work but no confirmation email is sent.

## 4. Before launch checklist
- [ ] Add the 4 missing research tracks in `app/lib/config.ts` (only 8 are named in the template).
- [ ] Set `SUBMISSION_DEADLINE` and fill in dates in `app/data/content.ts`.
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` and `SECRETARIAT_EMAIL`.
- [ ] Complete and legally review `/privacy` (retention period, date).
- [ ] Rewrite the leftover "business, entrepreneurship, leadership" copy in About, FAQ, WhyAttend, Programme, Speakers.
- [ ] Replace the placeholder Programme timetable with "Programme coming soon".
- [ ] Submit a test paper end to end (PDF and DOCX), download it from /admin, check the email.
- [ ] Confirm the `manuscripts` bucket is **not** public.

## What is built
| Route | Purpose |
|---|---|
| `/call-for-papers` | Theme, tracks, guidelines, dates |
| `/submit`, `/submit/success` | Submission form and reference number |
| `/contact`, `/privacy` | Contact form, privacy notice |
| `/admin/login` | Staff sign-in |
| `/admin` | Submissions: search, filters, status counts, CSV export |
| `/admin/submissions/[id]` | Detail, secure file download, status and notes, activity log |
| `/admin/messages` | Contact form inbox |

## Not built yet
Reviewer accounts, paper assignment, conflict-of-interest handling, blind-review
views, scoring forms and decision emails (Phase 4 of the plan). The `reviewer` role
exists in the database but has no access yet.

## Notes
- Uploads go through a Server Action and are capped at 4 MB (Vercel's request limit is 4.5 MB).
  For larger files, switch to signed direct-to-storage uploads.
- `next.config.ts`: removed the experimental `cacheComponents`, `partialPrefetching` and
  `agentFeedback` flags (they force every cookie read into `<Suspense>`, which the admin
  area doesn't need).
- Add Cloudflare Turnstile to `/submit` if you see spam; a honeypot field and a per-email
  daily limit are in place now.
