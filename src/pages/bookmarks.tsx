import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MoviesList } from '~/components/MoviesList';
import { useBookmarksContext } from '~/contexts/useBookmarks';
import { type Category } from '~/types/Category.enum';
import { type MoviesType } from '~/types/Movie';
import { getMovie } from '~/utils/helpers';

const BookmarksPage = () => {
  const { bookmarks } = useBookmarksContext();
  const [movies, setMovies] = useState<MoviesType>([]);

  const { isError, refetch: loadMoreBookmarks } = useQuery({
    queryKey: ['bookmarked'],
    queryFn: () =>
      Promise.all(
        bookmarks.map(({ movieId, type }) =>
          getMovie(movieId, type as Category),
        ),
      ),
    onSuccess: (data => setMovies(data))
  });

  useEffect(() => {
    void loadMoreBookmarks();
  }, [bookmarks]);

  return (
    <section>
      <MoviesList
        title={isError ? 'No Bookmarks yet' : 'Bookmarks'}
        movies={movies}
      />
    </section>
  );
};

export default BookmarksPage;
