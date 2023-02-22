const express = require('express');
const router = express.Router();

const debug = require('debug');

// setup debug namespaces
const devAppRoutes = debug('devLog:AppRoutes');

router.get('/diagram', (req, res) => {
  devAppRoutes('render diagram')
  res.render('diagram');
});

router.get('/table', (req, res) => {
  devAppRoutes('render table')
  res.render('table');
});

module.exports = router;