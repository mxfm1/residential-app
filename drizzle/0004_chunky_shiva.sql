ALTER TABLE "profiles" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "imageId" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_unique" UNIQUE("userId");