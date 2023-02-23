const express = require('express');
const router = express.Router();

const debug = require('debug');

const { verifyAuthenticated } = require("../controllers/auth-controller")

// setup debug namespaces
const devAppRoutes = debug('devLog:AppRoutes');

router.get('/diagram', verifyAuthenticated,(req, res) => {
  devAppRoutes('render diagram-menu')
  res.render('diagram-menu');
});


router.get('/password-reset-sequence-diagram', verifyAuthenticated,(req, res) => {
  devAppRoutes('render password-reset-sequence-diagram')
  res.render('password-reset-sequence-diagram');
});



router.get('/table', verifyAuthenticated, (req, res) => {
  devAppRoutes('render table')
  res.render('table');
});

module.exports = router;