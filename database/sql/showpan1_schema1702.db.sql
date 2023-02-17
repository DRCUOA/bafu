BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "shopping_list" (
    "id"    INTEGER NOT NULL,
    "user_id"   INTEGER NOT NULL,
    "created_at"    DATETIME,
    "updated_at"    DATETIME,
    "name"  TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "pantry_items" (
    "id"    INTEGER NOT NULL,
    "user_id"   INTEGER NOT NULL,
    "created_at"    DATETIME,
    "updated_at"    DATETIME,
    "barcode"   TEXT NOT NULL,
    "name"  TEXT NOT NULL,
    "quantity"  INTEGER NOT NULL,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "items" (
    "item_id"   TEXT NOT NULL,
    "created_at"    DATETIME,
    "updated_at"    DATETIME,
    "barcode"   TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_description"  TEXT,
    "item_cost" NUMERIC,
    "item_UOM"  TEXT NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "item_img_path" TEXT,
    "item_img_blob" BLOB,
    PRIMARY KEY("item_id")
);

CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at"    DATETIME NOT NULL,
    PRIMARY KEY("email")
);

CREATE TABLE IF NOT EXISTS "app_users" (
    "id"    INTEGER NOT NULL,
    "username"  TEXT NOT NULL,
    "email" TEXT,
    "password"  TEXT NOT NULL,
    "created_at"    DATETIME,
    "updated_at"    DATETIME,
    "deleted_at"    DATETIME,
    "name"  TEXT,
    "authToken" TEXT,
    "pwdResetToken" TEXT,
    "pwdResetToken_expiration"  DATETIME,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "chat_rooms" (
    "id"    INTEGER NOT NULL,
    "name"  TEXT NOT NULL,
    "created_at"    DATETIME,
    "updated_at"    DATETIME,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "chat_messages" (
    "id"    INTEGER NOT NULL,
    "user_id"   INTEGER NOT NULL,
    "chat_room_id"  INTEGER NOT NULL,
    "message"   TEXT NOT NULL,
    "created_at"    DATETIME,
    PRIMARY KEY("id"),
    FOREIGN KEY("user_id") REFERENCES "app_users"("id"),
    FOREIGN KEY("chat_room_id") REFERENCES "chat_rooms"("id")
);

COMMIT;
