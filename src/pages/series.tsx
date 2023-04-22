import { useRef, useEffect } from "react";
import { MoviesList } from "~/components/MoviesList";
import { useGetPopularSeries } from "~/utils/use-queries";

const SeriesPage = () => {
  const [popularSeries, getPopularSeries] = useGetPopularSeries();
  const page = useRef(1);
  const isLoading = useRef(false);

  const loadMoreSeries = async () => {
    isLoading.current = true;
    
    page.current += 1;
    await getPopularSeries(page.current);

    isLoading.current = false;
  };

  useEffect(() => {
    const loadNewMovies = () => {
      const {
        clientHeight,
        scrollHeight,
        scrollTop,
      } = document.documentElement;

      const needLoad = scrollHeight - clientHeight - scrollTop < 500;
      if (needLoad && !isLoading.current) {
        void loadMoreSeries();
      }
    }

    window.addEventListener('scroll', loadNewMovies);

    return () => {
      window.removeEventListener('scroll', loadNewMovies);
    }
  }, [])

  return (
    <>
      <MoviesList 
        movies={popularSeries}
        title="Popular series"
        category="TV Serie"
        apiPath='tv'
      />

      <div className="flex justify-center">
        <button
          onClick={() => void loadMoreSeries()}
          className="rounded-lg bg-primary px-8 py-2 text-dark"
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default SeriesPage;
