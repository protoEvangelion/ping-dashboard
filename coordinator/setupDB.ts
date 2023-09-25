import { drizzle, BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { rowsData } from './data/tests-example'
import { TestRecord } from '../types'

const sqlite = new Database('ping.sqlite', { create: true })
const db: BunSQLiteDatabase = drizzle(sqlite)

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
        // Using prepare to cache the statement and improve perf
        getTestsQuery: db.prepare<TestRecord, null>('SELECT * FROM tests'),
        updateTestStatusQuery: db.prepare('UPDATE tests SET status = $status WHERE id = $id'),
    }
}

function seedDB() {
    // Clear the DB
    db.exec('DROP TABLE IF EXISTS tests')

    // Create a new table
    db.exec(
        'CREATE TABLE tests (id TEXT, status TEXT NULL, description TEXT, agent TEXT, destIp TEXT, shouldFail BOOLEAN)'
    )

    // Insert your data into the table
    for (let i = 0; i < rowsData.length; i++) {
        db.exec('INSERT INTO tests VALUES (?, ?, ?, ?, ?, ?)', [
            rowsData[i].id,
            rowsData[i].status || null,
            rowsData[i].description,
            rowsData[i].agent,
            rowsData[i].destIp,
            rowsData[i].shouldFail,
        ])
    }

    // Read the data back to verify it was inserted correctly
    const rows = db
        .prepare('SELECT id, status, description, agent, destIp, CAST(shouldFail AS BOOLEAN) AS shouldFail FROM tests')
        .all()

    console.log('Seeded DB: ', rows)
}

function runTestQuery() {}
