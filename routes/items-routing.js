const express = require('express');
const router = express.Router();
const { v4: uuid} = require('uuid');
const multer = require('multer');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const debug = require('debug');

//set-up debug namespaces
const devItemsRLog = debug('devLog:itemRLog');

//link to controller
const itemsController = require('../controllers/items-controller');

router.post("/create-new", upload.single('image'), async (req, res) => { 
  devItemsRLog('ep- post new item to controller');
  const newItemId = uuid();
  const fileName = `${newItemId}.jpg`;
  const filePath = `./public/images/${fileName}`;
  fs.writeFileSync(filePath, req.file.buffer);
  
  const item = {
    item_id: newItemId,
    barcode: req.body.barcode,
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    UOM: req.body.UOM,
    qty: req.body.qty,
    image_path: filePath,
  };

  try {
    const itemCreated = await itemsController.createNewItem(item);
    devItemsRLog('return from controller:', itemCreated);
    if (itemCreated.value) {
      res.render("homepage", {
        showModal: true,
        item: item,
        errorMessage: itemCreated.error.message
      });
    } else {
      res.setToastMessage("Item Created Sucessfully!");
      res.render('item-summary', {itemCreated: [itemCreated]});
        }
  } catch (err) {
    devItemsRLog(err);
    res.setToastMessage("Item Setup Failed. Server responded with: " + err);
    res.render("homepage", { item: req.body, showError: true });
  }
});

module.exports = router;