# Contact Form Backend

A small Express API that receives submissions from the portfolio's contact
form, saves them to disk, and (optionally) emails you a notification so you
can review each message.

## What it does

- `POST /api/contact` — validates the submission, saves it to
  `server/data/submissions.json`, and emails you (if SMTP is configured).
- `GET /api/contact?token=YOUR_ADMIN_TOKEN` — returns all saved submissions
  as JSON, so you can review them any time without checking email.
- Basic spam protection: a honeypot field + a simple rate limit (5
  submissions per IP every 10 minutes).

## 1. Install

```bash
cd server
npm install
```

## 2. Configure

```bash
cp .env.example .env
```

Then edit `.env`:

- **To just save messages (no email):** leave `SMTP_*` blank — submissions
  are still written to `server/data/submissions.json`, and you can view them
  at `GET /api/contact?token=...`.
- **To get emailed for every new message (recommended):** fill in
  `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`. For Gmail:
  1. Turn on 2-Step Verification on your Google Account.
  2. Create an "App Password" at https://myaccount.google.com/apppasswords
  3. Use that 16-character password as `SMTP_PASS` (not your normal Gmail password).
- Set `ADMIN_TOKEN` to any long random string — this protects the
  `GET /api/contact` endpoint so strangers can't read your messages.

## 3. Run

```bash
npm start
```

The API runs at `http://localhost:5000` by default.

## 4. Connect the frontend

In the project root (not `server/`), copy `.env.example` to `.env` and make
sure `VITE_API_URL` points at this server (defaults to
`http://localhost:5000`, which works for local development out of the box).

Run both together during development:

```bash
# terminal 1
cd server && npm start

# terminal 2 (project root)
npm run dev
```

Fill out the contact form on the site — you should see the submission
appear in `server/data/submissions.json` (and in your inbox, if email is
configured).

## Deploying

This is a plain Node/Express app, so it deploys to any Node host — Render,
Railway, Fly.io, a VPS, etc. After deploying:

1. Set the same environment variables from `.env` in your host's dashboard.
2. Update `VITE_API_URL` in the frontend's `.env` (or your hosting
   provider's env settings) to your deployed API's URL, then rebuild the
   frontend.
3. Set `FRONTEND_URL` on the server to your deployed frontend's URL so CORS
   allows it.

Note: `server/data/submissions.json` is local disk storage — fine for a
personal portfolio, but on hosts with ephemeral filesystems (like some free
tiers) it will reset on redeploy. If you want messages to persist long-term
there, either keep relying on email notifications, or swap the JSON file for
a small database (e.g. MongoDB Atlas free tier) later.
