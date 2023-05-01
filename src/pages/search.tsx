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
  const [isLoaded, setLoaded] = useState(false);
  const attempsWithoutResult = useRef(0);

  const queryParams = Array.isArray(query.params)
    ? query.params[0]
    : query.params;

  const { isError, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: () => {
      return getSearchResult(queryParams || '', page.current);
    },
    onSuccess(data) {
      setResults((prev) => {
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
    if (attempsWithoutResult.current <= 5) {
      await refetch();
    }
  };

  const loadFirstResults = async (queryParams = '') => {
    const getResultsFromServer = async (attempt = 1): Promise<void> => {
      if (attempt > 1) {
        return;
      }

      const resultsFromServer = await getSearchResult(queryParams, 1);

      if (resultsFromServer.results.length) {
        setResults(resultsFromServer);
        return;
      } else {
        return await getResultsFromServer(attempt + 1);
      }
    };

    await getResultsFromServer();
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);

    page.current = 1;
    attempsWithoutResult.current = 0;

    setResults(defaultResults);
    void loadFirstResults(queryParams);
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

  const title = !isLoaded ? 'Searching for results...' : titleIfFound;

  return (
    <>
      {!isLoaded && <Loader />}
      <MoviesList
        movies={results?.results || []}
        title={isError ? 'Something went wrong.' : title}
      />
    </>
  );
};

export default SearchPage;
