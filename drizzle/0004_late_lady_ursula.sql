CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" varchar(256),
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
