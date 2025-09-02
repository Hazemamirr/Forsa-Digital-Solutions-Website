// contact-backend/index.js
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");
require("dotenv").config();

// --- Resend (transactional email) ---
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

/** Security + JSON parsing */
app.use(helmet());
app.use(express.json());

/** IMPORTANT: we are behind Railway’s proxy -> trust X-Forwarded-* */
app.set("trust proxy", 1);

/** CORS: allow your public domains (and local dev) */
const allowedHosts = new Set([
  "fdsegypt.com",
  "www.fdsegypt.com",
  "localhost",
  "127.0.0.1",
]);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // curl/server-to-server
      try {
        const host = new URL(origin).hostname;
        cb(null, allowedHosts.has(host));
      } catch {
        cb(null, false);
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

/** Health */
app.get("/", (_req, res) =>
  res.json({ status: "OK", message: "Contact API is running" })
);
app.get("/health", (_req, res) => res.json({ ok: true }));

/** Debug helpers (keep while debugging, remove later) */
app.get("/debug/env", (_req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    CONTACT_TO: process.env.CONTACT_TO,
    RESEND_FROM: process.env.RESEND_FROM,
    RESEND_API_KEY_present: Boolean(process.env.RESEND_API_KEY),
    RESEND_API_KEY_preview: process.env.RESEND_API_KEY
      ? process.env.RESEND_API_KEY.slice(0, 4) + "…" + process.env.RESEND_API_KEY.slice(-4)
      : null,
  });
});
app.get("/debug/resend", async (_req, res) => {
  try {
    const r = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.CONTACT_TO,
      subject: "Resend Debug",
      text: "This is a debug email from /debug/resend",
    });
    // Support both { id } and { data: { id } }
    const id = r?.id || r?.data?.id || null;
    res.json({ ok: Boolean(id), result: r });
  } catch (e) {
    console.error("Resend debug error:", e?.response?.data || e);
    res.status(500).json({ ok: false, error: e?.message, detail: e?.response?.data });
  }
});

/** Rate limit: 5 per minute per IP */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  // With trust proxy enabled, req.ip is correct:
  keyGenerator: (req, _res) => req.ip,
});

/** POST /send-email (Resend) */
app.post("/send-email", emailLimiter, async (req, res) => {
  // Validate input
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(5).max(2000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", details: error.details });
  }

  const { fullName, email, company, message } = value;

  try {
    const r = await resend.emails.send({
      from: process.env.RESEND_FROM,           // e.g. onboarding@resend.dev (or a verified from)
      to: process.env.CONTACT_TO,              // e.g. contact@fdsegypt.com
      reply_to: email,                         // so you can reply to the sender
      subject: `New message from ${fullName} (${company})`,
      text:
`Name: ${fullName}
Email: ${email}
Company: ${company}

Message:
${message}`,
    });

    // Resend SDK can be { id } or { data: { id } }
    const id = r?.id || r?.data?.id;
    if (id) {
      return res.status(200).json({ success: true, message: "Email sent successfully!", id });
    }

    console.error("Resend unexpected response:", r);
    return res
      .status(502)
      .json({ success: false, message: "Email failed to send (no id)", raw: r });
  } catch (err) {
    // Log rich error from Resend if available
    const detail = err?.response?.data || err;
    console.error("Resend error:", detail);
    return res
      .status(502)
      .json({ success: false, message: "Email failed to send.", error: err?.message });
  }
});

/** Start server */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
