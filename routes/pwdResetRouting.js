const express = require('express');
const router = express.Router();
const debug = require('debug');
const { checkEmailExists } = require('../controllers/pwdRest-controller');

// setup debug namespaces
const devPwdResetRouting = debug('devLog:PwdResetsRouting');
// app module imports

router.post('/check-email-reset', async (req, res) => {
  const queryEmail = req.body.useremail;
  const userObject = await checkEmailExists(queryEmail);
  if(!userObject) {
    res.render('email-not-found', {queryEmail})
  } else
  res.json(userObject)
});

module.exports = router;