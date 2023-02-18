## Shopping & Panty Management App

## Context Prompt

For context, the purpose of the app is to provide a complete shopping and pantry management solution with barcode scanning, inventory management, recipe suggestion, and shopping list features. It offers multi-user support and data import/export options, and is built with a tech stack consisting of Visual Studio Code (VS Code) as the Integrated Development Environment (IDE), JavaScript and Handlebars for front-end development, Node.js with the Express framework and a SQLite database for back-end development, and QuaggaJS for barcode scanning functionality.

## My Epic

<p>Introducing the ultimate shopping and pantry management solution! With our app, you'll never have to worry about running out of items or forgetting what you need at the store again. Our app allows you to easily scan barcodes with your device's camera to keep track of everything in your pantry, and our powerful recipe suggestion feature provides you with meal ideas based on what you already have on hand.

Organization is a breeze with our pantry inventory, which allows you to categorize items for easy searching and keeps track of expiration dates so you never have to throw out spoiled food again. Our shopping list feature makes it simple to add items to your list by scanning barcodes or manually entering information, and you can even transfer your list directly to an online store for seamless shopping.

Multi-user support means that families or roommates can share a pantry and shopping list, making it easier than ever to coordinate grocery shopping. And with data import/export options, you can easily transfer your information from other apps, or share it with others.  Our chat feature allows users commuicate in real-time and get updates when new messages are received. 

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

1.  Set up the development environment and build the user authentication system, including registration, login, and password reset functionality.
2.  Implement the barcode scanning feature, including the ability to scan barcodes and store the information in the database.
3.  Develop the pantry inventory feature, including the ability to add items to the pantry, view the list of items, and update the quantity of items.
4.  Add the recipe suggestion feature, including the ability to suggest recipes based on items in the pantry and provide nutritional information for each recipe.
5.  Implement the shopping list feature, including the ability to add items to the list, mark items as bought, and transfer the list to an online store.
6.  Add multi-user support, including the ability for multiple users to share a pantry and shopping list.
7.  Implement the chat feature using the observer pattern, including the ability for users to subscribe to the chat service and receive real-time updates when new messages are received.
8.  Implement data import/export functionality to allow users to import/export their pantry, shopping list, and chat data.
9.  Thoroughly test the app to ensure that it is working as expected and fix any bugs or errors.
10. Deploy the app to a hosting environment such as Heroku, which is optimized for Node.js-based web applications.

<h1>Requirements</h1>
<ol>
  <li>User Authentication:
    <ol type="a">
      <li>Provide a way to store user information such as name, email, and hashed password.</li>
      <li>Implement password reset functionality.</li>
    </ol>
  </li>

  <li>Scanning Barcodes:
    <ol type="a">
      <li>Allow users to scan barcodes using the device's camera.</li>
      <li>Store the barcode information in the database.</li>
      <li>Upon scanning a barcode, the app should automatically check the pantry inventory to see if the item is already in the pantry.</li>
      <li>If the item is not found in the pantry, the user should be prompted to add the item to the pantry inventory.</li>
      <li>When adding a new item to the pantry inventory, the following information should be collected and stored:
        <ol type="i">
          <li>Barcode</li>
          <li>Item name</li>
          <li>Quantity</li>
          <li>Perishable Y/N</li>
          <li>Best Before Date</li>
          <li>Unit of measurement</li>
          <li>Image of the item</li>
          <li>Timestamp of when the item was added to the pantry inventory.</li>
        </ol>
      </li>
    </ol>
  </li>

  <li>Pantry Inventory:
    <ol type="a">
      <li>Allow users to keep an inventory of items in their pantry.</li>
      <li>Provide the ability to add items to the pantry inventory by scanning barcodes or manually entering information.</li>
      <li>Show a list of items in the pantry inventory, sorted by expiration date, with items that are about to expire appearing first.</li>
      <li>Provide the ability to update the quantity of items in the pantry.</li>
      <li>Allow users to categorize items in their pantry for easier organization and searching.</li>
    </ol>
  </li>

  <li>Recipe Suggestions:
    <ol type="a">
      <li>Based on the items in a user's pantry, the app can suggest recipes that can be made using those ingredients.</li>
      <li>Provide nutritional information for each recipe.</li>
      <li>Allow users to save their favorite recipes for later use.</li>
    </ol>
  </li>

  <li>User Management:
    <ol type="a">
      <li>Provide a way for users to edit their account information.</li>
      <li>Implement the ability to delete a user's account.</li>
    </ol>
  </li>

  <li>Shopping List:
    <ol type="a">
      <li>Allow users to add items to their shopping list by scanning barcodes or manually entering information.</li>
      <li>Provide the ability to mark items as 'bought' by scanning the barcode in-store or manually marking the item.</li>
      <li>Show a list of items that have not been bought yet, sorted by category.</li>
      <li>Provide the option to transfer the list to an online store for shopping.</li>
      <li>Provide the ability to delete items from the shopping list.</li>
    </ol>
  </li>

  <li>Chat Feature:
    <ol type="a">
      <li>Implement the chat feature using the observer pattern.</li>
      <li>Allow users to subscribe to the chat service and receive real-time updates when new messages are received.</li>
