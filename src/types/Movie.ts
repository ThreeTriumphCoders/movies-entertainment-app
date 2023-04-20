import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  posterImage: z.string(),
  backdrop_path: z.string().nullable(),
  backdropImage: z.string(),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  genre_ids: z.array(z.number()),
  video: z.boolean(),
  adult: z.boolean(),
});
export const MoviesSchema = z.array(MovieSchema);

export type MoviesType = z.infer<typeof MoviesSchema>;
export type MovieType = z.infer<typeof MovieSchema>;

// const movie = {
//   adult: false,
//   backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
//   belongs_to_collection: null,
//   budget: 63000000,
//   genres: [
//     {
//       id: 18,
//       name: "Drama",
//     },
//     {
//       id: 53,
//       name: "Thriller",
//     },
//     {
//       id: 35,
//       name: "Comedy",
//     },
//   ],
//   homepage: "http://www.foxmovies.com/movies/fight-club",
//   id: 550,
//   imdb_id: "tt0137523",
//   original_language: "en",
//   original_title: "Fight Club",
//   overview:
//     'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
//   popularity: 66.969,
//   poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
//   production_countries: [
//     {
//       iso_3166_1: "US",
//       name: "United States of America",
//     },
//   ],
//   release_date: "1999-10-15",
//   revenue: 100853753,
//   runtime: 139,
//   spoken_languages: [
//     {
//       english_name: "English",
//       iso_639_1: "en",
//       name: "English",
//     },
//   ],
//   status: "Released",
//   tagline: "Mischief. Mayhem. Soap.",
//   title: "Fight Club",
//   video: false,
//   vote_average: 8.432,
//   vote_count: 26232,
// };
