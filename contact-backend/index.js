const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");
require("dotenv").config();

const app = express();

/* Security + JSON parsing */
app.use(helmet());
app.use(express.json());

/* CORS: allow your domains */
const allowedHosts = new Set([
  "fdsegypt.com",
  "www.fdsegypt.com",
  // optional: allow Vercel preview while testing:
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
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight

/* Health checks */
app.get("/", (_req, res) => res.json({ status: "OK", message: "Contact API is running" }));
app.get("/health", (_req, res) => res.json({ ok: true }));

/* Rate limit */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

/* POST /send-email */
app.post("/send-email", emailLimiter, async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(20).max(2000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: "Invalid input", details: error.details });

  const { fullName, email, company, message } = value;

  // === CHOOSE ONE TRANSPORTER (A or B) ===

  // A) If your mailbox is on Google Workspace (Gmail for your domain):
  // - Enable 2FA for the account and create an App Password
  // - Set MAIL_TRANSPORT="gmail" and use GMAIL_USER/GMAIL_PASS env vars
  const gmailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
  });

  // B) If your mailbox is Namecheap Private Email (NOT Gmail), use SMTP:
  // - Find creds in Namecheap → Private Email
  // - Set MAIL_TRANSPORT="smtp" and use EMAIL_USER/EMAIL_PASS
  const smtpTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.privateemail.com",
    port: Number(process.env.SMTP_PORT || 465), // 465 for SSL, 587 for STARTTLS
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const transporter = process.env.MAIL_TRANSPORT === "gmail" ? gmailTransporter : smtpTransporter;

  const mailOptions = {
    from: (process.env.MAIL_TRANSPORT === "gmail" ? process.env.GMAIL_USER : process.env.EMAIL_USER),
    replyTo: email,
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
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

/* Start server (Railway provides PORT) */
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