<li>Provide an interface for users to send messages to the chat room.</li>
<li>Store chat messages in the database and display them in the chat interface.</li>
</ol>

  </li>
  <li>Data Import/Export:
    <ol type="a">
      <li>Implement data import/export functionality to allow users to import/export their pantry, shopping list, and chat data.</li>
    </ol>
  </li>
  <li>Testing:
    <ol type="a">
      <li>Thoroughly test the app to ensure that it is working as expected and fix any bugs or errors.</li>
    </ol>
  </li>
  <li>Deployment:
    <ol type="a">
      <li>Deploy the app to a hosting environment such as Heroku, which is optimized for Node.js-based web applications.</li>
    </ol>
  </li>
</ol>

<h2>Database Schema</h2>

<p><strong>app_users:</strong> This table stores information about the users of the app. The table contains information such as the user's username, email, password, created_at and updated_at timestamps, name, authToken, pwdResetToken, and pwdResetToken_expiration. Each user is identified by a unique id.</p>

<p><strong>shopping_list:</strong> This table stores information about the shopping lists created by users. The table contains information such as the user_id that created the list, the created_at and updated_at timestamps, and a name for the list. Each shopping list is identified by a unique id.</p>

<p><strong>pantry_items:</strong> This table stores information about the items in a user's pantry. The table contains information such as the user_id that the pantry item belongs to, the created_at and updated_at timestamps, the item's barcode and name, the quantity of the item in the pantry, and the item's cost, unit of measure, item description, and image. Each pantry item is identified by a unique id.</p>

<p><strong>items:</strong> This table stores information about the items available in the app. The table contains information such as the item_id, created_at and updated_at timestamps, the item's barcode, name, description, cost, unit of measure, quantity, and image. Each item is identified by a unique id.</p>

<p><strong>password_reset_tokens:</strong> This table stores information about the password reset tokens issued by the app. The table contains information such as the user's email, token, and expiration date for the token. The user's email is used as the primary key for this table.</p>

<p><strong>chat_rooms:</strong> This table stores information about the chat rooms available in the app. The table contains information such as the room's id, name, created_at and updated_at timestamps. Each chat room is identified by a unique id.</p>

<p><strong>chat_messages:</strong> This table stores information about the messages sent in the chat rooms. The table contains information such as the message's id, user_id of the message sender, chat_room_id of the chat room where the message was sent, message text, and created_at timestamp. Each chat message is identified by a unique id. The chat_room_id and user_id fields have foreign key constraints that reference the chat_rooms and app_users tables, respectively.</p>

## `shopping_list`

| Field Name   | Data Type | Nullable | Description                                          |
| ------------ | --------- | -------- | ---------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the shopping list              |
| `user_id`    | INTEGER   | No       | User's identifier that the shopping list belongs to  |
| `created_at` | DATETIME  | Yes      | Timestamp of when the shopping list was created      |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the shopping list was last updated |
| `name`       | TEXT      | Yes      | Name for the shopping list                           |

## `pantry_items`

| Field Name   | Data Type | Nullable | Description                                          |
| ------------ | --------- | -------- | ---------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the pantry item                |
| `user_id`    | INTEGER   | No       | User's identifier that the pantry item belongs to     |
| `created_at` | DATETIME  | Yes      | Timestamp of when the pantry item was created         |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the pantry item was last updated    |
| `barcode`    | TEXT      | No       | Barcode for the pantry item                           |
| `name`       | TEXT      | No       | Name for the pantry item                              |
| `quantity`   | INTEGER   | No       | Quantity of the pantry item                           |

## `items`

