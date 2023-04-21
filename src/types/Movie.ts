import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  posterImage: z.string(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  genres: z.array(z.object({
    name: z.string(),
  })),
  video: z.boolean(),
  adult: z.boolean(),
  video_id: z.string().optional(),
  status: z.string(),
  runtime: z.number(),
});
export const MoviesSchema = z.array(MovieSchema);

export type MoviesType = z.infer<typeof MoviesSchema>;
export type MovieType = z.infer<typeof MovieSchema>;
