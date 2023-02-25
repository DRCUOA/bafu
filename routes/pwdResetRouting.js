const express = require('express');
const router = express.Router();
const debug = require('debug');
const { checkEmailExists } = require('../controllers/pwdRest-controller');
const { verifyResetToken } = require('../utils/verifyResetToken');
const bcrypt = require('bcrypt');
const dbPromise = require("../database/database");

// setup debug namespaces
const devPwdResetRouting = debug('devLog:PwdResetsRouting');
// app module imports

router.post('/check-email-reset', async (req, res) => {
  const queryEmail = req.body.useremail;
  const userObject = await checkEmailExists(queryEmail);
  if (!userObject) {
    res.render('email-not-found', { queryEmail })
  } else
    res.render('pwd-email-sent')
});


// Password reset page
router.get('/resetpassword', async function (req, res) {

  const token = req.query.token;

  const verifyToken = await verifyResetToken(token);
  devPwdResetRouting('VerifyToken', verifyToken)

  if (verifyToken == false) {
    res.send('Invalid token');
  } else {
    // Display password reset form
    res.render('resetpassword', { email: verifyToken.email, token: verifyToken.token });
  }
});

router.post('/resetpassword', async function (req, res) {
  const token = req.body.token;
  const email = req.body.email;
  const password = req.body.password;
  const db = await dbPromise;
  const verifyToken = verifyResetToken(token);

  if (!verifyResetToken) {
    res.send('Invalid token');
  } else {
    // Update password in database
    new Promise((resolve, reject) => {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          db.run('UPDATE app_users SET password = ? WHERE email = ?', [hash, email], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.changes);
            }
          });
        }
      });
    });
    res.setToastMessage("Successfully changed password!");
    res.render("index");
  }
});

module.exports = router;
