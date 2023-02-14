## Shopping & Panty Management App

## Context Prompt

For context, the purpose of the app is to provide a complete shopping and pantry management solution with barcode scanning, inventory management, recipe suggestion, and shopping list features. It offers multi-user support and data import/export options, and is built with a tech stack consisting of Visual Studio Code (VS Code) as the Integrated Development Environment (IDE), JavaScript and Handlebars for front-end development, Node.js with the Express framework and a SQLite database for back-end development, and QuaggaJS for barcode scanning functionality.


## My Epic
<p>Introducing the ultimate shopping and pantry management solution! With our app, you'll never have to worry about running out of items or forgetting what you need at the store again. Our app allows you to easily scan barcodes with your device's camera to keep track of everything in your pantry, and our powerful recipe suggestion feature provides you with meal ideas based on what you already have on hand.

Organization is a breeze with our pantry inventory, which allows you to categorize items for easy searching and keeps track of expiration dates so you never have to throw out spoiled food again. Our shopping list feature makes it simple to add items to your list by scanning barcodes or manually entering information, and you can even transfer your list directly to an online store for seamless shopping.

Multi-user support means that families or roommates can share a pantry and shopping list, making it easier than ever to coordinate grocery shopping. And with data import/export options, you can easily transfer your information from other apps, or share it with others.

Our app also provides user management features, including the ability to edit account information and delete your account if needed. With error handling in place, you can be sure that our app will provide relevant messages in case of any errors during the process.

In short, our app offers a complete solution for all your shopping and pantry management needs. Try it out today and simplify your life!

</p>

## Development Environment

- Use Visual Studio Code (VS Code) as the Integrated Development Environment (IDE) for coding and building the app.
- Run the app on a local development server during development using the localhost environment.

## Build Stack

- Front-end: JavaScript and the Handlebars templating engine to build the user interface and handle user interactions.
- Back-end: Node.js with the Express framework and a SQLite database to store user information and pantry data.
- Barcode scanning functionality: QuaggaJS, an open-source barcode scanning library for the web.

## Development Process

1. Set up the development environment and build the user authentication system, including registration, login, and password reset functionality.
2. Implement the barcode scanning feature, including the ability to scan barcodes and store the information in the database.
3. Develop the pantry inventory feature, including the ability to add items to the pantry, view the list of items, and update the quantity of items.
4. Add the recipe suggestion feature, including the ability to suggest recipes based on items in the pantry and provide nutritional information for each recipe.
5. Implement the shopping list feature, including the ability to add items to the list, mark items as bought, and transfer the list to an online store.
6. Add multi-user support, including the ability for multiple users to share a pantry and shopping list.
7. Implement data import/export functionality to allow users to import/export their pantry and shopping list data.
8. Thoroughly test the app to ensure that it is working as expected and fix any bugs or errors.
9. Deploy the app to a hosting environment such as Heroku, which is optimized for Node.js-based web applications.


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
          Perishable Y/N
        </li>
        <li>
          Best Before Date
        </li>
        <li>
          Unit of measurement
        </li>
        <li>
          Image of the item
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
    <li>Provide the ability to add items to the pantry inventory by scanning barcodes or manually entering information.</li>
    <li>Show a list of items in the pantry inventory, sorted by expiration date, with items that are about to expire appearing first.</li>
    <li>Provide the ability to update the quantity of items in the pantry.</li>
    <li>Allow users to categorize items in their pantry for easier organization and searching.</li>
  </ol>
  <li>Recipe Suggestions:</li>
  <ol type="a">
    <li>
      Based on the items in a user's pantry, the app can suggest recipes that can be made using those ingredients.
    </li>
    <li>
      Provide nutritional information for each recipe.
    </li>
    <li>
      Allow users to save their favorite recipes for later use.
    </li>
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
    <li>Allow users to add items to their shopping list by scanning barcodes or manually entering information.</li>
    <li>Provide the ability to mark items as 'bought' by scanning the barcode in-store or manually marking the item.</li>
