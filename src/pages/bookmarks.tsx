import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { MoviesList } from '~/components/MoviesList';
import { MoviesListMockup } from '~/components/MoviesListMockup';
import { useBookmarksContext } from '~/contexts/useBookmarksContext';
import { MovieDB } from '~/controllers/movieDB';
import { type Category } from '~/types/Category.enum';
import { type MoviesType } from '~/types/Movie';

const BookmarksPage = () => {
  const { bookmarks } = useBookmarksContext();
  const [movies, setMovies] = useState<MoviesType>([]);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectToHomePage = async () => {
      if (status === 'unauthenticated') {
        await router
          .push('/auth/signin')
          .catch(() => console.error('error occured'));
      }
    };

    redirectToHomePage().catch((err) => console.error(err));
  }, [status]);

  const {
    isFetching,
    isError,
    refetch: loadMoreBookmarks,
  } = useQuery({
    queryKey: ['bookmarked'],
    queryFn: () =>
      Promise.all(
        bookmarks.map(({ movieId, type }) =>
          MovieDB.getInstance().getMovie(movieId, type as Category),
        ),
      ),
    onSuccess: (data) => setMovies(data),
  });

  useEffect(() => {
    void loadMoreBookmarks();
  }, [bookmarks]);

  return (
    <section>
      {isFetching ? (
        <MoviesListMockup title={'Bookmarks'} />
      ) : (
        <MoviesList
          title={isError || !movies.length ? 'No Bookmarks yet' : 'Bookmarks'}
          movies={movies}
        />
      )}
    </section>
  );
};

export default BookmarksPage;
