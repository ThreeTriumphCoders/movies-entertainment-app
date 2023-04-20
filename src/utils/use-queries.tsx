import { env } from "~/env.mjs";
import { useState, useEffect, useRef } from "react";
import { get } from "./fetchers";
import { type MoviesAPIResponseType } from "~/types/responses";
import { type MovieType } from "~/types/Movie";

export const useGetPopularMovies = (): [
  MovieType[],
  (page: number) => Promise<void>
] => {
  const [data, setData] = useState<MovieType[]>([]);
  const pageNumber = useRef(0);

  const getData = async (page: number) => {
    try {
      const { results } = await get<MoviesAPIResponseType>(
        `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/popular?${env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
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
