import axios from 'axios';
import { env } from '~/env.mjs';
import { Category } from '~/types/Category.enum';
import { type MovieType } from '~/types/Movie';
import {
  type ImagesAPIResponseType,
  type MoviesAPIResponseType,
  type VideosAPIResponseType,
} from '~/types/responses';

export const get = async <T>(path: string): Promise<T> => {
  const { data } = await axios.get<T>(path);

  return data;
};

export const getMovie = async (
  id: number,
  category: Category = Category.MOVIE,
) => {
  const data = await get<MovieType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${category}/${id}?${env.NEXT_PUBLIC_TMDB_API_KEY}`,
  );

  return data;
};

export const getImages = async (
  id: number,
  category: Category = Category.MOVIE,
) => {
  const { backdrops } = await get<ImagesAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${category}/${id}/images?${env.NEXT_PUBLIC_TMDB_API_KEY}&include_image_language=null`,
  );

  if (backdrops.length > 5) {
    return backdrops.slice(0, 5).map(({ file_path }) => file_path);
  }

  return backdrops.map(({ file_path }) => file_path) || [];
};

export const getTrailerKey = async (
  id: number,
  category: Category = Category.MOVIE,
) => {
  const { results } = await get<VideosAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${category}/${id}/videos?${env.NEXT_PUBLIC_TMDB_API_KEY}`,
  );
  const trailer = results.find(
    ({ site, type }) => site === 'YouTube' && type === 'Trailer',
  );

  return trailer ? trailer.key : '';
};

export const getPopular = async (
  page: number,
  category: Category = Category.MOVIE,
) => {
  const { results } = await get<MoviesAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/${category}/popular?${env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
  );

  return results;
};

export const getTrending = async (category: Category = Category.MOVIE) => {
  const { results } = await get<MoviesAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/trending/${category}/week?${env.NEXT_PUBLIC_TMDB_API_KEY}`,
  );

  return results;
};

export const getSearchResult = async (query: string, page = 1) => {
  const { results: moviesResults } = await get<MoviesAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/search/movie?${env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}`,
  );
  const { results: seriesResults } = await get<MoviesAPIResponseType>(
    `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/search/tv?${env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}`,
  );

  const results = moviesResults
    .concat(seriesResults)
    .sort((a, b) => b.vote_count - a.vote_count);

  console.log(results);

  return results;
};
