const resetTokens = require('../utils/generateResetToken')
const emailClient = require('../utils/sendemail');

const debug = require('debug');
// debug namespace
const devEmailService = debug('devLog:service_email');

function generateResetPasswordEmail(userObject) {
  // generate a new token
  const token = resetTokens.generateResetToken(userObject);
  // update user in db with token
  
}

module.exports = {

}