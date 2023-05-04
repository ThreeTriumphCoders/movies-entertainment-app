import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { MoviesList } from '~/components/MoviesList';
import { MoviesListMockup } from '~/components/MoviesListMockup';
import { Category } from '~/types/Category.enum';
import { type MoviesType } from '~/types/Movie';
import { getPopular } from '~/utils/helpers';

const MoviesPage = () => {
  const page = useRef(1);
  const [movies, setMovies] = useState<MoviesType>([]);

  const { isError, refetch, isFetching } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getPopular(page.current, Category.MOVIE),
    onSuccess(data) {
      setMovies((prev) => {
        return uniqBy([...prev, ...data], (elem) => elem.id);
      });
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

  return isFetching && movies.length < 1 ? (
    <MoviesListMockup title="Popular movies" />
  ) : (
    <MoviesList
      movies={isError ? [] : movies}
      title={isError ? 'Error! No movies loaded :(' : 'Popular movies'}
      category={Category.MOVIE}
    />
  );
};

export default MoviesPage;
