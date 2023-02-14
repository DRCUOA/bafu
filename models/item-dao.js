/*
*  MODEL _ 
*  ITEMS
*/
const SQL = require('sql-template-strings');
const dbPromise = require("../database/database");
const moment = require("moment");
const debug = require("debug");

//debug namespace
const devItemDAO = debug('devLog:dao_items');

/** Creates a new ITEM
* @param item, the item to insert into the database 
* 
*/

async function createItem(item) {
  devItemDAO("creating item");
  const db = await dbPromise;
  const created_at = moment(new (Date)).format('YYYY-MM-DD HH:mm:ss');
  devItemDAO(`DAO Proforma INSERT statement = INSERT INTO items (item_id,created_at, barcode,item_name,item_description,item_cost,item_UOM,item_quantity) VALUES (${item.item_id},${created_at},${item.barcode},${item.name},${item.description},${item.cost},${item.UOM},${item.qty},${item.item_img_path});`)
  const result = await db.run(SQL`INSERT INTO items (
    item_id,
    created_at, 
    barcode,
    item_name,
    item_description,
    item_cost,
    item_UOM,
    item_quantity,
    item_img_path) VALUES (
    ${item.item_id},
    ${created_at},
    ${item.barcode},
    ${item.name},
    ${item.description},
    ${item.cost},
    ${item.UOM},
    ${item.qty},
    ${item.item_img_path}
    );`);
  return item;
}

async function retrieveItemByID(itemId) {
  const db = await dbPromise;
  const item = db.get(SQL`
    SELECT *
    FROM items WHERE
    item_id = ${itemId};`);
  return item;
};

async function retrieveItemByBarcode(barcode) {
  devItemDAO('Search db for: ', barcode)
  const db = await dbPromise;
  return db.get(SQL`SELECT * FROM items WHERE barcode = ${barcode};`)
    .then((data) => {
      if (data) {
        return data;
      } else {
        return false;
      }
    });
};



module.exports = {
  createItem,
  retrieveItemByID,
  retrieveItemByBarcode
};