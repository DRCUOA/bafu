PRAGMA foreign_key_list(pantry_items);
-- DOESNT seem to work in sqlite : Look for the "id" of the foreign key constraint you want to drop
SELECT name
FROM sqlite_master
WHERE type = 'foreign key'
  AND tbl_name = 'pantry_items';
--   DOESNT seem to work in sqlite : This will return the name of the foreign key constraint
ALTER TABLE pantry_items DROP CONSTRAINT IF EXISTS item_id;
--  DOESNT seem to work in sqlite : 
-- Drop the pantry_items table if it exists
DROP TABLE IF EXISTS pantry_items;
CREATE TABLE "pantry_items" (
  "id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "created_at" DATETIME,
  "updated_at" DATETIME,
  "barcode" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "item_id" TEXT,
  "purchase_date" DATETIME,
  "expiration_date" DATETIME,
  "used" BOOLEAN,
  "recipe_id" INTEGER,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_pantry_items_items_item_id" FOREIGN KEY("item_id") REFERENCES "items"("item_id")
);
-- seed data for panty items
INSERT INTO pantry_items (
    user_id,
    barcode,
    name,
    quantity,
    item_id,
    purchase_date,
    expiration_date,
    used,
    recipe_id
  )
SELECT 0,
  '123456789012',
  'Bananas',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '001'
UNION
SELECT 0,
  '098765432109',
  'Apples',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '002'
UNION
SELECT 0,
  '111111111111',
  'Bread',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '003'
UNION
SELECT 0,
  '222222222222',
  'Milk',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '004'
UNION
SELECT 0,
  '333333333333',
  'Eggs',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '005'
UNION
SELECT 0,
  '444444444444',
  'Cheese',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '006'
UNION
SELECT 0,
  '555555555555',
  'Ground beef',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '007'
UNION
SELECT 0,
  '666666666666',
  'Pasta',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '008'
UNION
SELECT 0,
  '777777777777',
  'Tomatoes',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '009'
UNION
SELECT 0,
  '888888888888',
  'Rice',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '010'
UNION
SELECT 0,
  '999999999999',
  'Salmon',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '011'
UNION
SELECT 0,
  '777777777777',
  'Avocado',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '012'
UNION
SELECT 0,
  '666666666666',
  'Potatoes',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '013'
UNION
SELECT 0,
  '555555555555',
  'Lettuce',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '014'
UNION
SELECT 0,
  '444444444444',
  'Lemons',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '015'
UNION
SELECT 0,
  '333333333333',
  'Orange juice',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '016'
UNION
SELECT 0,
  '222222222222',
  'Yogurt',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '017'
UNION
SELECT 0,
  '019',
  'Salsa',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '019'
UNION
SELECT 0,
  '020',
  'Guacamole',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '020'
UNION
SELECT 0,
  '022',
  'Steak',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '022'
UNION
SELECT 0,
  '023',
  'Green beans',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '023'
UNION
SELECT 0,
  '024',
  'Carrots',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '024'
UNION
SELECT 0,
  '025',
  'Onions',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '025'
UNION
SELECT 0,
  '026',
  'Mushrooms',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '026'
UNION
SELECT 0,
  '027',
  'Garlic',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '027'
UNION
SELECT 0,
  '028',
  'Cucumbers',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '028'
UNION
SELECT 0,
  '029',
  'Bell peppers',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '029'
UNION
SELECT 0,
  '030',
  'Limes',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '030'
UNION
SELECT 0,
  '031',
  'Hummus',
  0,
  item_id,
  NULL,
  NULL,
  0,
  NULL
FROM items
WHERE item_id = '031';
-- This query generates a shopping list for a user belonging to a group based on their preferences. It retrieves the name, unit of measurement, and the quantity of items to buy for each item in the user's pantry. The quantity to buy is calculated based on the group's minimum stock level and shopping frequency. The query groups the results by item ID, and only includes items where the quantity to buy is greater than zero. Finally, the results are ordered alphabetically by item name.
-- create shopping list
SELECT i.item_name,
  i.item_UOM,
  MAX(
    0,
    gp.min_stock_level * gp.shopping_frequency - IFNULL(SUM(pi.quantity), 0)
  ) AS quantity_to_buy
FROM items i
  JOIN pantry_items pi ON i.item_id = pi.item_id
  AND pi.user_id = 0
  JOIN groups gd ON gd.group_id = 1
  JOIN group_preferences gp ON gp.group_id = gd.group_id
