DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('success', 'failed', 'running', 'not ran', 'error');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"agent_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"dest_ip" varchar(15) NOT NULL,
	"should_fail" boolean NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