<li>Show a list of items that have not been bought yet, sorted by category.</li>
<li>Provide the option to transfer the list to an online store for shopping.</li>
<li>Provide the ability to delete items from the shopping list.</li>

  </ol>
  <li>Multi-User Support:</li>
  <ol type="a">
    <li>
      Allow multiple users to share a pantry and shopping list, such as families or roommates.
    </li>
  </ol>
  <li>Data Import/Export:</li>
  <ol type="a">
    <li>
      Allow users to import their pantry and shopping list data from other applications.
    </li>
    <li>
      Provide the ability to export pantry and shopping list data to share with others.
    </li>
  </ol>
  <li>Time Stamps:</li>
  <ol type="a">
    <li>
      Store timestamps for when items are added, updated, and deleted in both the shopping list and pantry inventory.
    </li>
  </ol>
  <li>Error Handling:</li>
  <ol type="a">
    <li>
      Implement error handling to display relevant messages in case of any errors during the process.
    </li>
  </ol>
</ol>

<h1>Database</h1>

<h2>Schema</h2>

<p><strong>app_users:</strong> This table stores information about the users of the app. The table contains information such as the user's username, email, password, created_at and updated_at timestamps, name, and authToken. Each user is identified by a unique id.</p>
<p><strong>shopping_list:</strong> This table stores information about the shopping lists created by users. The table contains information such as the user_id that created the list, the created_at and updated_at timestamps, and a name for the list. Each shopping list is identified by a unique id.</p>
<p><strong>list_items:</strong> This table stores information about the items in a shopping list. The table contains information such as the list_id that the item belongs to, the created_at and updated_at timestamps, the item's barcode and name, and a completed flag indicating if the item has been completed (ticked off). Each item is identified by a unique id.</p>
<p><strong>items:</strong> This table stores information about the items in a user's pantry. The table contains information such as the user_id that the pantry item belongs to, the created_at and updated_at timestamps, the item's barcode and name, and the quantity of the item in the pantry. Each pantry item is identified by a unique id.</p>

## `app_users`

| Field Name   | Data Type | Nullable | Description                                 |
| ------------ | --------- | -------- | ------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the user              |
| `username`   | TEXT      | No       | User's username                             |
| `email`      | TEXT      | Yes      | User's email address                        |
| `password`   | TEXT      | No       | User's password                             |
| `created_at` | DATETIME  | Yes      | Timestamp of when the user was created      |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the user was last updated |
| `deleted_at` | DATETIME  | Yes      | Timestamp of when the user was deleted      |
| `name`       | TEXT      | Yes      | User's name                                 |
| `authToken`  | TEXT      | Yes      | Authentication token for the user           |

## `shopping_list`

| Field Name   | Data Type | Nullable | Description                                          |
| ------------ | --------- | -------- | ---------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the shopping list              |
| `user_id`    | INTEGER   | No       | User's identifier that the shopping list belongs to  |
| `created_at` | DATETIME  | Yes      | Timestamp of when the shopping list was created      |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the shopping list was last updated |
| `name`       | TEXT      | Yes      | Name for the shopping list                           |

## `items`

| Field Name   | Data Type | Nullable | Description                                              |
| ------------ | --------- | -------- | -------------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the item                           |
| `list_id`    | INTEGER   | No       | Identifier of the shopping list that the item belongs to |
| `created_at` | DATETIME  | Yes      | Timestamp of when the item was created                   |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the item was last updated              |
| `barcode`    | TEXT      | No       | Barcode for the item                                     |
| `name`       | TEXT      | No       | Name for the item                                        |
| `completed`  | BOOLEAN   | No       | Flag indicating if the item has been completed           |

## `pantry_items`

| Field Name   | Data Type | Nullable | Description                                        |
| ------------ | --------- | -------- | -------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the pantry item              |
| `user_id`    | INTEGER   | No       | User's identifier that the pantry item belongs to  |
| `created_at` | DATETIME  | Yes      | Timestamp of when the pantry item was created      |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the pantry item was last updated |
| `barcode`    | TEXT      | No       | Barcode for the pantry item                        |
| `name`       | TEXT      | No       | Name for the pantry item                           |
| `quantity`   | INTEGER   | No       | Quantity of the pantry item                        |


