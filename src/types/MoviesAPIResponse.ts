import { z } from "zod";
import { MoviesSchema } from "./Movie";

export const MoviesAPIResponse = z.object({
  page: z.number(),
  results: MoviesSchema
});

export type MoviesAPIResponseType = z.infer<typeof MoviesAPIResponse>;