| Field Name         | Data Type | Nullable | Description                                           |
| ------------------ | --------- | -------- | ----------------------------------------------------- |
| `item_id`          | TEXT      | No       | Unique identifier for the item                         |
| `created_at`       | DATETIME  | Yes      | Timestamp of when the item was created                 |
| `updated_at`       | DATETIME  | Yes      | Timestamp of when the item was last updated            |
| `barcode`          | TEXT      | No       | Barcode for the item                                   |
| `item_name`        | TEXT      | No       | Name for the item                                      |
| `item_description` | TEXT      | Yes      | Description for the item                               |
| `item_cost`        | NUMERIC   | Yes      | Cost for the item                                      |
| `item_UOM`         | TEXT      | No       | Unit of measurement for the item                       |
| `item_quantity`    | INTEGER   | No       | Quantity of the item                                   |
| `item_img_path`    | TEXT      | Yes      | File path for the item's image                          |
| `item_img_blob`    | BLOB      | Yes      | Binary data for the item's image                        |

## `password_reset_tokens`

| Field Name             | Data Type | Nullable | Description                                           |
| ---------------------- | --------- | -------- | ----------------------------------------------------- |
| `email`                | TEXT      | No       | Email address associated with the password reset token |
| `token`                | TEXT      | No       | Password reset token                                  |
| `expires_at`           | DATETIME  | No       | Timestamp of when the password reset token expires    |

## `app_users`

| Field Name             | Data Type | Nullable | Description                                           |
| ---------------------- | --------- | -------- | ----------------------------------------------------- |
| `id`                   | INTEGER   | No       | Unique identifier for the user                         |
| `username`             | TEXT      | No       | Username for the user                                  |
| `email`                | TEXT      | Yes      | Email address for the user                             |
| `password`             | TEXT      | No       | Password for the user                                  |
| `created_at`           | DATETIME  | Yes      | Timestamp of when the user account was created         |
| `updated_at`           | DATETIME  | Yes      | Timestamp of when the user account was last updated    |
| `deleted_at`           | DATETIME  | Yes      | Timestamp of when the user account was deleted         |
| `name`                 | TEXT      | Yes      | Name of the user                                       |
| `authToken`            | TEXT      | Yes      | Authentication token for the user                      |
| `pwdResetToken`        | TEXT      | Yes      | Password reset token for the user                      |
| `pwdResetToken_expiration` | DATETIME | Yes  | Timestamp of when the password reset token expires    |

## `chat_rooms`

| Field Name   | Data Type | Nullable | Description                                          |
| ------------ | --------- | -------- | ---------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the chat room                  |
| `name`       | TEXT      | No       | Name for the chat room                                |
| `created_at` | DATETIME  | Yes      | Timestamp of when the chat room was created           |
| `updated_at` | DATETIME  | Yes      | Timestamp of when the chat room was last updated      |

## `chat_messages`

| Field Name   | Data Type | Nullable | Description                                          |
| ------------ | --------- | -------- | ---------------------------------------------------- |
| `id`         | INTEGER   | No       | Unique identifier for the chat message               |
| `user_id`    | INTEGER   | No       | User's identifier that sent the chat message          |
| `chat_room_id` | INTEGER | No      | Chat room's identifier where the message was sent     |
| `message`    | TEXT      | No       | Content of the chat message                           |
| `created_at` | DATETIME  | Yes      | Timestamp of when the chat message was created        |


<br>
<br>

# Password Reset Feature Implementation Logic

<br>
<br>

| Step | Description                                                                                                                                | Code File(s)                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| 1    | The user requests a password reset on the login page by clicking on the "Forgot Password?" link.                                           | login.hbs                                             |
| 2    | The user is redirected to the password reset page, where they are prompted to enter their email address.                                   | reset-password.hbs                                    |
| 3    | The user enters their email address and clicks on the "Submit" button.                                                                     | reset-password.js                                     |
| 4    | The system checks whether the email address is valid and exists in the database.                                                           | user.model.js, user.controller.js                     |
| 5    | If the email address is valid, the system generates a unique token and sends an email with a link to the password reset confirmation page. | reset-password.js, email.service.js                   |
| 6    | The user receives the email and clicks on the link to the password reset confirmation page.                                                | (no specific code file)                               |
| 7    | The user is redirected to the password reset confirmation page, where they are prompted to enter a new password.                           | reset-password-confirmation.hbs                       |
| 8    | The user enters their new password and clicks on the "Submit" button.                                                                      | reset-password-confirmation.js                        |
| 9    | The system verifies that the token in the URL is valid and matches the one generated for the email address.                                | reset-password-confirmation.js, resetToken.service.js |
| 10   | The system updates the user's password in the database.                                                                                    | user.model.js, user.controller.js                     |
| 11   | The system sends an email to the user confirming that their password has been reset.                                                       | reset-password-confirmation.js, email.service.js      |
| 12   | The user is redirected to the login page.                                                                                                  | reset-password-confirmation.js                        |
| 13   | The user can now log in with their new password.                                                                                           | (no specific code file)                               |
