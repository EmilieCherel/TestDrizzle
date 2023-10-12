CREATE TABLE IF NOT EXISTS "clientscenario" (
	"id" serial PRIMARY KEY NOT NULL,
	"scenario_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "subscriptions";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clientscenario" ADD CONSTRAINT "clientscenario_scenario_id_scenario_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "scenario"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clientscenario" ADD CONSTRAINT "clientscenario_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
