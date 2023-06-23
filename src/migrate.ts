import { db } from "./connection";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// for migrations
migrate(db, { migrationsFolder: "drizzle" }).then(() => {});