GROUP BY i.item_id
HAVING quantity_to_buy > 0
ORDER BY i.item_name ASC -- the bug I spotted is the min_stock_level has to be adjusted for UOM equivalency,  for example,  in the real World garlic is used in very small quantities  so a min stock might only be a fraction of a kg if the UOM is kg,  do you understand the bug I've spotted?
  -- Yes, I understand the bug you've spotted. It's important to adjust the min_stock_level based on the UOM (unit of measurement) of the item. For example, if the UOM of an item is grams and the group's min_stock_level is specified in kilograms, the min_stock_level should be divided by 1000 to get the equivalent in grams. This will ensure that the quantity to buy is calculated accurately and takes into account the appropriate unit of measurement.
  -- is it best to handle this when items are added to the items table, I mean ask the user to confirm the appropriate UOM when a new item is added?
  -- Yes, that could be a good solution. When adding a new item, the user could be prompted to select the appropriate UOM for that item. This would ensure that the UOM is accurately recorded in the database and the shopping list generation algorithm can account for UOM equivalencies when calculating the required quantity to purchase. Additionally, you could also provide a default UOM for each item based on its type, but still allow the user to override it if necessary.
  -- how would type based UOM's work.  Where could we source data to guid setting type based UOMs do you think?
  -- Type-based UOMs are based on the type of ingredient or product, rather than a specific quantity or measurement. For example, items like spices or herbs might be measured in teaspoons or tablespoons, while items like fruits or vegetables might be measured in units or pounds.
  -- One way to set up type-based UOMs is to have a default UOM for each item type, and allow users to customize the UOM for each individual item as needed. For example, a default UOM for "herbs and spices" might be teaspoons, but a user could change the UOM for a specific herb to tablespoons if they typically use larger quantities.
  -- As for sourcing data to guide the setting of type-based UOMs, there are a few options. One approach would be to research standard UOMs for different types of ingredients, based on culinary or scientific sources. Another approach would be to analyze user data and determine the most common UOMs used for each ingredient type. This data could be collected through user surveys, or by analyzing purchase or recipe data from the app.
  -- One way to adjust the algorithm to take account of the default measure types would be to add a new column to the items table to store the default measure type for each item. For example, you could add a column called item_UOM_type with values such as "Pieces", "Loaf", "Box", etc.
  -- Then, in the SQL query, you could join the items table with the table of default measure types, and use a CASE statement to convert the quantity to the appropriate units based on the default measure type. Here's an example query:
SELECT i.item_name,
  dm.item_UOM AS item_UOM,
  MAX(
    0,
    gp.min_stock_level * gp.shopping_frequency - IFNULL(
      SUM(
        CASE
          WHEN i.item_UOM = 'Pieces' THEN pi.quantity
          WHEN i.item_UOM = 'Loaf' THEN pi.quantity * i.item_quantity
          WHEN i.item_UOM = 'Box' THEN pi.quantity * i.item_quantity
          WHEN i.item_UOM = 'Bag' THEN pi.quantity * i.item_quantity
          WHEN i.item_UOM = 'Litres' THEN pi.quantity
          WHEN i.item_UOM = 'Cans' THEN pi.quantity
          WHEN i.item_UOM = 'Boxes' THEN pi.quantity
          WHEN i.item_UOM = 'Blocks' THEN pi.quantity
          WHEN i.item_UOM = 'Bags' THEN pi.quantity
          WHEN i.item_UOM = 'Bottles' THEN pi.quantity
          WHEN i.item_UOM = 'Jars' THEN pi.quantity
          WHEN i.item_UOM = 'Cartons' THEN pi.quantity
          WHEN i.item_UOM = 'Slices' THEN pi.quantity
          WHEN i.item_UOM = 'Packages' THEN pi.quantity
          WHEN i.item_UOM = 'Kilograms' THEN pi.quantity
          ELSE pi.quantity
        END
      ),
      0
    )
  ) AS quantity_to_buy
FROM items i
  JOIN pantry_items pi ON i.item_id = pi.item_id
  AND pi.user_id = 0
  JOIN groups gd ON gd.group_id = 1
  JOIN group_preferences gp ON gp.group_id = gd.group_id
  JOIN item_UOM_types dm ON dm.item_UOM_type = i.item_UOM
