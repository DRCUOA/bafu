const debug = require('debug');

// debug namespace
const devAuthCtrl = debug('devLOG:AuthCtrl');
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
    next();
  } else {
    devAuthCtrl('render index')
  res.render("index");
  }
};

module.exports = {
  addUserToLocals,
  verifyAuthenticated
}