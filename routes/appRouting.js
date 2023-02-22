const express = require('express');
const router = express.Router();

const debug = require('debug');

// setup debug namespaces
const devAppRoutes = debug('devLog:AppRoutes');

router.get('/diagram', (req, res) => {
  devAppRoutes('render diagram')
  res.render('diagram');
});

module.exports = router;