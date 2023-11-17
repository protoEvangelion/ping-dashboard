import { rowsData } from '~/data/tests-example'
import { db } from '.'
import { sql } from '@vercel/postgres'
import { TestsTable } from './schema'

async function seedDB() {
    // Clear the DB
    await sql`DROP TABLE IF EXISTS tests`

    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    await sql`DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'statusenum') THEN
            CREATE TYPE statusEnum AS ENUM (
                'success',
                'failed',
                'running',
                'not ran',
                'error'
            );
        END IF;
    END $$;`

    // Create a new table
    await sql`CREATE TABLE tests (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      description TEXT,
      agent_id UUID NOT NULL DEFAULT uuid_generate_v4(),
      dest_ip VARCHAR(15) NOT NULL,
      should_fail BOOLEAN NOT NULL,
      status statusEnum NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`

    console.log('Inserting')

    // @ts-expect-error - mock data
    await db.insert(TestsTable).values(rowsData).execute()

    console.log(await db.select().from(TestsTable))
}

await seedDB()
