import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '~/components/Loader';
import { MovieSlider } from '~/components/MovieSlider';
import { MovieTrailerPopup } from '~/components/MovieTrailerPopup';
import { ReviewsSection } from '~/components/ReviewsSection';
import { SvgIcon } from '~/components/SvgIcon';
import { useBookmarksContext } from '~/contexts/useBookmarks';
import { Category } from '~/types/Category.enum';
import { type MovieType } from '~/types/Movie';
import { ThemeType } from '~/types/ThemeType';
import { useThemeContext } from '~/utils/ThemeContext';
import { IconName, getIconByName } from '~/utils/getIconByName';
import { getImages, getMovie, getTrailerKey } from '~/utils/helpers';

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

const MoviePage = () => {
  const { query } = useRouter();
  const movieId = query.movieId ? Number(query.movieId) : 0;
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isPlayerOpened, setPlayerOpened] = useState(false);
  const { themeType } = useThemeContext();

  const { isError: isMovieLoadingError } = useQuery({
    queryKey: [`${movieId}-movie`],
    queryFn: () => getMovie(movieId, Category.MOVIE),
    onSuccess: (data) => setMovie(data),
  });

  const { data: trailerKey = '' } = useQuery({
    queryKey: [`${movieId}-trailerKey`],
    queryFn: () => getTrailerKey(movieId, Category.MOVIE),
  });

  const { isError: isImagesError, data: moreImagePaths = [] } = useQuery({
    queryKey: [`${String(movieId)}-images`],
    queryFn: () => getImages(movieId, Category.MOVIE),
  });

  const { data: sessionData } = useSession();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {
    currentId,
    bookmarks,
    isInBookmarks,
    addToBookmarks,
    deleteFromBookmarks,
  } = useBookmarksContext();

  useEffect(() => {
    setIsBookmarked(isInBookmarks(movieId));
  }, [bookmarks, movieId, isInBookmarks]);

  const handleBookmarkClick = () => {
    if (sessionData?.user) {
      if (isBookmarked) {
        deleteFromBookmarks(movieId);
      } else {
        addToBookmarks(movieId, Category.MOVIE);
      }
    } else {
      void router.push('/auth/signin');
    }
  };

  const handlePopup = useCallback(() => {
    setPlayerOpened((prev) => !prev);
  }, []);

  const date = movie?.release_date
    ? movie.release_date.slice(0, 4)
    : 'No release date';

  return (
    <>
      {!isMovieLoadingError && movie ? (
        <section>
          <h1
            className={`mb-2 text-xl font-light sm:mb-4 sm:text-3xl
          ${themeType === ThemeType.Dark ? 'text-light' : 'text-dark'}`}
          >
            {movie.title}
          </h1>

          <div className="mb-2 flex gap-1.5 text-[11px] font-light leading-[14px] opacity-75 sm:mb-4 sm:text-[13px] sm:leading-4">
            <p>{date}</p>
            {separator}
            <div className="flex items-center gap-1">
              <SvgIcon
                className={classNames('h-2.5 w-2.5', {
                  'fill-light': themeType === ThemeType.Dark,
                })}
              >
                {getIconByName(IconName.MOVIE)}
              </SvgIcon>

              <p>Movie</p>
            </div>
          </div>

          <div className="grid gap-x-12 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative mb-8 overflow-hidden rounded-xl pt-[56.25%] lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2">
              <div
                className="
                      absolute bottom-[1px] left-[1px] right-[1px]
                      top-[1px] flex items-center
                      justify-center bg-semi-dark text-2xl
                    "
              >
                {movie.poster_path ? (
                  <Image
                    className="object-contain transition-all duration-1000"
                    alt="movie image"
                    fill
                    priority
                    sizes={origin}
                    src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>

              {moreImagePaths.length !== 0 && !isImagesError && (
                <MovieSlider imagesPaths={...moreImagePaths} />
              )}
            </div>

            <div className="mb-10 max-w-2xl lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3 lg:mb-0">
              <div
                className="
                    mb-8 flex flex-col flex-wrap items-center
                    justify-between gap-[4%] gap-y-3 sm:flex-row
                  "
              >
                <button
                  className="
                    text-md relative flex h-10 w-full items-center justify-center gap-2
                    rounded-lg bg-primary text-light transition hover:bg-semi-dark
                    sm:w-[48%] lg:w-full
                    xl:w-[48%]
                    "
                  onClick={handleBookmarkClick}
                  disabled={currentId === movieId}
                >
                  {currentId === movieId ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-light border-b-primary"></div>
                    </>
                  ) : (
                    <>
                      <SvgIcon
                        className={`h-[32px] w-[32px] cursor-pointer  stroke-light stroke-[1.5] 
                          ${isBookmarked ? 'fill-light' : 'fill-none'}`}
                        viewBox="-10 -9 38 38"
                      >
                        {getIconByName(IconName.BOOKMARK)}
                      </SvgIcon>
                      {isBookmarked ? 'Іn bookmarks' : 'Bookmark'}
                    </>
                  )}
                </button>

                {trailerKey && (
                  <button
                    className="
                      text-md relative flex h-10 w-full items-center justify-center gap-2
                      rounded-lg  bg-[#ff0000] text-light transition hover:bg-semi-dark
                      sm:w-[48%] lg:w-full 
                      xl:w-[48%]
                      "
                    onClick={handlePopup}
                  >
                    <SvgIcon className="h-7 w-7 fill-light" viewBox="0 0 32 32">
                      {getIconByName(IconName.YT)}
                    </SvgIcon>
                    Watch&nbsp;trailer
                  </button>
                )}
              </div>

              <h3 className="mb-4 text-lg font-medium">Description</h3>

              <p className="mb-8 font-light">{movie.overview}</p>

              <h3 className="mb-4 text-lg font-medium">Status</h3>

              <p className="mb-8 font-light">{movie.status}</p>

              <h3 className="mb-4 text-lg font-medium">Original language</h3>

              <p className="mb-8 font-light">{movie.original_language}</p>

              <h3 className="mb-4 text-lg font-medium">Rating</h3>

              <div className="mb-8 flex gap-3">
                <div>
                  <div className="flex items-center gap-1">
                    <div
                      className={classNames('h-2 w-2 rounded-full', {
                        'bg-[#3B931C]': movie.vote_average > 7.4,
                        'bg-[#FFF961]':
                          movie.vote_average > 4.9 && movie.vote_average < 7.5,
                        'bg-[#E84545]': movie.vote_average < 5,
                      })}
                    />
                    <p className="font-light">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    {/* <div
                        className={classNames(
                          'w-2 h-2 rounded-full',
                          {
                            'bg-[#3B931C]': rating > 7.4,
                            'bg-[#FFF961]': rating > 4.9 && rating < 7.5,
                            'bg-[#E84545]': rating < 5,
                          },
                        )}
                      />
                      <p className="font-light text-light text-sm">9.0</p> */}
                    <p className="font-light">No votes</p>
                  </div>
                </div>
                <div>
                  <p className="font-light">TMDB</p>
                  <p className="font-light">Movies Ent.</p>
                </div>
              </div>

              <h3 className="font-mediumt mb-4 text-lg">Genres</h3>
              <p className="mb-8 font-light">
                {movie.genres
                  .reduce((acc, genre) => {
                    return acc + genre.name + ', ';
                  }, '')
                  .slice(0, -2)}
              </p>

              <h3 className="mb-4 text-lg font-medium">Duration</h3>
              <p className="font-light">{movie.runtime} min.</p>
            </div>

            <div className="lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
              <ReviewsSection />
            </div>
          </div>

          {isPlayerOpened && (
            <MovieTrailerPopup trailerKey={trailerKey} onClose={handlePopup} />
          )}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MoviePage;
