CREATE TABLE "energy_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp NOT NULL,
	"total_demand" integer NOT NULL,
	"carbon_intensity" integer NOT NULL,
	"frequency" text NOT NULL,
	"energy_mix" jsonb NOT NULL,
	"regional_data" jsonb,
	"system_status" jsonb
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
