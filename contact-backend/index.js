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
const allowedHosts = new Set(["fdsegypt.com", "www.fdsegypt.com"]);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      try {
        const host = new URL(origin).hostname;
        return cb(null, allowedHosts.has(host));
      } catch {
        return cb(null, false);
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

/* Health checks */
app.get("/", (_req, res) => res.json({ status: "OK", message: "Contact API is running" }));
app.get("/health", (_req, res) => res.json({ ok: true }));

/* Rate limit */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later.",
});

/* Email transporter (always Namecheap SMTP) */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.privateemail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* POST /send-email */
app.post("/send-email", emailLimiter, async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(10).max(2000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: "Invalid input", details: error.details });

  const { fullName, email, company, message } = value;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.CONTACT_TO || process.env.EMAIL_USER,
    subject: `New message from ${fullName} (${company})`,
    text: `Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
