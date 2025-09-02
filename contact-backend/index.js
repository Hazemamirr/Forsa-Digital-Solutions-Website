const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
require('dotenv').config();

const { Resend } = require('resend');

const app = express();

/* ---------- Security + parsing ---------- */
app.use(helmet());
app.use(express.json());

/* ---------- CORS (allow your domains) ---------- */
const allowedHosts = new Set(['fdsegypt.com', 'www.fdsegypt.com']);
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
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

/* ---------- Health ---------- */
app.get('/', (_req, res) =>
  res.json({ status: 'OK', message: 'Contact API is running' })
);
app.get('/health', (_req, res) => res.json({ ok: true }));

/* ---------- Helpers ---------- */
const bool = (v) => String(v || '').toLowerCase() === 'true';
const redact = (v) => (v ? `${String(v).slice(0, 4)}…${String(v).slice(-4)}` : null);

/* ---------- DEBUG endpoints (temporary) ---------- */
// Shows which env vars are present (no secrets)
app.get('/debug/env', (_req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    CONTACT_TO: process.env.CONTACT_TO,
    RESEND_FROM: process.env.RESEND_FROM,
    RESEND_API_KEY_present: !!process.env.RESEND_API_KEY,
    RESEND_API_KEY_preview: redact(process.env.RESEND_API_KEY),
  });
});

// Attempts a tiny Resend send and returns the raw API response/error
app.get('/debug/resend', async (_req, res) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const out = await resend.emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: process.env.CONTACT_TO || 'contact@fdsegypt.com',
      subject: '[debug] Resend test',
      text: 'This is a debug test from /debug/resend',
    });
    res.json({ ok: true, result: out });
  } catch (err) {
    // Surface the best error we can without crashing
    const detail = err?.response?.data || err?.message || err || 'Unknown error';
    console.error('Resend debug error:', detail);
    res.status(500).json({ ok: false, error: detail });
  }
});

/* ---------- Rate limit for main endpoint ---------- */
const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

/* ---------- POST /send-email ---------- */
app.post('/send-email', emailLimiter, async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(10).max(2000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid input', details: error.details });
  }

  const { fullName, email, company, message } = value;

  const resendKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO || 'contact@fdsegypt.com';
  const fromAddr = process.env.RESEND_FROM || 'onboarding@resend.dev';

  if (!resendKey) {
    return res
      .status(500)
      .json({ success: false, message: 'Email failed to send.' });
  }

  try {
    const resend = new Resend(resendKey);
    const result = await resend.emails.send({
      from: fromAddr,
      to: contactTo,
      reply_to: email,
      subject: `New message from ${fullName} (${company})`,
      text: `Name: ${fullName}
Email: ${email}
Company: ${company}

Message:
${message}`,
    });

    // Basic sanity check: Resend returns { id: '...' } on success
    if (result?.id) {
      return res
        .status(200)
        .json({ success: true, message: 'Email sent successfully!' });
    }

    console.error('Resend unexpected response:', result);
    return res
      .status(500)
      .json({ success: false, message: 'Email failed to send.' });
  } catch (err) {
    const detail = err?.response?.data || err?.message || err || 'Unknown error';
    console.error('Resend send error:', detail);
    return res
      .status(500)
      .json({ success: false, message: 'Email failed to send.' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
