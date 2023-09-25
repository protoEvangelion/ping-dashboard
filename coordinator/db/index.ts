import { BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { Database } from 'bun:sqlite'

const sqlite = new Database('ping.sqlite', { create: true })
const db: BunSQLiteDatabase = drizzle(sqlite)

await migrate(db, { migrationsFolder: 'drizzle' })
