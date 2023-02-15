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
  if (item_check) {
    res.send(item_check);
  } else {
    res.send(false);
  }
});

router.get('/item_retrieve', async (req, res) => {
  const itemFound = await itemsController.retrieveItemWithBarcode(req.query.barcode);
  devCheckItemsRLog(itemFound);
  res.render('item-found', { itemFound: [itemFound] });
});

// router.get("/manual-search", async (req,res) => {
//   const barcode = req.query.barcode;
//   const itemFound = await itemsController.retrieveItemWithBarcode(barcode);
//   devCheckItemsRLog('manual search returned: ', itemFound);
//   if(!itemFound) {
//     res.send(false);
//   } else {
//     res.render("item-found", { itemFound : [itemFound]});
//   }
// })

router.get("/manual-search", async (req,res) => {
  const item = JSON.parse(req.query.item);
  console.log(item)
  const itemFound = await itemsController.retrieveItemWithBarcode(item.barcode);
  devCheckItemsRLog('manual search returned: ', itemFound);
  if(!itemFound) {
    res.send(false);
  } else {
    res.render("item-found", { itemFound : [itemFound]});
  }
})

// general search request /search-items
router.post('/gen-search', async (req, res) => {
  devCheckItemsRLog('/gen-search?q=', req.query.q)
  try {
    const searchTerm = req.query.q;
    const items = await itemsController.retrieveItemsWithSearchTerm(searchTerm);
    console.log(items)
    res.render("searchres-itemlist", {items}); // Return the search results as JSON to the client
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});



module.exports = router;