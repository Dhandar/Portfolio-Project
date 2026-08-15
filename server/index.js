import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { connectDB, Submission } from "./db.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "submissions.json");

const app = express();
const PORT = process.env.PORT || 5000;

// If MONGODB_URI is set, submissions are stored in MongoDB (persistent,
// recommended for production). Otherwise they fall back to the local JSON
// file, which is fine for local testing but not for platforms with
// ephemeral disks (e.g. Render/Railway free tiers wipe it on redeploy).
let usingDatabase = false;

// Allow requests from your frontend (set FRONTEND_URL in .env for production)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);
app.use(express.json());

// --- storage helpers -----------------------------------------------------
// Uses MongoDB when configured, otherwise falls back to the local JSON file.

function readSubmissionsFromFile() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveSubmissionToFile(entry) {
  const all = readSubmissionsFromFile();
  all.unshift(entry); // newest first
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2));
}

async function saveSubmission(entry) {
  if (usingDatabase) {
    const doc = await Submission.create(entry);
    return doc;
  }
  saveSubmissionToFile(entry);
  return entry;
}

async function readSubmissions() {
  if (usingDatabase) {
    return Submission.find().sort({ receivedAt: -1 }).lean();
  }
  return readSubmissionsFromFile();
}

// Only set up email sending if SMTP credentials are provided.
// Works with Gmail (use an App Password, not your normal password),
// or any SMTP provider (SendGrid, Mailgun, Resend, etc.)
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendNotificationEmail(entry) {
  if (!transporter) return; // email not configured — submission is still saved to disk
  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to,
    replyTo: entry.email,
    subject: `New portfolio message: ${entry.subject}`,
    text: `From: ${entry.name} <${entry.email}>\n\n${entry.message}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(entry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(entry.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(entry.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(entry.message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#888;font-size:12px">Received ${entry.receivedAt}</p>
    `,
  });
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// simple in-memory rate limiter (per IP, 5 requests / 10 min)
const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const max = 5;
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count > max;
}

// --- routes --------------------------------------------------------------

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const { name, email, subject, message, company } = req.body || {};

  // "company" is a honeypot field — real users never fill it in, bots do.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    subject: String(subject).slice(0, 300),
    message: String(message).slice(0, 5000),
    receivedAt: new Date().toISOString(),
    ip,
  };

  try {
    await saveSubmission(entry);
  } catch (err) {
    console.error("Failed to save submission:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }

  try {
    await sendNotificationEmail(entry);
  } catch (err) {
    // Submission is already saved to disk, so don't fail the request just
    // because email sending failed — just log it.
    console.error("Failed to send notification email:", err);
  }

  res.status(201).json({ ok: true });
});

// Protected endpoint to review submissions: GET /api/contact?token=YOUR_ADMIN_TOKEN
app.get("/api/contact", async (req, res) => {
  const token = req.query.token || req.headers["x-admin-token"];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    res.json(await readSubmissions());
  } catch (err) {
    console.error("Failed to read submissions:", err);
    res.status(500).json({ error: "Could not load submissions." });
  }
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB(process.env.MONGODB_URI);
      usingDatabase = true;
      console.log("Database: connected to MongoDB");
    } catch (err) {
      console.error("Failed to connect to MongoDB, falling back to local file storage:", err.message);
      usingDatabase = false;
    }
  } else {
    console.log("Database: MONGODB_URI not set — using local file storage (server/data/submissions.json)");
  }

  app.listen(PORT, () => {
    console.log(`Contact API running on http://localhost:${PORT}`);
    console.log(
      transporter
        ? "Email notifications: enabled"
        : "Email notifications: disabled (set SMTP_HOST/SMTP_USER/SMTP_PASS in server/.env to enable)"
    );
  });
}

start();
