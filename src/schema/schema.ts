import {
  pgTable,
  serial,
  text,
  numeric,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const pokemons = pgTable("pokemons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  weight: numeric("weight"),
  height: numeric("height"),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const power = pgTable("power", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  threshold: numeric("threshold"),
  description: text("description"),
  pokemon: integer("pokemon_id").references(() => pokemons.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
