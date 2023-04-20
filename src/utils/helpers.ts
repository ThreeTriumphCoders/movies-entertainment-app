import { env } from "~/env.mjs";
import axios from "axios";
import { type MovieSchema } from "~/types/Movie";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/popular?${env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    // return response?.data;

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      `${env.NEXT_PUBLIC_TMDB_MOVIE_URL}/top_rated?${env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
