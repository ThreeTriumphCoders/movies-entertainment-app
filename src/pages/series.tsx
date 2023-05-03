import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { LoadMoreButton } from '~/components/LoadMoreButton';
import { MoviesList } from '~/components/MoviesList';
import { MoviesListMockup } from '~/components/MoviesListMockup';
import { Category } from '~/types/Category.enum';
import { type MoviesType } from '~/types/Movie';
import { getPopular } from '~/utils/helpers';

const SeriesPage = () => {
  const page = useRef(1);
  const [series, setSeries] = useState<MoviesType>([]);

  const { isFetching, isError, refetch } = useQuery({
    queryKey: ['series'],
    queryFn: () => getPopular(page.current, Category.TV),
    onSuccess(data) {
      setSeries((prev) => {
        return uniqBy([...prev, ...data], (elem) => elem.id);
      });
      page.current += 1;
    },
  });

  const loadMoreSeries = async () => {
    await refetch();
  };

  useEffect(() => {
    const loadNewMovies = () => {
      const { clientHeight, scrollHeight, scrollTop } =
        document.documentElement;

      const needLoad = scrollHeight - clientHeight - scrollTop < 1000;

      if (needLoad) {
        void loadMoreSeries();
      }
    };

    window.addEventListener('scroll', loadNewMovies);

    return () => {
      window.removeEventListener('scroll', loadNewMovies);
    };
  }, []);

  return (
    <>
      {isFetching && series.length < 1 ? (
        <MoviesListMockup title="Popular series" />
      ) : (
        <>
          <MoviesList
            movies={isError ? [] : series}
            title={isError ? 'Error! No series loaded :(' : 'Popular series'}
            category={Category.TV}
          />

          <LoadMoreButton
            isLoading={isFetching}
            onClick={() => void loadMoreSeries()}
          />
        </>
      )}
    </>
  );
};

export default SeriesPage;
