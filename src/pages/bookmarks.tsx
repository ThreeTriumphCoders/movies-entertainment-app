import { useEffect, useState } from "react";
import { MoviesList } from "~/components/MoviesList";
import { useBookmarksContext } from "~/contexts/useBookmarks";
import { type MoviesType } from "~/types/Movie";
import { getMovie } from "~/utils/helpers";

const BookmarksPage = () => {
  const { bookmarksIds } = useBookmarksContext();
  const [movies, setMovies] = useState<MoviesType>([]); 

  useEffect(() => {
    try {
      Promise
        .all(bookmarksIds.map(id => getMovie(id)))
        .then(setMovies)
        .catch(console.log);
      
    } catch (err) {

    }
  }, [bookmarksIds]);

  return (
    <section>
      <MoviesList title="Bookmarks" movies={movies} />
    </section>
  );
};

export default BookmarksPage;
