/*
*  CONTROLLER _ 
*  ITEMS
*/
const Joi = require('joi');
const debug = require('debug');

//set-up debug namespace
const devItemController = debug('devLog:controller_items');

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
  item_img_path: Joi.string()
});

// Validate the form data
const validateFormData = (formData) => {
  return schema.validate(formData, { abortEarly: false });
};

// insert new item into db
async function createNewItem(item) {
  devItemController('createNewItem(item)', `id: ${item.item_id} barcode: ${item.barcode} name: ${item.name}`);
  const result = validateFormData(item);
  if (result.error) {
    devItemController(result.error.message);
    result.validationPass = false;
    return (result);
  } else {
    devItemController('Form data is valid.');
    result.validationPass = true;
    devItemController('Validated data object being passed to model:', `id: ${item.item_id} barcode: ${item.barcode} name: ${item.name}`);
    const newItem = await itemDao.createItem(item);
    devItemController(`Confirm Item added, id: ${item.item_id} barcode: ${item.barcode} name: ${item.name}`);
    return newItem;
  }
}

async function retrieveItemWithBarcode(barcode) {
  devItemController(`look for item with barcode ${barcode}`);
  const result = itemDao.retrieveItemByBarcode(barcode);
  devItemController('model return to controller:', await result)
  return result;
}

module.exports = {
  createNewItem,
  retrieveItemWithBarcode
}