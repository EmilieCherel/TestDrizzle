ALTER TABLE "scenarios" RENAME TO "scenario";--> statement-breakpoint
ALTER TABLE "clients" RENAME COLUMN "email" TO "crm";--> statement-breakpoint
ALTER TABLE "scenario" RENAME COLUMN "client_id" TO "description";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_scenario_id_scenarios_id_fk";
--> statement-breakpoint
ALTER TABLE "scenario" DROP CONSTRAINT "scenarios_client_id_clients_id_fk";
--> statement-breakpoint
ALTER TABLE "scenario" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "scenario" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_scenario_id_scenario_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "scenario"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
