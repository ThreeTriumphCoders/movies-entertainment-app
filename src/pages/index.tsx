import { useQuery } from '@tanstack/react-query';
import { type NextPage } from 'next';
import Head from 'next/head';
import { Movies } from '~/components/Movies';
import { MoviesMockup } from '~/components/MoviesMockup';
import { Trending } from '~/components/Trending';
import { MovieDB } from '~/controllers/movieDB';
import { Category } from '~/types/Category.enum';

const Home: NextPage = () => {
  const { data: popularMovies = [], isLoading: moviesLoading } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => MovieDB.getInstance().getPopular(1, Category.MOVIE),
  });

  const { data: popularSeries = [], isLoading: seriesLoading } = useQuery({
    queryKey: ['popularSeries'],
    queryFn: () => MovieDB.getInstance().getPopular(1, Category.TV),
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

      <Trending />

      {moviesLoading ? (
        <MoviesMockup title="Popular movies" />
      ) : (
        <Movies
          movies={popularMovies.slice(0, 12)}
          title="Popular movies"
          category={Category.MOVIE}
        />
      )}

      {seriesLoading ? (
        <MoviesMockup title="Popular series" />
      ) : (
        <Movies
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
