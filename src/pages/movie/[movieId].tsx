import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SvgIcon } from "~/components/SvgIcon";
import { type MovieType } from "~/types/Movie";
import { getMovie } from "~/utils/helpers";
import { Loader } from "~/components/Loader";
import { getMovieImages, getTrailerKey } from "~/utils/helpers";
import { ReviewsSection } from "~/components/ReviewsSection";
import classNames from "classnames";
import { MovieSlider } from "~/components/MovieSlider";
import { IconName, getIconByName } from "~/utils/getIconByName";

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

const MoviePage = () => {
  const [movie, setMovie] = useState<MovieType | null>(null)
  const [error, setError] = useState(false); //! handle this error
  const [trailerKey, setTrailerKey] = useState("");
  const [isPlayerOpened, setPlayerOpened] = useState(false);
  const [additionalImagePaths, setAdditionalImagePaths] = useState<string[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    const getMovieFromServer = async () => {
      if (query.movieId) {
        const movieFromServer = await getMovie(+query.movieId);
        setMovie(movieFromServer);
      }
    }

    const getData = async () => {
      try {
        if (query.movieId) {
          const key = await getTrailerKey(+query.movieId);
          const imagesPaths = await getMovieImages(+query.movieId);
  
          setAdditionalImagePaths(imagesPaths);
          setTrailerKey(key);
        }
      } catch (err) {
        setError(true);
        setTrailerKey("");
      }
    };

    getData().catch(console.log);
    getMovieFromServer().catch(console.log);
  }, [query]);

  const date = movie?.release_date
  ? movie.release_date.slice(0, 4)
  : 'No release date'

  return (
    <>
      {movie
        ? (
          <section>
            <h1 className="font-light text-xl sm:text-3xl text-light mb-2 sm:mb-4">
              {movie.original_title}
            </h1>

            <div className="mb-2 sm:mb-4 flex gap-1.5 text-[11px] font-light leading-[14px] text-light opacity-75 sm:text-[13px] sm:leading-4">
              <p>{date}</p>
              {separator}
              <div className="flex items-center gap-1">
                <SvgIcon className="h-2.5 w-2.5 fill-light">
                  <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z" />
                </SvgIcon>

                <p>Movie</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-x-12">
              <div className="lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2 overflow-hidden mb-8 relative">
                {additionalImagePaths ? (
                  <MovieSlider imagesPaths={...additionalImagePaths} />
                ) : (
                  <div 
                    className="
                      top-[1px] bottom-[1px] right-[1px] left-[1px]
                      bg-semi-dark text-2xl
                      flex justify-center items-center
                    "
                  >
                    No image
                  </div>
                )}

                
              </div>

              <div className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3 mb-10 lg:mb-0 max-w-2xl">
                <div className="flex flex-col gap-3 sm:flex-row justify-between items-center mb-8">
                  <button
                    className="
                      flex justify-center items-center w-full
                    bg-primary py-2 px-5 text-md lg:text-xl rounded-lg
                    hover:bg-semi-dark hover:text-light transition
                    " //! maybe do it like wathc trailer button with text "add to bookmarks" or "in bookmarks"
                  >
                    {/* <SvgIcon
                      className="
                        h-[32px] w-[32px]
                        cursor-pointer fill-none
                        stroke-dark
                        stroke-[1.5] hover:stroke-dark
                        active:fill-light
                      "
                      viewBox="-10 -9 38 38"
                    >
                      {getIconByName(IconName.BOOKMARK)}
                    </SvgIcon> */}

                    Add to bookmarks
                  </button>

                  {trailerKey && (
                    <button 
                      className="
                        flex justify-center items-center w-full
                      bg-primary py-2 px-5 text-md lg:text-xl rounded-lg
                      hover:bg-semi-dark hover:text-light transition
                      "
                      onClick={() => setPlayerOpened(true)}
                    >
                      Watch trailer
                    </button>
                  )}
                </div>

                <h3 className="font-medium text-light text-lg mb-4">
                  Description
                </h3>

                <p className="font-light text-light text-sm mb-8">
                  {movie.overview}
                </p>

                <h3 className="font-medium text-light text-lg mb-4">
                  Status
                </h3>

                <p className="font-light text-light text-sm mb-8">
                  {movie.status}
                </p>

                <h3 className="font-medium text-light text-lg mb-4">
                  Original language
                </h3>

                <p className="font-light text-light text-sm mb-8">
                  {movie.original_language}
                </p>

                <h3 className="font-medium text-light text-lg mb-4">
                  Rating
                </h3>

                <div className="mb-8 flex gap-3">
                  <div>
                    <div className="flex gap-1 items-center">
                      <div
                        className={classNames(
                          'w-2 h-2 rounded-full',
                          {
                            'bg-[#7ED061]': movie.vote_average > 7.4,
                            'bg-[#FFF961]': movie.vote_average > 4.9 && movie.vote_average < 7.5,
                            'bg-[#E84545]': movie.vote_average < 5,
                          },
                        )}
                      />
                      <p className="font-light text-light text-sm">{movie.vote_average.toFixed(1)}</p>
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
                      <p className="font-light text-light text-sm">No votes</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-light text-light text-sm">TMDB</p>
                    <p className="font-light text-light text-sm">Movies Ent.</p>
                  </div>
                </div>

                <h3 className="font-medium text-light text-lg mb-4">
                  Genres
                </h3>
                <p className="font-light text-light text-sm mb-8">
                  {movie.genres.reduce((acc, genre) => {
                    return acc + genre.name + ', ';
                  }, '').slice(0, -2)}
                </p>

                <h3 className="font-medium text-light text-lg mb-4">
                  Duration
                </h3>
                <p className="font-light text-light text-sm">
                  {movie.runtime} min.
                </p>
              </div>

              <div className="lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                <ReviewsSection />
              </div>
            </div>

            {isPlayerOpened && (
              <div 
                className="
                  absolute top-0 bottom-0 left-0 right-0 
                bg-dark bg-opacity-75
                  flex items-center justify-center p-4 sm:p-20 lg:p-40
                "
                onClick={() => setPlayerOpened(false)}
              >
                <button
                  className="absolute top-4 right-4"
                >
                  <SvgIcon className="w-8 h-8 fill-light" viewBox="0 0 30 30">
                    {getIconByName(IconName.CLOSE)}
                  </SvgIcon>
                </button>

                <div className="relative w-full pt-[56.25%]">
                  <Loader />

                  <iframe
                    className="absolute h-full w-full top-0"
                    src={`https://www.youtube.com/embed/${trailerKey}?showinfo=0&autoplay=1&controls=0&enablejsapi=1&modestbranding=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </section>
        )
        : <Loader />}
    </>
  );
};

export default MoviePage;
