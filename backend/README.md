# BBA Express administration

Separate Express 5 service with a browser dashboard for enquiries, posts and consultations. Requires Node 24+ (uses built-in SQLite). Sanity is not used.

## Local setup

From the project root:

```sh
npm install --prefix backend
npm run admin:create
npm run admin:dev
```

Open http://localhost:4000 and sign in with the account you created. There are no default credentials. The account creation tool asks for a unique password of at least 12 characters; input is visible in the local terminal. It does not overwrite existing accounts.

The website development server proxies form submissions to port 4000 by default. Restart Next.js after adding the rewrite configuration. To make the website read managed blog content, set `ADMIN_SERVICE_URL=http://127.0.0.1:4000` in the root `.env.local` and restart Next.js. Without this variable, the original local blog posts remain visible. Once configured, the service is authoritative: an empty database shows no posts; an unavailable service shows the existing blog error boundary. Run `npm --prefix backend run seed` to import existing local articles; existing slugs are never overwritten.

## Capabilities

- Enquiries: receive service selections and questionnaire answers; search, filter by status or overdue follow-up, assign staff email, add internal notes, set UTC follow-up dates, close records and export filtered CSV. CSV exports include contact/request fields, not full questionnaires or internal notes, and neutralise spreadsheet formulas.
- Blog: create, edit, publish, unpublish and delete; unique slugs, topics, excerpts, plain-text paragraphs, image uploads and unsaved article previews. Published future-dated posts remain hidden until their date.
- Consultations: receive assessment requests, add requests manually, assign staff, schedule a UTC date/time and 15–480 minute duration, record notes, complete or cancel. The monthly calendar shows scheduled appointments. Overlaps are rejected for the same staff email; an unassigned appointment conservatively blocks all overlapping bookings. Adjacent appointments are allowed. This checks recorded appointments, not working hours or external calendars, and sends no invitations.
- Accounts: change your password with current-password verification (revokes all your sessions). Administrators can create staff accounts, change roles and disable/re-enable access. Role/access changes revoke that staff member's sessions. You cannot demote or disable yourself, and the last active administrator is protected.
- Activity history: administrators can browse recorded actions; authorised users can inspect each record's history. Events store actor, action, target, time and changed field names—not password values or snapshots of client answers. Historical actions before this upgrade are not backfilled. The log has no editing API but is not a tamper-proof external audit service.
- Dashboard counts, search and pagination, server-side validation, login rate limits, eight-hour revocable sessions, CSRF protection for admin writes, security headers and public-submission limits.

### Access roles

- Admin: all areas, staff access and global activity history.
- Editor: posts, image uploads, post history and own password.
- Staff: enquiries, exports, consultations, calendar, relevant record history and own password.

Existing operator-created accounts retain administrator access during the additive startup migration. Existing records and passwords are preserved. Provision initial passwords securely; no invitation emails or forced first-login password changes are currently sent.

### Uploaded images

Authenticated admins/editors can upload JPEG, PNG or WebP images up to 5 MB and 20 megapixels. Images are decoded, rotated, resized to fit 2000×2000, stripped of metadata and re-encoded to WebP. SVG and animated input are rejected. Stored images have random immutable filenames under `data/uploads` (beside the configured database) and are publicly served at `/media/...`; upload only public website media, never client documents. The website proxies `/media/:file` to the Express origin. Save the article after upload to attach the image. Unattached uploads are retained; storage cleanup is operator-managed.

## Structure

- `src/app.mjs`: routes, validation, authentication and access control.
- `src/features.mjs`: account/staff management, exports, calendar, uploads and audit helpers.
- `src/db.mjs`: SQLite schema and storage initialization.
- `src/auth.mjs`: salted password hashes and session-token hashing.
- `src/create-admin.mjs`: local account provisioning.
- `public/`: responsive admin interface; no private data is embedded in HTML.
- `test/`: API integration tests using an isolated in-memory database.
- `data/`: ignored persistent local database; never commit or serve this directory.

## API

Public: `POST /api/public/enquiries`, `POST /api/public/consultations`, `GET /api/public/posts`.

Admin: login/logout/me, summary, list and detail routes for `enquiries`, `posts`, `consultations`; PATCH updates; POST creates posts and consultations; DELETE removes posts. All admin routes except login require the session cookie. Writes also require `X-BBA-Admin: 1`. Enquiry and consultation records are closed/cancelled rather than deleted by the dashboard.

Additional admin endpoints: `POST account/password`, `GET/POST staff`, `PATCH staff/:email`, `GET activity?page=1`, `GET history/:kind/:id`, `GET enquiries/export`, `GET consultations/calendar?month=YYYY-MM`, and `POST uploads` with a raw image body. List and export filters accept `status`, `q` and `overdue=true`.

## Verification

Run `npm run admin:test` from the root. Tests cover authentication/CSRF, private-record isolation, workflow changes, publishing, role enforcement, account deactivation, password/session revocation, activity metadata, follow-up filters, CSV safety, scheduling conflicts, calendar results and image upload validation. Tests use isolated databases and temporary upload folders.

## Production requirements

Deploy Express separately on a long-running Node 24 host with an encrypted persistent disk. Do not place the SQLite database on Vercel's temporary filesystem. Set the website's `ADMIN_SERVICE_URL` to the service origin; never include credentials. Set backend `NODE_ENV=production`, use HTTPS, and only enable `TRUST_PROXY=1` when the service is reachable solely through one trusted reverse proxy. Use `HOST=0.0.0.0` only where required by your host and firewall it appropriately.

Back up SQLite using a consistent SQLite backup/snapshot procedure, including WAL handling, and back up the uploads directory; test restoration. Restrict filesystem permissions and administrator access. Establish retention policies for personal information and activity metadata. Forgotten-password recovery requires an operator-managed workflow; there is no public reset endpoint.

This version targets a single instance: rate limits are in memory and list filtering loads records before pagination. Next.js-proxied requests share the proxy IP, so the submission limiter is conservative. For higher traffic, use a trusted gateway with client-aware rate limiting and migrate storage/query pagination to PostgreSQL. MFA, email notifications, external calendar integration and per-record staff ownership restrictions are not implemented.

Security baseline follows [Express production security guidance](https://expressjs.com/en/advanced/best-practice-security/).
