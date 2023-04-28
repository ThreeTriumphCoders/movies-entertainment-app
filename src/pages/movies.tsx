import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { LoadMoreButton } from '~/components/LoadMoreButton';
import { Loader } from '~/components/Loader';
import { MoviesList } from '~/components/MoviesList';
import { Category } from '~/types/Category.enum';
import { type MoviesType } from '~/types/Movie';
import { getPopular } from '~/utils/helpers';

const MoviesPage = () => {
  const page = useRef(1);
  const [movies, setMovies] = useState<MoviesType>([]);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getPopular(page.current, Category.MOVIE),
    onSuccess(data) {
      setMovies((prev) => [...prev, ...data]);
      page.current += 1;
    },
  });

  const loadMoreMovies = async () => {
    await refetch();
  };

  useEffect(() => {
    const loadNewMovies = () => {
      const { clientHeight, scrollHeight, scrollTop } =
        document.documentElement;

      const needLoad = scrollHeight - clientHeight - scrollTop < 1000;

      if (needLoad) {
        void loadMoreMovies();
      }
    };

    window.addEventListener('scroll', loadNewMovies);

    return () => {
      window.removeEventListener('scroll', loadNewMovies);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MoviesList
            movies={isError ? [] : movies}
            title={isError ? 'Error! No movies loaded :(' : 'Popular movies'}
            category={Category.MOVIE}
          />

          <LoadMoreButton
            isLoading={isLoading}
            onClick={() => void loadMoreMovies()}
          />
        </>
      )}
    </>
  );
};

export default MoviesPage;
