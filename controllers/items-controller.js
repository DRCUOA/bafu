/*
*  CONTROLLER _ 
*  ITEMS
*/
const Joi = require('joi');
const debug = require('debug');

//set-up debug namespace
const devItemController = debug ('devLog:devItemCntrllr');

//link to model
const itemDao = require('../models/item-dao'); 

// validation schema for item form data
const schema = Joi.object({
  id: Joi.string().required(),
  barcode: Joi.string().min(1).max(30).required(),
  name: Joi.string().min(1).max(30).required(),
  description: Joi.string().max(255),
  cost: Joi.number().min(1).max(1000).required(),
  UOM: Joi.string().min(1).max(30).required(),
  qty: Joi.number().min(1).max(1000).required(),
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
  } else {
    devItemController('Form data is valid.');
  }
}

module.exports = {
  createNewItem: createNewItem
}