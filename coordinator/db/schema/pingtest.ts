import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core'

export const pingTest = sqliteTable('tests', {
    id: integer('id').primaryKey(),
    description: text('description'),
    agent: integer('agent'),
    destIp: text('destIp'),
    shouldFail: integer('shouldFail', { mode: 'boolean' }),
    status: text('status', { enum: ['success', 'failed', 'running', 'not ran', 'error'] }),
})

export type PingTest = typeof pingTest.$inferSelect
