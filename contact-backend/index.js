// contact-backend/index.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* --- Middleware --- */
app.use(helmet());
app.use(express.json());

// CORS: your public domains
const allowedHosts = new Set(["fdsegypt.com", "www.fdsegypt.com"]);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      try {
        const host = new URL(origin).hostname;
        cb(null, allowedHosts.has(host));
      } catch {
        cb(null, false);
      }
    },
  })
);

/* --- Health --- */
app.get("/", (_req, res) => res.json({ status: "OK", message: "Contact API is running" }));
app.get("/health", (_req, res) => res.json({ ok: true }));

/* --- Build a transporter from env --- */
function buildTransporterFromEnv() {
  const host = process.env.SMTP_HOST || "mail.privateemail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for 587 (STARTTLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Helpful timeouts so we fail fast (and log a clear error)
    connectionTimeout: 15000, // 15s
    greetingTimeout: 15000,
    socketTimeout: 20000,
    // If the provider’s cert chain is quirky, this prevents false negatives
    tls: {
      rejectUnauthorized: true,
      // You can flip this to false ONLY to test if certs are the issue:
      // rejectUnauthorized: false,
    },
  });
}

/* --- Debug route to test SMTP on both common ports --- */
app.get("/debug/smtp", async (_req, res) => {
  const tests = [
    { port: 587, secure: false, label: "587 STARTTLS" },
    { port: 465, secure: true, label: "465 SSL" },
  ];

  const results = [];
  for (const t of tests) {
    const tr = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.privateemail.com",
      port: t.port,
      secure: t.secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
      tls: { rejectUnauthorized: true },
    });

    try {
      const ok = await tr.verify();
      results.push({ label: t.label, port: t.port, secure: t.secure, ok });
    } catch (e) {
      results.push({
        label: t.label,
        port: t.port,
        secure: t.secure,
        ok: false,
        code: e.code,
        command: e.command,
        message: e.message,
      });
    }
  }

  res.json({
    host: process.env.SMTP_HOST || "mail.privateemail.com",
    user: process.env.EMAIL_USER,
    results,
  });
});

/* --- Rate limit the mail endpoint --- */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
});

/* --- Send email --- */
app.post("/send-email", emailLimiter, async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(5).max(2000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: "Invalid input", details: error.details });

  const { fullName, email, company, message } = value;

  const transporter = buildTransporterFromEnv();

  const mailOptions = {
    from: process.env.EMAIL_USER,              // must be the authenticated mailbox
    to: process.env.CONTACT_TO || process.env.EMAIL_USER,
    replyTo: email,                            // user who filled the form
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
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("SMTP send error:", {
      code: err.code,
      command: err.command,
      message: err.message,
    });
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

/* --- Start --- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
