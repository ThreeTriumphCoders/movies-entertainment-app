import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
    ? query.params[0]
    : query.params;

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: () => {
      return getSearchResult(queryParams || '', page.current);
    },
    onSuccess(data) {
      setResults((prev) => {
        console.log('setting results ' + String(data.results.length));

        if (!data.results.length) {
          attempsWithoutResult.current += 1;
        }

        return {
          results: uniqBy(
            [...prev.results, ...data.results],
            (elem) => elem.id,
          ),
          total: data.total,
        };
      });
      page.current += 1;
    },
    enabled: false,
  });

  const loadMoreResults = async () => {
    console.log(attempsWithoutResult);

    if (attempsWithoutResult.current <= 5) {
      console.log('fetching');

      await refetch();
    }
  };

  const loadFirstResults = async (queryParams = '') => {
    console.log('fetching result');

    const results = await getSearchResult(queryParams, 1);

    console.log(results);

    setResults(results);
  };

  useEffect(() => {
    console.log('useeffect executing');
    const initialLoad = async () => {
      page.current = 1;
      attempsWithoutResult.current = 0;
      setResults(defaultResults);

      await loadFirstResults(queryParams);
      console.log(queryParams ? queryParams : 'no params in useEffect');
    };

    initialLoad().catch(console.error);
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

  const titleIfFound = `Found ${results?.total || 0} results for '${
    queryParams || 'your request'
  }'`;

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <MoviesList
        movies={results?.results || []}
        title={isError ? 'Something went wrong.' : titleIfFound}
      />
      {/* )} */}
    </>
  );
};

export default SearchPage;
