CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"emailVerified" boolean DEFAULT false,
	"emailDateVerified" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
