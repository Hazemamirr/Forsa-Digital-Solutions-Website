import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { fullName, email, company, message } = req.body;

    // Input validation
    if (!fullName || !email || !company || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (fullName.length < 2 || fullName.length > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name must be between 2 and 100 characters' 
      });
    }

    if (message.length < 20 || message.length > 2000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message must be between 20 and 2000 characters' 
      });
    }

    // Create transporter (you'll need to set up environment variables in Vercel)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'contact@fdsegypt.com',
      subject: `New message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
} 