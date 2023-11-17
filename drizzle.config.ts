import type { Config } from 'drizzle-kit'

export default {
    schema: './src/server/db/schema/index.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL + '?sslmode=require',
    },
} satisfies Config
