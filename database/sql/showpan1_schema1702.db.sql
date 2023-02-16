BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "app_users" (
	"id"	INTEGER NOT NULL,
	"username"	TEXT NOT NULL,
	"email"	TEXT,
	"password"	TEXT NOT NULL,
	"created_at"	DATETIME,
	"updated_at"	DATETIME,
	"deleted_at"	DATETIME,
	"name"	TEXT,
	"authToken"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "shopping_list" (
	"id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"created_at"	DATETIME,
	"updated_at"	DATETIME,
	"name"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "pantry_items" (
	"id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"created_at"	DATETIME,
	"updated_at"	DATETIME,
	"barcode"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "items" (
	"item_id"	TEXT NOT NULL,
	"created_at"	DATETIME,
	"updated_at"	DATETIME,
	"barcode"	TEXT NOT NULL,
	"item_name"	TEXT NOT NULL,
	"item_description"	TEXT,
	"item_cost"	NUMERIC,
	"item_UOM"	TEXT NOT NULL,
	"item_quantity"	INTEGER NOT NULL,
	"item_img_path"	TEXT,
	"item_img_blob"	BLOB,
	PRIMARY KEY("item_id")
);
COMMIT;
