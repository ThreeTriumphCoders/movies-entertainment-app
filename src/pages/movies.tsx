import { useEffect, useRef } from "react";
import { MoviesList } from "~/components/MoviesList";
import { useGetPopularMovies } from "~/utils/use-queries";

const MoviesPage = () => {
  const [popularMovies, getPopularMovies] = useGetPopularMovies();
  const page = useRef(1);

  const isLoading = useRef(false);

  const loadMoreMovies = async () => {
    isLoading.current = true;
    
    page.current += 1;
    await getPopularMovies(page.current);

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

      <div className="flex justify-center">
        <button
          onClick={() => void loadMoreMovies()}
          className="rounded-lg bg-primary px-8 py-2 text-dark"
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default MoviesPage;
