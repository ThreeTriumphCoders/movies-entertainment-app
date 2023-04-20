import { env } from "~/env.mjs";
import { useState, useEffect } from "react";
import { get } from "./fetchers";
import { type MoviesAPIResponseType } from "~/types/MoviesAPIResponse";
import { type MovieType } from "~/types/Movie";

export const useGetPopularMovies = (): MovieType[] => {
  const [data, setData] = useState<MovieType[]>([]);

  const getData = async () => {
    try {
      const { results } = await get<MoviesAPIResponseType>(
        `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/popular?${env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      console.log(results);
      setData(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData().catch(console.log);
  }, []);

  console.log('returned!')
  console.log(data)
  return data;
};
