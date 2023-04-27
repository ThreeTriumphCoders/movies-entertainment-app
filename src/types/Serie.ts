import { z } from "zod";

export const SerieSchema = z.object({
  id: z.number(),
  media_type: z.string().optional(),
  title: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.string(),
  vote_count: z.string(),
  popularity: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  genre_ids: z.array(z.number()),
  video: z.boolean(),
  adult: z.boolean(),
  origin_country: z.array(z.string()),
},);

//! REWRITE OR DELETE IT

export const SeriesSchema = z.array(SerieSchema);

export type SeriesType = z.infer<typeof SeriesSchema>;
export type SerieType = z.infer<typeof SerieSchema>;