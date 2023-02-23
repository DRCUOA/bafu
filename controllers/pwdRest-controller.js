const debug = require('debug');
// debug namespace
const devPwdResets_Controller = debug('devLog:controller_pwdResets');
// import dao
const userDao = require('../models/user-dao');

async function checkEmailExists(email) {
  devPwdResets_Controller(`checkEmailExists(${email})`);
  try {
    const userObject = await userDao.retrieveUserWithEmail(email);
    devPwdResets_Controller('email found, username in object returned: ', userObject.username);
  return userObject
  } catch (err) {
    devPwdResets_Controller(err);
  return false
  }

}

module.exports = {
  checkEmailExists
}