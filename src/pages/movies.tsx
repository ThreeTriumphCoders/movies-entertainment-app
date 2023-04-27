import { useEffect, useRef, useState } from "react";
import { LoadMoreButton } from "~/components/LoadMoreButton";
import { MoviesList } from "~/components/MoviesList";
import { useGetPopularMovies } from "~/utils/use-queries";

const MoviesPage = () => {
  const [popularMovies, getPopularMovies] = useGetPopularMovies();
  const page = useRef(1);

  const [isButtonLoading, setButtonLoading] = useState(false);
  const isLoading = useRef(false);

  const loadMoreMovies = () => {
    page.current += 1;
    isLoading.current = true;
    setButtonLoading(true);
    
    getPopularMovies(page.current)
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
        void loadMoreMovies();
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
        movies={popularMovies}
        title="Popular movies"
        category="Movie"
      />

      <LoadMoreButton 
        isLoading={isButtonLoading}
        onClick={loadMoreMovies}
      />
    </>
  );
};

export default MoviesPage;
