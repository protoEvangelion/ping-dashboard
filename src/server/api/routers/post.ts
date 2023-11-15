import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getSecretMessage: publicProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
