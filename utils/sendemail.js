const nodemailer = require('nodemailer');
const debug = require('debug');
const devUtilsEmailClient = debug('devLog:utils_emailClient:');

async function sendEmail(to, subject, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.PROVIDER_HOST,
      port: process.env.PROVIDER_PORT,
      secure: process.env.PROVIDER_SETSECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: body,
    };

    await transporter.sendMail(mailOptions);
    devUtilsEmailClient(`Email sent to ${to}`);
  } catch (err) {
    devUtilsEmailClient(`Error sending email: ${err.message}`);
  }
}

module.exports = {
  sendEmail
}