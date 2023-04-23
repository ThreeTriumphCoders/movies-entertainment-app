import { useRef, useEffect, useState } from "react";
import { LoadMoreButton } from "~/components/LoadMoreButton";
import { MoviesList } from "~/components/MoviesList";
import { useGetPopularSeries } from "~/utils/use-queries";

const SeriesPage = () => {
  const [popularSeries, getPopularSeries] = useGetPopularSeries();
  const page = useRef(1);

  const [isButtonLoading, setButtonLoading] = useState(false);
  const isLoading = useRef(false);

  const loadMoreSeries = () => {
    page.current += 1;
    isLoading.current = true;
    setButtonLoading(true);
    
    getPopularSeries(page.current)
      .then(() => {
        isLoading.current = false;
        setButtonLoading(false);
      })
      .catch(console.error)
  };

  useEffect(() => {
    const loadNewMovies = () => {
      const {
        clientHeight,
        scrollHeight,
        scrollTop,
      } = document.documentElement;

      const needLoad = scrollHeight - clientHeight - scrollTop < 1000;
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

      <LoadMoreButton 
        isLoading={isButtonLoading}
        onClick={loadMoreSeries}
      />
    </>
  );
};

export default SeriesPage;
