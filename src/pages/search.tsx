import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { MoviesList } from '~/components/MoviesList';
import { getSearchResult, type SearchResults } from '~/utils/helpers';

const SearchPage = () => {
  const page = useRef(1);
  const { query } = useRouter();
  const [results, setResults] = useState<SearchResults>({
    results: [],
    total: 0,
  });

  console.log(results.results.length);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getSearchResult(query?.params || '', page.current),
    onSuccess(data) {
      setResults((prev) => ({
        results: [...prev?.results, ...data.results],
        total: data.total,
      }));
      page.current += 1;
    },
  });

  const loadMoreResults = async () => {
    await refetch();
  };

  const getMovies = async () => {
    const moviesFromServer = await getSearchResult(query?.params || '', 1); //! change
    console.log(moviesFromServer);

    setResults(moviesFromServer);
  };

  useEffect(() => {
    void getMovies();
    page.current = 1;
  }, [query]);

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

  return (
    <section>
      <MoviesList
        movies={results?.results || []}
        title={`Found ${results?.total || 0} results for '${
          query?.params || ''
        }'`}
      />
    </section>
  );
};

export default SearchPage;
