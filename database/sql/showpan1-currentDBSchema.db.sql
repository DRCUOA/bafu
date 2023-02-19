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

COMMIT;
