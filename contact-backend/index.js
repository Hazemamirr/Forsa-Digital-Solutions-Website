// contact-backend/index.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* Basic hardening + JSON parsing */
app.use(helmet());
app.use(express.json());

/* CORS (allow your site + local dev) */
const allowed = new Set([
  "fdsegypt.com",
  "www.fdsegypt.com",
  // add your vercel preview domain if you want to test previews:
  // "your-project.vercel.app",
  "localhost",
  "127.0.0.1",
]);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      try {
        const host = new URL(origin).hostname;
        return cb(null, allowed.has(host));
      } catch {
        return cb(null, false);
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

/* Health endpoints for Railway */
app.get("/", (_req, res) => res.json({ status: "OK", message: "Contact API is running" }));
app.get("/health", (_req, res) => res.json({ ok: true }));

/* Rate limit the email endpoint */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

/* POST /send-email (Namecheap Private Email SMTP) */
app.post("/send-email", emailLimiter, async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(20).max(2000).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: "Invalid input", details: error.details });
  }

  const { fullName, email, company, message } = value;

  // --- Namecheap SMTP config ---
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.privateemail.com",
    port: Number(process.env.SMTP_PORT || 465), // 465 = SSL, 587 = STARTTLS
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user: process.env.EMAIL_USER, // contact@fdsegypt.com
      pass: process.env.EMAIL_PASS, // mailbox/app password
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.CONTACT_TO || process.env.EMAIL_USER, // where you want to receive the message
    subject: `New message from ${fullName} (${company})`,
    text: `Name: ${fullName}
Email: ${email}
Company: ${company}

Message:
${message}`,
  };

  try {
    console.log("[send-email] Attempting SMTP send…");
    await transporter.sendMail(mailOptions);
    console.log("[send-email] ✅ Email sent");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("[send-email] ❌ SMTP error:", {
      name: err.name,
      code: err.code,
      responseCode: err.responseCode,
      message: err.message,
    });
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

/* Start server (Railway sets PORT) */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
