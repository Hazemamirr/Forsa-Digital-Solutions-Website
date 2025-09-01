const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Health check endpoint for Railway
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Contact API is running' });
});

// Rate limiting: max 5 requests per minute per IP for /send-email
const emailLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many requests from this IP, please try again later.'
});

app.post('/send-email', emailLimiter, async (req, res) => {
  // Input validation schema
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(20).max(2000).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: 'Invalid input', details: error.details });
  }
  const { fullName, email, company, message } = value;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // from .env
      pass: process.env.GMAIL_PASS // from .env
    }
  });

  const mailOptions = {
    from: email,
    to: 'contact@fdsegypt.com',
    subject: `New message from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Email failed to send.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Note: For production, always use HTTPS and secure environment variable management. 