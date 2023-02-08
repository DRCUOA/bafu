<h1>Requirements</h1>

<ol>
  <li>User Authentication:</li>
  <ol type="a">
    <li>
      Provide a way to store user information such as name, email, and hashed password.
    </li>
    <li>
      Implement password reset functionality.
    </li>
  </ol>
  </li>
  <li>Scanning Barcodes:</li>
  <ol type="a">
    <li>
      Allow users to scan barcodes using the device's camera.
    </li>
    <li>
      Store the barcode information in the database.
    </li>
    <li>
      Upon scanning a barcode, the app should automatically check the pantry inventory to see if the item is already in
      the pantry.
    </li>
    <li>
      If the item is not found in the pantry, the user should be prompted to add the item to the pantry inventory.
    </li>
    <li>
      When adding a new item to the pantry inventory, the following information should be collected and stored:
      <ol type="i">
        <li>
          Barcode
        </li>
        <li>
          Item name
        </li>
        <li>
          Quantity
        </li>
        <li>
          Unit of measurement
        </li>
        <li>
          Timestamp of when the item was added to the pantry inventory.
        </li>
      </ol>
  </ol>
  </li>
  <li>Pantry Inventory:</li>
  <ol type="a">
    <li>Allow users to keep an inventory of items in their pantry.</li>
    <li>Provide the ability to add items to the pantry inventory by scanning barcodes.</li>
    <li>Show a list of items in the pantry inventory.</li>
    <li>Provide the ability to update the quantity of items in the pantry.</li>
  </ol>
  <li>User Management:</li>
  <ol type="a">
    <li>
      Provide a way for users to edit their account information.
    </li>
    <li>
      Implement the ability to delete a user's account.
    </li>
  </ol>
  <li>Shopping List:</li>
  <ol type="a">
    <li>Allow users to add items to their shopping list by scanning barcodes.</li>
    <li>Provide the ability to mark items as 'bought' by scanning the barcode in-store.</li>
    <li>Show a list of items that have not been bought yet.</li>
    <li>Provide the option to transfer the list to an online store for shopping.</li>
    <li>Provide the option to mark items as 'bought' by scanning the barcode in-store or manually marking the item.</li>
    <li>Provide the ability to delete items from the shopping list.</li>
  </ol>
  <li>Time Stamps:</li>
  <ol type="a">
    <li>Store timestamps for when items are added, updated, and deleted in both the shopping list and pantry inventory.
    </li>
  </ol>
  <li>Error Handling:</li>
  <ol type="a">
    <li>mplement error handling to display relevant messages in case of any errors during the process.</li>
  </ol>
</ol>




<h1>Database</h1>

<h2>Schema</h2>


<p><strong>app_users:</strong> This table stores information about the users of the app. The table contains information such as the user's username, email, password, created_at and updated_at timestamps, name, and authToken. Each user is identified by a unique id.</p>
<p><strong>shopping_list:</strong> This table stores information about the shopping lists created by users. The table contains information such as the user_id that created the list, the created_at and updated_at timestamps, and a name for the list. Each shopping list is identified by a unique id.</p>
<p><strong>list_items:</strong> This table stores information about the items in a shopping list. The table contains information such as the list_id that the item belongs to, the created_at and updated_at timestamps, the item's barcode and name, and a completed flag indicating if the item has been completed (ticked off). Each item is identified by a unique id.</p>
<p><strong>items:</strong> This table stores information about the items in a user's pantry. The table contains information such as the user_id that the pantry item belongs to, the created_at and updated_at timestamps, the item's barcode and name, and the quantity of the item in the pantry. Each pantry item is identified by a unique id.</p>

## `app_users`

| Field Name | Data Type | Nullable | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | No | Unique identifier for the user |
| `username` | TEXT | No | User's username |
| `email` | TEXT | Yes | User's email address |
| `password` | TEXT | No | User's password |
| `created_at` | DATETIME | Yes | Timestamp of when the user was created |
| `updated_at` | DATETIME | Yes | Timestamp of when the user was last updated |
| `deleted_at` | DATETIME | Yes | Timestamp of when the user was deleted |
| `name` | TEXT | Yes | User's name |
| `authToken` | TEXT | Yes | Authentication token for the user |

## `shopping_list`

| Field Name | Data Type | Nullable | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | No | Unique identifier for the shopping list |
| `user_id` | INTEGER | No | User's identifier that the shopping list belongs to |
| `created_at` | DATETIME | Yes | Timestamp of when the shopping list was created |
| `updated_at` | DATETIME | Yes | Timestamp of when the shopping list was last updated |
| `name` | TEXT | Yes | Name for the shopping list |

## `items`

| Field Name | Data Type | Nullable | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | No | Unique identifier for the item |
| `list_id` | INTEGER | No | Identifier of the shopping list that the item belongs to |
| `created_at` | DATETIME | Yes | Timestamp of when the item was created |
| `updated_at` | DATETIME | Yes | Timestamp of when the item was last updated |
| `barcode` | TEXT | No | Barcode for the item |
| `name` | TEXT | No | Name for the item |
| `completed` | BOOLEAN | No | Flag indicating if the item has been completed |

## `pantry_items`

| Field Name | Data Type | Nullable | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | No | Unique identifier for the pantry item |
| `user_id` | INTEGER | No | User's identifier that the pantry item belongs to |
| `created_at` | DATETIME | Yes | Timestamp of when the pantry item was created |
| `updated_at` | DATETIME | Yes | Timestamp of when the pantry item was last updated |
| `barcode` | TEXT | No | Barcode for the pantry item |
| `name` | TEXT | No | Name for the pantry item |
| `quantity` | INTEGER | No | Quantity of the pantry item |

