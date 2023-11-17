import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { db } from '~/server/db'
import { TestsTable } from '~/server/db/schema'

export const testsRouter = createTRPCRouter({
    getSecretMessage: publicProcedure.query(() => {
        return 'you can now see this secret message!'
    }),
    getTests: publicProcedure.query(() => db.select().from(TestsTable)),
})
