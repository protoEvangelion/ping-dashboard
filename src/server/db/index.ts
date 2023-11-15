import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
 
// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
export const TestsTable = pgTable(
  'tests',
  {
    id: serial('id').primaryKey(),
    description: text('description'),
    agent: text('agent').notNull(),
    destIp: text('destIp').notNull(),
    shouldFail: boolean('shouldFail').notNull(),
    status: text('status', { enum: ['success', 'failed', 'running', 'not ran', 'error'] }),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  // (tests) => {
  //   return {
  //     uniqueIdx: uniqueIndex('unique_idx').on(tests.email),
  //   };
  // },
);

export type PingTest = typeof TestsTable.$inferSelect

 
export const getExampleTable = async () => {
  const selectResult = await db.select().from(TestsTable);
  console.log('Results', selectResult);
};

