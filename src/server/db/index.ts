import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: "DATABASE_URL",
  authToken: "DATABASE_AUTH_TOKEN",
});

const db = drizzle(client);

// const result = await db.select().from(users).all();

// import { BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";
// import { migrate } from "drizzle-orm/bun-sqlite/migrator";
// import { Database } from "bun:sqlite";

// const sqlite = new Database("ping.sqlite", { create: true });
// const db: BunSQLiteDatabase = drizzle(sqlite);

// await migrate(db, { migrationsFolder: "drizzle" });
