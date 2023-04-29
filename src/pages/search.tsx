import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MoviesList } from '~/components/MoviesList';
import { type MoviesType } from '~/types/Movie';
import { getSearchResult } from '~/utils/helpers';

const SearchPage = () => {
  const router = useRouter();
  const { query } = useRouter();
  const [movies, setMovies] = useState<MoviesType>([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     void router.push('/');
  //   }, 3000);
  // }, [router]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesFromServer = await getSearchResult(query?.params || '', 2); //! change

      console.log(moviesFromServer);

      setMovies(moviesFromServer);
    };

    getMovies().catch(console.error);
  }, [query]);

  return (
    <section>
      <MoviesList movies={movies} title="Search results" />
    </section>
  );
};

export default SearchPage;
