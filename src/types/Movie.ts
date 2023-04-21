import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  media_type: z.string().optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string(),
  // posterImage: z.string(),
  backdrop_path: z.string().nullable(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  genre_ids: z.array(z.number()),
  video: z.boolean(),
  adult: z.boolean(),
  origin_country: z.array(z.string()).optional(),
  // video_id: z.string().optional(),
});
export const MoviesSchema = z.array(MovieSchema);

export type MoviesType = z.infer<typeof MoviesSchema>;
export type MovieType = z.infer<typeof MovieSchema>;
