const nodemailer = require('nodemailer');
const debug = require('debug');
const devUtilsEmailClient = debug('devLog:utils_emailClient:');

async function sendEmail(user, token) {
  
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
      to: user.email,
      subject: 'Password Reset',
      html: `Click on this link to reset your password: http://localhost:3000/reset/resetpassword?token=${token}`
    };
    devUtilsEmailClient(mailOptions)

    await transporter.sendMail(mailOptions);
    devUtilsEmailClient(`Email sent to: ${mailOptions.to}`);
  } catch (err) {
    devUtilsEmailClient(`Error sending email: ${err.message}`);
  }
}

module.exports = {
  sendEmail
}