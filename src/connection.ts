import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

// for query purposes
const queryClient = postgres(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@0.0.0.0:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

export const db: PostgresJsDatabase = drizzle(queryClient);
