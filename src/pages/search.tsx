import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '~/components/Loader';
import { MoviesList } from '~/components/MoviesList';
import { getSearchResult, type SearchResults } from '~/utils/helpers';

const defaultResults: SearchResults = {
  results: [],
  total: 0,
};

const SearchPage = () => {
  const page = useRef(1);
  const { query } = useRouter();
  const [results, setResults] = useState(defaultResults);
  const attempsWithoutResult = useRef(0);

  const queryParams = Array.isArray(query.params)
    ? query.params[0] || ''
    : query.params || '';

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getSearchResult(queryParams, page.current),
    onSuccess(data) {
      setResults((prev) => {
        if (!data.results.length) {
          attempsWithoutResult.current += 1;
        }

        return {
          results: uniqBy([...prev.results, ...data.results], (e) => e.id),
          total: data.total,
        };
      });
      page.current += 1;
    },
  });

  const loadMoreResults = async () => {
    if (attempsWithoutResult.current <= 5) {
      await refetch();
    }
  };

  useEffect(() => {
    page.current = 1;
    setResults(defaultResults);

    void loadMoreResults();
  }, [queryParams]);

  useEffect(() => {
    const loadNewMovies = () => {
      const { clientHeight, scrollHeight, scrollTop } =
        document.documentElement;

      const needLoad = scrollHeight - clientHeight - scrollTop < 1000;

      if (needLoad) {
        void loadMoreResults();
      }
    };

    window.addEventListener('scroll', loadNewMovies);

    return () => {
      window.removeEventListener('scroll', loadNewMovies);
    };
  }, []);

  const titleIfFound = `Found ${
    results?.total || 0
  } results for '${queryParams}'`;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MoviesList
          movies={results?.results || []}
          title={isError ? 'Something went wrong.' : titleIfFound}
        />
      )}
    </>
  );
};

export default SearchPage;
