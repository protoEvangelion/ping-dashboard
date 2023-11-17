import type { Config } from 'drizzle-kit'

export default {
    schema: './db/schema/pingtest.ts',
    out: './db/drizzle',
    driver: 'pg',
} satisfies Config
