const express = require('express');
const router = express.Router();

const debug = require('debug');

const { verifyAuthenticated } = require("../controllers/auth-controller")

// setup debug namespaces
const devAppRoutes = debug('devLog:AppRoutes');

router.get('/diagram', verifyAuthenticated,(req, res) => {
  devAppRoutes('render diagram-menu')
  res.render('app-menus/diagram-menu');
});


router.get('/password-reset-sequence-diagram', verifyAuthenticated,(req, res) => {
  devAppRoutes('render diagram form')
  res.render('diagrams/diagram-create');
});



router.get('/tregidy', verifyAuthenticated, (req, res) => {
  devAppRoutes('render tregidy')
  res.render('pages/tegridy-lessons');
});

module.exports = router;