import { z } from "zod";
import { MoviesSchema } from "./Movie";

export const MoviesAPIResponse = z.object({
  page: z.number(),
  results: MoviesSchema,
});

export const VideoSchema = z.object({
  key: z.string(),
  site: z.string(),
  type: z.string(),
});

export const VideosSchema = z.array(VideoSchema);

export const VideosAPIResponse = z.object({
  id: z.number(),
  results: VideosSchema,
});

export type MoviesAPIResponseType = z.infer<typeof MoviesAPIResponse>;

export interface BackdropPath {
  file_path: string;
}

export interface ImagesAPIResponse {
  backdrops: Array<BackdropPath>;
}
