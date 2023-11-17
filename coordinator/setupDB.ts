import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { rowsData } from './data/tests.ts'
import { pingTest } from './db/schema/pingtest'

const sqlite = new Database('ping.sqlite', { create: true })
const db = drizzle(sqlite, { schema: { pingTest } })

// if (process.argv.includes('--seed')) {
//     seedDB()
// }
// if (process.argv.includes('--test-query')) {
//     runTestQuery()
// }

export function setupDB() {
    seedDB()

    return {
        db,
    }
}

function seedDB() {
    const db = new Database('ping.sqlite', { create: true })
    // Clear the DB
    db.exec('DROP TABLE IF EXISTS tests')

    // Create a new table
    db.exec(
        'CREATE TABLE tests (id TEXT, status TEXT NULL, description TEXT, agent_id TEXT, dest_ip TEXT, should_fail BOOLEAN)'
    )

    // Insert your data into the table
    for (let i = 0; i < rowsData.length; i++) {
        db.exec('INSERT INTO tests VALUES (?, ?, ?, ?, ?, ?)', [
            rowsData[i].id,
            rowsData[i].status || null,
            rowsData[i].description,
            rowsData[i].agent_id,
            rowsData[i].dest_ip,
            rowsData[i].should_fail,
        ])
    }

    // Read the data back to verify it was inserted correctly
    const rows = db
        .prepare(
            'SELECT id, status, description, agent_id, dest_ip, CAST(should_fail AS BOOLEAN) AS should_fail FROM tests'
        )
        .all()

    console.log('Seeded DB: ', rows)
}
