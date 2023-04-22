import { useRef } from "react";
import { MoviesList } from "~/components/MoviesList";
import { useGetPopularMovies } from "~/utils/use-queries";

const MoviesPage = () => {
  const [popularMovies, getPopularMovies] = useGetPopularMovies();
  const page = useRef(1);

  const loadMoreMovies = async () => {
    page.current += 1;
    await getPopularMovies(page.current);
  };

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
