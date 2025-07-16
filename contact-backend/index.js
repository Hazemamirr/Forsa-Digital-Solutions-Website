const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { fullName, email, company, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amirhazem035@gmail.com', // your email
      pass: 'rgaw ndmj nktx uyey' // your Gmail app password
    }
  });

  const mailOptions = {
    from: email,
    to: 'amirhazem035@gmail.com',
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 