app.post("/send-email", emailLimiter, async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(20).max(2000).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      details: error.details,
    });
  }

  const { fullName, email, company, message } = value;

  // --- Namecheap Private Email SMTP ---
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.privateemail.com",
    port: Number(process.env.SMTP_PORT || 465), // 465 = SSL, 587 = STARTTLS
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : true,
    auth: {
      user: process.env.EMAIL_USER, // contact@fdsegypt.com
      pass: process.env.EMAIL_PASS, // mailbox password / app password
    },
    connectionTimeout: 10000, // 10s
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.CONTACT_TO || process.env.EMAIL_USER,
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
    console.log("[send-email] ✅ Email sent successfully");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("[send-email] ❌ Email error:", {
      name: err.name,
      code: err.code,
      responseCode: err.responseCode,
      message: err.message,
    });
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});
