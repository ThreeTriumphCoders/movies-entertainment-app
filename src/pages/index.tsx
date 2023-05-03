import { useQuery } from '@tanstack/react-query';
import { type NextPage } from 'next';
import Head from 'next/head';
import { MoviesList } from '~/components/MoviesList';
import { MoviesListMockup } from '~/components/MoviesListMockup';
import { TrendingList } from '~/components/TrendingList';
import { Category } from '~/types/Category.enum';
import { getPopular } from '~/utils/helpers';



const Home: NextPage = () => {
  const { data: popularMovies = [], isLoading: moviesLoading } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => getPopular(1, Category.MOVIE),
  });

  const { data: popularSeries = [], isLoading: seriesLoading } = useQuery({
    queryKey: ['popularSeries'],
    queryFn: () => getPopular(1, Category.TV),
  });

  return (
    <>
      <Head>
        <title>Movies Entertainment App</title>
        <meta
          name="description"
          content="Discover and enjoy your favorite movies and TV series with the Movies Entertainment App. Search, watch trailers, leave reviews, and add to your bookmarks. Start now!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TrendingList />

      {moviesLoading ? (
        <MoviesListMockup title="Popular movies" />
      ) : (
        <MoviesList
          movies={popularMovies.slice(0, 12)}
          title="Popular movies"
          category={Category.MOVIE}
        />
      )}

      {seriesLoading ? (
        <MoviesListMockup title="Popular series" />
      ) : (
        <MoviesList
          movies={popularSeries.slice(0, 12)}
          title="Popular series"
          category={Category.TV}
        />
      )}

      <footer className="flex w-full flex-col items-center justify-center">
        <p>
          Made with &#x1F49B; by{' '}
          <a
            href="https://github.com/ThreeTriumphCoders"
            className="font-medium transition-all hover:text-primary"
          >
            ThreeTriumphCoders
          </a>
        </p>
        <br />
        <a
          href="https://github.com/ThreeTriumphCoders/movies-entertainment-app#readme"
          className="font-medium transition-all hover:text-primary"
        >
          GitHub Repository
        </a>
      </footer>
    </>
  );
};

export default Home;
