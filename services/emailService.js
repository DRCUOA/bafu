const resetTokens = require('../utils/generateResetToken')
const emailClient = require('../utils/sendemail');


const debug = require('debug');
// debug namespace
const devEmailService = debug('devLog:service_email');

async function generateResetPasswordEmail(userObject) {
  // generate a new token
  const token = resetTokens.generateResetToken(userObject);
  devEmailService(token);
  // generate the reset password email with the token
  const transporter = await emailClient.sendEmail(userObject, token);
}

module.exports = {
  generateResetPasswordEmail
}