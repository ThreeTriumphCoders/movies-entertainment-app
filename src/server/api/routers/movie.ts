import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany();
  }),

  create: protectedProcedure
    .input(z.object({ movieId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.movie.create({
        data: {
          id: input.movieId,
        },
      });
    }),
});
