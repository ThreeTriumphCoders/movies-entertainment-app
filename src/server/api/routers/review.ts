import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          movieId: input.movieId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        rating: z.number(),
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.review.create({
        data: {
          movieId: input.movieId,
          text: input.text,
          rating: input.rating,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.bookmark.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
