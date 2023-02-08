/*
*  CONTROLLER _ 
*  ITEMS
*/

// item ExampleAsJson
const item = [
  {
      "barcode": "12412345615",
      "item_id": "234523452345",
      "item_UOM": "EA",
      "item_cost": 19.99,
      "item_description": "Description for Product A, a product used for testing only",
      "item_name": "Product A",
      "item_quantity": 10,
  }
]

async function createNewItem(item) {

}

module.exports = {
  createNewItem: createNewItem
}