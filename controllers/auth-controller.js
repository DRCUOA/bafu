const debug = require('debug');

// debug namespace
const devAuthCtrl = debug('devLog:controller_auth');
// import dao
const userDao = require('../models/user-dao');

// add user to locals
async function addUserToLocals(req, res, next) {
  devAuthCtrl('attempt to add user to locals');
  const user = await userDao.retrieveUserWithAuthToken(req.cookies.authToken);

  try {
    if (user) {
      res.locals.user = user;
      devAuthCtrl(`${user.username} is active`);
      next();
    } else {
      devAuthCtrl('no user active');
      next();
    }
  } catch (err) {
    devAuthCtrl(err);
    next();
  };
};

// verify if req is from an authenticated user
async function verifyAuthenticated(req, res, next) {
  if( res.locals.user ) {
    devAuthCtrl('User authenticated')
    next();
  } else {
    devAuthCtrl('User not authenticated: render index')
  res.render("index");
  }
};

async function checkEmailInDb(email) {
  devAuthCtrl(`checkEmailInDb(${email})`);
  try {
    const user = await userDao.retrieveUserWithEmail(email);
    if(user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    devAuthCtrl(`Error checking email in DB: ${err.message}`);
    return false;
  }
}

async function saveResetToken(email, token, expiration) {
  devAuthCtrl(`Saving reset token for email: ${email}, token: ${token}, expiration: ${expiration}`);
  try {
    const user = await userDao.retrieveUserWithEmail(email);
    if (!user) {
      devAuthCtrl(`User not found for email: ${email}`);
      return false;
    }

    user.pwdResetToken = token;
    user.pwdResetToken_expiration = expiration;
    devAuthCtrl(`updated user object being sent to dao:  ${user.pwdResetToken}`)
    await userDao.updateUser(user);
    devAuthCtrl(`Reset token saved for email: ${email}`);

    return true;

  } catch (error) {
    console.error(`Error saving reset token: ${error.message}`);
    return false;
  }
}

module.exports = {
  addUserToLocals,
  checkEmailInDb,
  verifyAuthenticated,
  saveResetToken
}

