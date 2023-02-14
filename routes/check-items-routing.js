const express = require('express');
const router = express.Router();
const debug = require('debug');

//set-up debug namespaces
const devCheckItemsRLog = debug('devLog:routing_items_checking');

//link to controller
const itemsController = require('../controllers/items-controller');

//check if an item already exists
router.get('/item_check', async (req, res) => {
  const item_check = await itemsController.retrieveItemWithBarcode(req.query.barcode);
  devCheckItemsRLog(item_check);
  if (item_check) {
    res.send(item_check);
  } else {
    res.send(false);
  }  
});

module.exports = router;