GROUP BY i.item_id
HAVING quantity_to_buy > 0
ORDER BY i.item_name ASC;
-- Other bugs:
-- there is a potential issue with the min_stock_level and shopping_frequency values in the group_preferences table.
-- For example, if the min_stock_level for a certain item is set to 0.5 and the shopping_frequency is set to 7 (indicating that the group likes to shop once a week), then the calculation would result in a quantity_to_buy of 3.5 (0.5 * 7 - 1). This means that the group wants to have a minimum of 0.5 units of the item in their pantry, and they want to buy enough to have 3.5 units in total after the shopping trip.
-- However, this calculation does not take into account the expiration dates of the pantry items. It's possible that the group already has some of the item in their pantry, but those items are close to or past their expiration date. In that case, the group may want to buy more than the calculated quantity_to_buy in order to replace the expiring items.
-- Therefore, it may be necessary to adjust the calculation to take expiration dates into account or to provide an additional warning to the user if they have pantry items that are close to or past their expiration date.
-- Summary:
-- The query for generating a shopping list has a bug where the min_stock_level needs to be adjusted based on the UOM of the item.
-- One solution to this is to prompt the user to select the appropriate UOM when adding a new item to the items table.
-- Type-based UOMs can be set up by having a default UOM for each item type and allowing users to customize the UOM for each individual item.
-- Data for type-based UOMs can be sourced by researching standard UOMs for different types of ingredients or analyzing user data.
-- The algorithm for generating a shopping list can be adjusted to take default measure types into account by adding a new column to the items table and using a CASE statement to convert the quantity to the appropriate units based on the default measure type.
-- Another potential issue with the shopping list algorithm is that it doesn't take expiration dates into account.
-- It may be necessary to adjust the calculation to consider expiration dates or provide an additional warning to the user if they have pantry items that are close to or past their expiration date.
-- Sure! Let's break it down step-by-step:
-- The query starts by selecting the item_name and default_measure columns from the items and item_measure_types tables respectively.
SELECT items.item_name,
  item_measure_types.default_measure -- Next, it creates a subquery that calculates the total quantity of each item in the pantry_items table, grouped by the item's ID.
  (
    SELECT item_id,
      SUM(quantity) AS total_quantity
    FROM pantry_items
    GROUP BY item_id
  ) AS pi -- The main query then joins the items table with the subquery pi on the item's ID, and also joins the item_measure_types table on the default measure.
FROM items
  JOIN (
    SELECT item_id,
      SUM(quantity) AS total_quantity
    FROM pantry_items
    GROUP BY item_id
  ) AS pi ON items.item_id = pi.item_id
  JOIN item_measure_types ON items.measure_type_id = item_measure_types.id -- The query calculates the total quantity of each item in the user's pantry, taking into account the default measure for that item type. It does this by multiplying the total quantity in the pantry by the ratio between the default measure and the actual measure for that item.
  total_quantity * item_measure_types.default_measure / items.item_UOM AS adjusted_quantity -- Finally, the query selects the item_name and adjusted_quantity columns, and orders the results by item_name.
SELECT items.item_name,
  total_quantity * item_measure_types.default_measure / items.item_UOM AS adjusted_quantity
FROM items
  JOIN (
    SELECT item_id,
      SUM(quantity) AS total_quantity
    FROM pantry_items
    GROUP BY item_id
  ) AS pi ON items.item_id = pi.item_id
  JOIN item_measure_types ON items.measure_type_id = item_measure_types.id
ORDER BY items.item_name ASC -- In summary, this query calculates the total quantity of each item in the user's pantry, adjusting for the default measure of each item type. This allows the user to compare quantities across different item types and make more informed decisions about what to buy when restocking their pantry.
  -- v3
SELECT i.item_name,
  COALESCE(
    imt.default_measure,
    CASE
      WHEN i.item_UOM LIKE '%piece%' THEN 'Pieces'
      WHEN i.item_UOM LIKE '%loaf%' THEN 'Loaves'
      WHEN i.item_UOM LIKE '%box%' THEN 'Boxes'
      WHEN i.item_UOM LIKE '%bag%' THEN 'Bags'
      WHEN i.item_UOM LIKE '%litre%' THEN 'Litres'
      WHEN i.item_UOM LIKE '%can%' THEN 'Cans'
      WHEN i.item_UOM LIKE '%carton%' THEN 'Cartons'
      WHEN i.item_UOM LIKE '%package%' THEN 'Packages'
      WHEN i.item_UOM LIKE '%slice%' THEN 'Slices'
      ELSE 'Each'
    END
  ) AS default_measure,
  MAX(
    0,
    gp.min_stock_level * gp.shopping_frequency - IFNULL(SUM(pi.quantity), 0)
  ) AS quantity_to_buy
FROM items i
  JOIN pantry_items pi ON i.item_id = pi.item_id
  AND pi.user_id = 0
  JOIN groups gd ON gd.group_id = 1
  JOIN group_preferences gp ON gp.group_id = gd.group_id
  LEFT JOIN item_measure_types imt ON i.item_name = imt.name
GROUP BY i.item_id
HAVING quantity_to_buy > 0
ORDER BY i.item_name ASC;
-- The query starts by selecting the item_name and item_UOM columns from the items table, just like before.
-- It then uses a LEFT JOIN to join the item_measure_types table to the items table on the condition that the name column in the item_measure_types table matches the item_name column in the items table.
-- If there is a match, the default_measure column from the item_measure_types table is used as the default measure for the item. If there is no match, the default_measure is set to null.
-- The COALESCE function is used to replace any null values with the default measure 'each'.
-- The MAX function is used to ensure that the calculated quantity_to_buy is never negative.
-- Finally, the HAVING clause is used to exclude any items where quantity_to_buy is zero or negative.
-- So in summary, the modified query selects the item name and unit of measure from the items table, and uses a LEFT JOIN with the item_measure_types table to find the default measure for each item. If no default measure is found, it defaults to 'each'. The calculated quantity_to_buy is then adjusted based on the default measure and the shopping preferences of the user's group, and any items where quantity_to_buy is zero or negative are excluded from the results.