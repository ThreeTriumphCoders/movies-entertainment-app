import { env } from "~/env.mjs";
import { type VideosAPIResponseType } from "~/types/responses";
import axios from "axios";

export const get = async <T>(path: string): Promise<T> => {
  const { data } = await axios.get<T>(path);

  return data;
};

// export const getPopularMovies = async () => {
//   try {
//     const response = await axios.get(
//       `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/popular?${env.NEXT_PUBLIC_TMDB_API_KEY}`
//     );

//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getTopRatedMovies = async () => {
//   try {
//     const response = await axios.get(
//       `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/top_rated?${env.NEXT_PUBLIC_TMDB_API_KEY}`
//     );

//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getMovieImages = async (id: number) => {
//   try {
//     const { backdrops } = await get<ImagesAPIResponse>(
//       `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/movie/${id}/images?${env.NEXT_PUBLIC_TMDB_API_KEY}`
//     );

//     return backdrops;
//   } catch (err) {
//     console.error(err);
//   }

//   return [];
// };

export const getTrailerKey = async (id: number) => {
  const { results } = await get<VideosAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${id}/videos?${env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const trailer = results.find(
    ({ site, type }) => site === "YouTube" && type === "Trailer"
  );

  return trailer ? trailer.key : "";
};
