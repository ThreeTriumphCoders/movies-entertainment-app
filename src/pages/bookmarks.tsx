import { useEffect, useState } from "react";
import { MoviesList } from "~/components/MoviesList";
import { useBookmarksContext } from "~/contexts/useBookmarks";
import { type Category } from "~/types/Category.enum";
import { type MoviesType } from "~/types/Movie";
import { getMovie } from "~/utils/helpers";

const BookmarksPage = () => {
  const { bookmarks } = useBookmarksContext();
  const [movies, setMovies] = useState<MoviesType>([]); 

  useEffect(() => {
    try {
      Promise
        .all(bookmarks.map(({ movieId, type }) => getMovie(movieId, type as Category)))
        .then(setMovies)
        .catch(console.log);
      
    } catch (err) {

    }
  }, [bookmarks]);

  return (
    <section>
      <MoviesList title="Bookmarks" movies={movies} />
    </section>
  );
};

export default BookmarksPage;
