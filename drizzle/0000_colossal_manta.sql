CREATE TABLE IF NOT EXISTS "pokemons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"weight" numeric,
	"height" numeric,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "power" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"threshold" numeric,
	"description" text,
	"pokemon_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "power" ADD CONSTRAINT "power_pokemon_id_pokemons_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
