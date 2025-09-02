/**
 * Forsa Contact API (Namecheap SMTP only)
 * -------------------------------------------------
 * Env vars required on Railway:
 *   EMAIL_USER=contact@fdsegypt.com
 *   EMAIL_PASS=<your mailbox password>
 *   SMTP_HOST=mail.privateemail.com
 *   SMTP_PORT=587            // 587 STARTTLS (recommended)
 *   SMTP_SECURE=false        // false for STARTTLS (true if you switch to 465)
 *   CONTACT_TO=contact@fdsegypt.com  (optional; defaults to EMAIL_USER)
 *   NODE_ENV=production
 */

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const Joi = require("joi");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* ---------- Security & parsing ---------- */
app.use(helmet());
app.use(express.json());

/* ---------- CORS (allow your domains) ---------- */
const allowedHosts = new Set([
  "fdsegypt.com",
  "www.fdsegypt.com",
  // Add your Vercel preview domain while testing, then remove:
  // "<your-project>.vercel.app",
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

/* ---------- Health endpoints ---------- */
app.get("/", (_req, res) =>
  res.json({ status: "OK", message: "Contact API is running" })
);
app.get("/health", (_req, res) => res.json({ ok: true }));

/* ---------- Rate limit for email ---------- */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

/* ---------- Build a Namecheap SMTP transporter ---------- */
function buildSmtpTransporter() {
  const host = process.env.SMTP_HOST || "mail.privateemail.com";
  const port = Number(process.env.SMTP_PORT || 587); // 587 STARTTLS
  const secure =
    (process.env.SMTP_SECURE || "false").toLowerCase() === "true"; // true only for 465

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing EMAIL_USER or EMAIL_PASS. Set them in Railway → Variables."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure, // false for 587 (STARTTLS), true for 465 (SSL)
    auth: { user, pass },
    // Helpful timeouts for PaaS environments
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    tls: {
      // Namecheap has valid certs; keep rejectUnauthorized=true in prod if no issues.
      // While debugging odd TLS chains, you can flip this to false.
      rejectUnauthorized: true,
      ciphers: "TLSv1.2",
      minVersion: "TLSv1.2",
    },
  });
}

/* ---------- TEMP: SMTP debug endpoint (remove after success) ---------- */
app.get("/debug/smtp", async (_req, res) => {
  let transporter;
  try {
    transporter = buildSmtpTransporter();
  } catch (e) {
    return res.status(500).json({ ok: false, stage: "init", message: e.message });
  }

  try {
    await transporter.verify();
    res.json({ ok: true, message: "SMTP connection/auth OK" });
  } catch (e) {
    res.status(500).json({
      ok: false,
      stage: "verify",
      code: e.code,
      command: e.command,
      message: e.message,
      response: e.response,
    });
  }
});

/* ---------- POST /send-email ---------- */
app.post("/send-email", emailLimiter, async (req, res) => {
  // Validate input
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(10).max(4000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", details: error.details });
  }

  const { fullName, email, company, message } = value;

  // Build the transporter (Namecheap SMTP only)
  let transporter;
  try {
    transporter = buildSmtpTransporter();
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }

  const to = process.env.CONTACT_TO || process.env.EMAIL_USER;

  const mailOptions = {
    // IMPORTANT: many providers require the From to match the authenticated user
    from: process.env.EMAIL_USER,
    to,
    replyTo: email, // you can reply directly to the sender
    subject: `New message from ${fullName} (${company})`,
    text: `Name: ${fullName}
Email: ${email}
Company: ${company}

Message:
${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    // Minimal log – avoid leaking secrets
    console.error("SMTP send error:", {
      code: err.code,
      command: err.command,
      message: err.message,
      response: err.response,
    });
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

/* ---------- Start server ---------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
