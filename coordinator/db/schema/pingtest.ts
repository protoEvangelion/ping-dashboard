import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core'

export const pingTest = sqliteTable('tests', {
    id: integer('id').primaryKey(),
    description: text('description'),
    agent_id: integer('agent_id'),
    dest_ip: text('dest_ip'),
    should_fail: integer('should_fail', { mode: 'boolean' }),
    status: text('status', {
        enum: ['success', 'failed', 'running', 'not ran', 'error'],
    }),
})

export type PingTest = typeof pingTest.$inferSelect
