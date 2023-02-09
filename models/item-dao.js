/*
*  MODEL _ 
*  ITEMS
*/
const SQL = require('sql-template-strings');
const dbPromise = require("../database/database");
const moment = require("moment");
const debug = require("debug");

//debug namespace
const devItemDAO = debug('devLog:itemDAO');

/** Creates a new ITEM
* @param item, the item to insert into the database 
* 
*/

async function createItem(item) {
  devItemDAO("creating item");
  const db = await dbPromise;
  const created_at = moment(new (Date)).format('YYYY-MM-DD HH:mm:ss');
  devItemDAO(`DAO Proforma INSERT statement = INSERT INTO items (item_id,created_at, barcode,item_name,item_description,item_cost,item_UOM,item_quantity) VALUES (${item.item_id},${created_at},${item.barcode},${item.name},${item.description},${item.cost},${item.UOM},${item.qty});`)
  const result = await db.run(SQL`INSERT INTO items (
    item_id,
    created_at, 
    barcode,
    item_name,
    item_description,
    item_cost,
    item_UOM,
    item_quantity) VALUES (
    ${item.item_id},
    ${created_at},
    ${item.barcode},
    ${item.name},
    ${item.description},
    ${item.cost},
    ${item.UOM},
    ${item.qty}
    );`);

  return item
};


module.exports = {
  createItem: createItem
  // retrieveItemWithId,
  // retrieveItemWithSearchString,
  // updateItemWithId,
  // deleteItemWithId
};