import { InferModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  numeric,
  timestamp,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// creating pokemon schema
export const pokemon = pgTable(
  "pokemon",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    weight: numeric("weight"),
    height: numeric("height"),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (pokemonSchema) => {
    // creating an index for pokemon name
    return {
      pokemon_unique_idx: uniqueIndex("pokemon_unique_idx").on(
        pokemonSchema.name
      ),
    };
  }
);

// creating power  schema
export const power = pgTable("power", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  threshold: numeric("threshold"),
  description: text("description"),
  pokemon: integer("pokemon_id").references(() => pokemon.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// creating types from schema
export type Pokemon = InferModel<typeof pokemon>;
export type Power = InferModel<typeof power>;
