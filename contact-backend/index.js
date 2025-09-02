// contact-backend/index.js
// Namecheap Private Email SMTP backend for your contact form

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* ------------------------ Basic hardening & parsing ----------------------- */
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

/* ---------------------------------- CORS ---------------------------------- */
// Allow your production site (and optionally previews while testing)
const allowedHosts = new Set([
  "fdsegypt.com",
  "www.fdsegypt.com",
  // "your-vercel-preview-url.vercel.app", // <- uncomment while testing previews
]);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // server-to-server / curl
    try {
      const host = new URL(origin).hostname;
      return cb(null, allowedHosts.has(host));
    } catch {
      return cb(null, false);
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ---------------------------- Health endpoints ---------------------------- */
app.get("/", (_req, res) =>
  res.json({ status: "OK", message: "Contact API is running" })
);
app.get("/health", (_req, res) => res.json({ ok: true }));

/* ------------------------------- Rate limit ------------------------------- */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

/* ------------------------------ SMTP setup --------------------------------
   Namecheap Private Email:
   - host: mail.privateemail.com
   - SSL/TLS on port 465  -> secure: true
   - STARTTLS on port 587 -> secure: false (we force STARTTLS)
--------------------------------------------------------------------------- */
const useTls =
  String(process.env.SMTP_SECURE || "").toLowerCase().trim() === "true";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.privateemail.com",
  port: Number(process.env.SMTP_PORT || (useTls ? 465 : 587)),
  secure: useTls, // true => TLS (465), false => STARTTLS (587)
  requireTLS: !useTls, // force STARTTLS when secure=false (port 587)
  auth: {
    user: process.env.EMAIL_USER, // contact@fdsegypt.com
    pass: process.env.EMAIL_PASS, // mailbox password
  },
  // Temporary debug (turn off later by setting SMTP_DEBUG=false)
  logger: String(process.env.SMTP_DEBUG || "").toLowerCase() === "true",
  debug: String(process.env.SMTP_DEBUG || "").toLowerCase() === "true",

  // Reasonable timeouts so requests don't hang
  connectionTimeout: 15000,
  greetingTimeout: 8000,
  socketTimeout: 15000,

  // Certificates from Namecheap are valid; keep this true in prod.
  tls: { rejectUnauthorized: true },
});

/* -------- TEMP: verify SMTP connectivity quickly (remove later) ---------- */
app.get("/debug/smtp", async (_req, res) => {
  try {
    await transporter.verify();
    res.json({ ok: true, note: "SMTP connection/auth OK" });
  } catch (err) {
    res.status(500).json({
      ok: false,
      code: err.code,
      command: err.command,
      message: err.message,
      response: err.response,
    });
  }
});

/* ----------------------------- /send-email API ---------------------------- */
app.post("/send-email", emailLimiter, async (req, res) => {
  // Validate inputs
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(10).max(5000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", details: error.details });
  }

  const { fullName, email, company, message } = value;

  // IMPORTANT: many providers require from = authenticated user
  const mailOptions = {
    from: process.env.EMAIL_USER, // must be your mailbox (contact@fdsegypt.com)
    replyTo: email,               // the sender who filled the form
    to: process.env.CONTACT_TO || "contact@fdsegypt.com",
    subject: `New message from ${fullName} (${company})`,
    text:
`Name: ${fullName}
Email: ${email}
Company: ${company}

Message:
${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    // Log structured error to Railway logs
    console.error("SMTP send error:", {
      code: err.code,
      command: err.command,
      message: err.message,
      response: err.response,
    });
    return res
      .status(500)
      .json({ success: false, message: "Email failed to send." });
  }
});

/* --------------------------------- Start ---------------------------------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
