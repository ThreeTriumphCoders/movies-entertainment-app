import { env } from "~/env.mjs";
import {
  type ImagesAPIResponseType,
  type VideosAPIResponseType,
} from "~/types/responses";
import axios from "axios";
import { type MovieType } from "~/types/Movie";

export const get = async <T>(path: string): Promise<T> => {
  const { data } = await axios.get<T>(path);

  return data;
};

export const getMovie = async (id: number) => { //Todo: do it generic, same as function below
  const data = await get<MovieType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/movie/${id}?${env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  return data;
};

export const getMovieImages = async ( //? Rename to getImages
  id: number, 
  category: 'movie' | 'tv' = 'movie'
) => {
  try {
    const { backdrops } = await get<ImagesAPIResponseType>(
      `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${category}/${id}/images?${env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    if (backdrops.length > 5) {
      return backdrops.slice(0, 5).map(({ file_path }) => file_path);
    } 

    return backdrops.map(({ file_path }) => file_path);
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getTrailerKey = async (
  id: number, 
  category: 'movie' | 'tv' = 'movie',
) => {
  const { results } = await get<VideosAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${category}/${id}/videos?${env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const trailer = results.find(
    ({ site, type }) => site === "YouTube" && type === "Trailer"
  );

  return trailer ? trailer.key : "";
};
