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

module.exports = {
  createItem,
  retrieveItemByID
  // retrieveItemWithSearchString,
  // updateItemWithId,
  // deleteItemWithId
};

// async function getItemsWithImgBlobs() {
//   devItemDAO('retrive items with blobs and no img_paths');
//   const db = await dbPromise;
//   const itemIds = await db.get(SQL`
//     SELECT item_id, item_img_blob, item_img_path
//     FROM items WHERE
//     item_img_path IS NULL AND
//     item_img_blob IS NOT NULL;`)
//   devItemDAO(itemIds)
//   return itemIds;
// }

// async function updateImgDetailsByItemID(itemId, filePath) {
//   devItemDAO('update item record with file path')
//   const db = await dbPromise;
//   const updated_at = moment(new (Date)).format('YYYY-MM-DD HH:mm:ss');
//   // update the item record with the img filepath and clean out used blob data
//   const sql = `
//       UPDATE 
//       items SET 
//       updated_at = ?, 
//       item_img_path = ?, 
//       item_img_blob = NULL 
//       WHERE item_id = ?`;
//   const params = [updated_at, filePath, itemId];
//   await db.run(sql, params);
//   devItemDAO('update item record with file path')
//   return
// }