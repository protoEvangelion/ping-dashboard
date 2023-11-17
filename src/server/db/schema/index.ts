import {
    pgTable,
    text,
    boolean,
    timestamp,
    varchar,
    pgEnum,
    uuid,
} from 'drizzle-orm/pg-core'

export const statusEnum = pgEnum('status', [
    'success',
    'failed',
    'running',
    'not ran',
    'error',
])

export const TestsTable = pgTable('tests', {
    id: uuid('id').defaultRandom().primaryKey(),
    description: text('description'),
    agent_id: uuid('agent_id').defaultRandom().notNull(),
    dest_ip: varchar('dest_ip', { length: 15 }).notNull(),
    should_fail: boolean('should_fail').notNull(),
    status: statusEnum('status').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export type PingTest = typeof TestsTable.$inferSelect
