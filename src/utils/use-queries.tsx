import { env } from "~/env.mjs";
import { useState, useEffect, useRef } from "react";
import { get } from "./helpers";
import { type MoviesAPIResponseType } from "~/types/responses";
import { type MovieType, type MoviesType } from "~/types/Movie";
import _ from 'lodash';

export const useGetPopularMovies = (): [
  MoviesType,
  (page: number) => Promise<void>
] => {
  const [data, setData] = useState<MoviesType>([]);
  const pageNumber = useRef(0);

  const getData = async (page: number) => {
    try {
      const { results } = await get<MoviesAPIResponseType>(
        `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/movie/popular?${env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
      );

      if (pageNumber.current !== page) {
        setData((prev) => [...prev, ...results]);

        pageNumber.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData(1).catch(console.log);
  }, []);

  return [data, getData];
};

export const useGetTrendings = (): MoviesType => {
  const [data, setData] = useState<MoviesType>([]);

  const getData = async () => {
    try {
      const { results: moviesResults } = await get<MoviesAPIResponseType>(
        `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/trending/movie/week?${env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const { results: seriesResults } = await get<MoviesAPIResponseType>(
        `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/trending/tv/week?${env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const shuffledResult: MovieType[] = _.shuffle<MovieType>([...moviesResults, ...seriesResults]);

      setData(shuffledResult);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData().catch(console.log);
  }, []);

  return data;
};
