/*
*  CONTROLLER _ 
*  ITEMS
*/
const Joi = require('joi');
const debug = require('debug');
const fs = require('fs');
const path = require('path');


//set-up debug namespace
const devItemController = debug('devLog:devItemCntrllr');

//link to model
const itemDao = require('../models/item-dao');

// validation schema for item form data
const schema = Joi.object({
  item_id: Joi.string().required(),
  barcode: Joi.string().min(1).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(255),
  cost: Joi.number().min(1).max(1000).required(),
  UOM: Joi.string().min(1).max(30).required(),
  qty: Joi.number().min(1).max(1000).required(),
  image_blob: Joi.string().required()
});

// Validate the form data
const validateFormData = (formData) => {
  return schema.validate(formData, { abortEarly: false });
};

// insert new item into db
async function createNewItem(item) {
  devItemController(item)

  const result = validateFormData(item);

  if (result.error) {
    devItemController(result.error.message);
    result.validationPass = false;
    return (result);
  } else {
    devItemController(result)
    devItemController('Form data is valid.');
    result.validationPass = true;
    devItemController('Validated data object being passed to model:', item);
    const newItem = await itemDao.createItem(item);
    devItemController(`Item with barcode: ${newItem.barcode} added with item_id : ${newItem.item_id}`);
    return newItem;
  }
}

// convert the img blob to path
async function imageBlobtoPath() {
  devItemController('imageBlobProcessing In-Progress');
  const itemsToProcess = await itemDao.getItemsWithImgBlobs();
  devItemController ('BLOB', itemsToProcess);
    await saveImageAndUpdateDb(itemsToProcess.item_id, itemsToProcess.item_img_blob);
  devItemController('imageBlobProcessing Complete');
  return
}

async function saveImageAndUpdateDb(itemId, encodedImage) {
  devItemController(`image blob processing, itemId: ${itemId}`);

  const [, base64_data] = encodedImage.split(',');
  // decode the Base64 encoded data
  const decodedData = Buffer.from(base64_data, 'base64');
  // create a unique file name
  const fileName = `${itemId}.png`;
  const dirPath = path.join(__dirname, 'public/images');
  const filePath = path.join(dirPath, fileName);
  
  try {
    // check if the directory exists
    if (!fs.existsSync(dirPath)) {
      // create the directory if it does not exist
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // write the decoded image to the file system
    fs.writeFileSync(filePath, decodedData);
    // update the item in the database with the file path
    await itemDao.updateImgDetailsByItemID(itemId, filePath)
    devItemController(`image blob processing complete, replaced with file: ${filePath}`);
  } catch (error) {
    devItemController(`Error while writing the file to the file system: ${error}`);
    throw error;
  }

  return;
}



async function getImageSrcByItemId(itemId) {
  devItemController(`call to get image src for itemId: ${itemId}`);
  try {
    const src = itemDao.retrieveItemImagePathByID(itemId);
    return src;
  } catch (err) {
    devItemController(err);
    return;
  }
};

module.exports = {
  createNewItem,
  imageBlobtoPath,
  getImageSrcByItemId
}