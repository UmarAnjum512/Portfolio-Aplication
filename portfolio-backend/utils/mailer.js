const nodemailer = require('nodemailer');

// Contact form ka email notification (optional). EMAIL_USER / EMAIL_PASS na ho to skip ho jata hai.
const sendContactEmail = async ({ name, email, message }) => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) return;

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST || 'smtp.gmail.com',
      port: Number(EMAIL_PORT) || 587,
      secure: Number(EMAIL_PORT) === 465,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
  } catch (error) {
    // Email fail ho to bhi message DB me save ho chuka hota hai
    console.error('Email send failed:', error.message);
  }
};

module.exports = { sendContactEmail };
