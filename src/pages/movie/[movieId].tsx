import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '~/components/Loader';
import { MovieSlider } from '~/components/MovieSlider';
import { MovieTrailerPopup } from '~/components/MovieTrailerPopup';
import { ReviewsSection } from '~/components/ReviewsSection';
import { SvgIcon } from '~/components/SvgIcon';
import { type MovieType } from '~/types/Movie';
import { IconName, getIconByName } from '~/utils/getIconByName';
import { getImages, getMovie, getTrailerKey } from '~/utils/helpers';

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

const MoviePage = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [error, setError] = useState(false); //! handle this error
  const [trailerKey, setTrailerKey] = useState('');
  const [isPlayerOpened, setPlayerOpened] = useState(false);
  const [additionalImagePaths, setAdditionalImagePaths] = useState<string[]>(
    [],
  );
  const { query } = useRouter();

  useEffect(() => {
    const getMovieFromServer = async () => {
      if (query.movieId) {
        const movieFromServer = await getMovie(+query.movieId);
        setMovie(movieFromServer);
      }
    };

    const getData = async () => {
      try {
        if (query.movieId) {
          const key = await getTrailerKey(+query.movieId);
          const imagesPaths = await getImages(+query.movieId);

          setAdditionalImagePaths(imagesPaths);
          setTrailerKey(key);
        }
      } catch (err) {
        setError(true);
        setTrailerKey('');
      }
    };

    getData().catch(console.log);
    getMovieFromServer().catch(console.log);
  }, [query]);

  const handlePopup = useCallback(() => {
    setPlayerOpened((prev) => !prev);
  }, []);

  const date = movie?.release_date
    ? movie.release_date.slice(0, 4)
    : 'No release date';

  return (
    <>
      {movie ? (
        <section>
          <h1 className="mb-2 text-xl font-light text-light sm:mb-4 sm:text-3xl">
            {movie.original_title}
          </h1>

          <div className="mb-2 flex gap-1.5 text-[11px] font-light leading-[14px] text-light opacity-75 sm:mb-4 sm:text-[13px] sm:leading-4">
            <p>{date}</p>
            {separator}
            <div className="flex items-center gap-1">
              <SvgIcon className="h-2.5 w-2.5 fill-light">
                <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z" />
              </SvgIcon>

              <p>Movie</p>
            </div>
          </div>

          <div className="grid gap-x-12 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative mb-8 overflow-hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2">
              {additionalImagePaths ? (
                <MovieSlider imagesPaths={...additionalImagePaths} />
              ) : (
                <div
                  className="
                      bottom-[1px] left-[1px] right-[1px] top-[1px]
                      flex items-center
                      justify-center bg-semi-dark text-2xl
                    "
                >
                  No image
                </div>
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
                      text-md relative flex w-full items-center justify-center rounded-lg
                    bg-primary py-2 pl-12 pr-5 transition hover:bg-semi-dark hover:text-light
                    sm:w-[48%] lg:w-full lg:text-xl
                    xl:w-[48%]
                    "
                >
                  <SvgIcon
                    className="absolute left-4 h-5 w-5 fill-light"
                    viewBox="0 0 20 20"
                  >
                    {getIconByName(IconName.BOOKMARK)}
                  </SvgIcon>
                  Add&nbsp;to&nbsp;bookmarks {/* Or "In bookmarks" */}
                </button>

                {trailerKey && (
                  <button
                    className="
                        text-md relative flex w-full items-center justify-center rounded-lg
                      bg-[#ff0000] py-2 pl-12 pr-5 transition hover:bg-semi-dark hover:text-light
                      sm:w-[48%] lg:w-full lg:text-xl
                        xl:w-[48%]
                      "
                    onClick={handlePopup}
                  >
                    <SvgIcon
                      className="absolute left-3 h-7 w-7 fill-light"
                      viewBox="0 0 32 32"
                    >
                      {getIconByName(IconName.YT)}
                    </SvgIcon>
                    Watch&nbsp;trailer
                  </button>
                )}
              </div>

              <h3 className="mb-4 text-lg font-medium text-light">
                Description
              </h3>

              <p className="mb-8 text-sm font-light text-light">
                {movie.overview}
              </p>

              <h3 className="mb-4 text-lg font-medium text-light">Status</h3>

              <p className="mb-8 text-sm font-light text-light">
                {movie.status}
              </p>

              <h3 className="mb-4 text-lg font-medium text-light">
                Original language
              </h3>

              <p className="mb-8 text-sm font-light text-light">
                {movie.original_language}
              </p>

              <h3 className="mb-4 text-lg font-medium text-light">Rating</h3>

              <div className="mb-8 flex gap-3">
                <div>
                  <div className="flex items-center gap-1">
                    <div
                      className={classNames('h-2 w-2 rounded-full', {
                        'bg-[#7ED061]': movie.vote_average > 7.4,
                        'bg-[#FFF961]':
                          movie.vote_average > 4.9 && movie.vote_average < 7.5,
                        'bg-[#E84545]': movie.vote_average < 5,
                      })}
                    />
                    <p className="text-sm font-light text-light">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    {/* <div
                        className={classNames(
                          'w-2 h-2 rounded-full',
                          {
                            'bg-[#7ED061]': rating > 7.4,
                            'bg-[#FFF961]': rating > 4.9 && rating < 7.5,
                            'bg-[#E84545]': rating < 5,
                          },
                        )}
                      />
                      <p className="font-light text-light text-sm">9.0</p> */}
                    <p className="text-sm font-light text-light">No votes</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-light text-light">TMDB</p>
                  <p className="text-sm font-light text-light">Movies Ent.</p>
                </div>
              </div>

              <h3 className="mb-4 text-lg font-medium text-light">Genres</h3>
              <p className="mb-8 text-sm font-light text-light">
                {movie.genres
                  .reduce((acc, genre) => {
                    return acc + genre.name + ', ';
                  }, '')
                  .slice(0, -2)}
              </p>

              <h3 className="mb-4 text-lg font-medium text-light">Duration</h3>
              <p className="text-sm font-light text-light">
                {movie.runtime} min.
              </p>
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
