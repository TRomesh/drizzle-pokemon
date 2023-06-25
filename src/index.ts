import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import { pokemon, power } from "./schema/schema";
import { db } from "./connection";
import { eq, and } from "drizzle-orm";

dotenv.config();

const port = process.env.PORT || 4040;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong 🏓");
});

app.get("/pokemons", async (_: Request, res: Response) => {
  const allPokemons = await db.select().from(pokemon);
  res.status(200).json(allPokemons);
});

app.get("/pokemon/:id", async (req: Request, res: Response) => {
  const allPokemons = await db
    .select()
    .from(pokemon)
    .where(eq(pokemon.id, parseInt(req.params.id)));
  res.status(200).json(allPokemons);
});

app.get("/powers", async (_: Request, res: Response) => {
  const allPowers = await db
    .select()
    .from(power)
    .rightJoin(pokemon, eq(power.id, pokemon.id));
  res.status(200).json(allPowers);
});

app.get("/power/:id", async (req: Request, res: Response) => {
  const selectedPower = await db
    .select()
    .from(power)
    .where(eq(power.id, parseInt(req.params.id)));
  res.status(200).json(selectedPower);
});

app.post("/pokemon", async (req: Request, res: Response) => {
  const newPokemon = await db
    .insert(pokemon)
    .values({
      name: req.body.name,
      weight: req.body.weight,
      height: req.body.height,
      description: req.body.description,
    })
    .returning({ insertedId: pokemon.id });
  res.status(200).json(newPokemon);
});

app.post("/power", async (req: Request, res: Response) => {
  const newPower = await db
    .insert(power)
    .values({
      name: req.body.name,
      threshold: req.body.threshold,
      pokemon: req.body.pokemon_id,
      description: req.body.description,
    })
    .returning({ insertedId: power.id });
  res.status(200).json(newPower);
});

app.delete("/pokemon", async (req: Request, res: Response) => {
  const deletedPokemonIds: { deletedId: number }[] = await db
    .delete(pokemon)
    .where(eq(pokemon.id, req.body.id))
    .returning({ deletedId: pokemon.id });
  res.status(200).json(deletedPokemonIds);
});

app.listen(port, () => {
  console.log(`listning on port ${port}`);
});
