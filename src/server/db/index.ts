import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { sql } from '@vercel/postgres';
 
// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

await migrate(db, { migrationsFolder: "drizzle" });

// export const getExampleTable = async () => {
//   const selectResult = await db.select().from(TestsTable);
//   console.log('Results', selectResult);
// };

