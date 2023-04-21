import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SvgIcon } from "~/components/SvgIcon";
import { type MovieType } from "~/types/Movie";
import { getMovie } from "~/utils/helpers";
import Image from "next/image";
import fallbackImage from "../../../public/images/fallbackImage.png";
import { Loader } from "~/components/Loader";
import { getMovieImages, getTrailerKey } from "~/utils/helpers";
import { ReviewsSection } from "~/components/ReviewsSection";
import classNames from "classnames";

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

const MoviePage = () => {
  const [movie, setMovie] = useState<MovieType | null>(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [additionalImagePaths, setAdditionalImagePaths] = useState<string[]>(
    []
  );
  const { query } = useRouter();

  useEffect(() => {
    const getMovieFromServer = async () => {
      if (query.movieId) {
        const movieFromServer = await getMovie(+query.movieId);
        setMovie(movieFromServer);
        console.log(movieFromServer);
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

  return (
    <>
      {movie
        ? (
          <section>
            <h1 className="font-light text-xl sm:text-3xl text-light mb-2 sm:mb-4">
              {movie.original_title}
            </h1>

            <div className="mb-2 sm:mb-4 flex gap-1.5 text-[11px] font-light leading-[14px] text-light opacity-75 sm:text-[13px] sm:leading-4">
              <p>{movie.release_date.slice(0, 4)}</p>
              {separator}
              <div className="flex items-center gap-1">
                <SvgIcon className="h-2.5 w-2.5 fill-light">
                  <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z" />
                </SvgIcon>

                <p>Movie</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-x-14 gap-y-10 lg:gap-y-0">
              <div className="lg:w-2/3">
                <div>
                  <div className="relative mb-2 overflow-hidden rounded-lg pt-[56.25%]">
                    <>
                      <Image
                        alt="movie image"
                        onClick={() => setIsPlaying(true)}
                        priority
                        src={
                          movie.backdrop_path
                            ? `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`
                            : fallbackImage
                        }
                        fill
                      />

                      <div
                        className="
                          absolute bottom-0 left-0
                          right-0 top-0 
                          flex items-center justify-center bg-dark bg-opacity-50
                          opacity-0 transition-opacity hover:opacity-100
                        "
                      >
                        {!error ? (
                          <div
                            className="flex w-fit cursor-pointer gap-5 rounded-full bg-light bg-opacity-25 p-2 pr-6 text-lg"
                            onClick={() => setIsPlaying(true)}
                          >
                            <SvgIcon
                              className="h-[30px] w-[30px] fill-light"
                              viewBox="0 0 30 30"
                            >
                              <path d="M0 15C0 6.713 6.713 0 15 0c8.288 0 15 6.713 15 15 0 8.288-6.712 15-15 15-8.287 0-15-6.712-15-15Zm21-.5L12 8v13l9-6.5Z" />
                            </SvgIcon>

                            <p>Play</p>
                          </div>
                        ) : (
                          <div className="flex w-fit justify-center rounded-full bg-light bg-opacity-25 px-4 py-2 text-lg">
                            <p className="text-medium">No trailer</p>
                          </div>
                        )}
                      </div>

                      <div
                        className="
                          hover: absolute right-2 top-2 flex
                          h-8 w-8
                          items-center justify-center rounded-full
                          bg-dark bg-opacity-50
                          opacity-100 transition hover:bg-light 
                          sm:right-4 sm:top-4
                        "
                      >
                        <SvgIcon
                          className="
                            h-[32px] w-[32px]
                            cursor-pointer fill-none
                            stroke-light
                            stroke-[1.5] hover:stroke-dark
                            active:fill-light
                          "
                          viewBox="-9 -8 30 30"
                        >
                          <path d="m10.711.771.01.004.01.005c.068.027.108.06.14.107.032.048.046.09.046.15v11.927a.243.243 0 0 1-.046.15.282.282 0 0 1-.14.106l-.007.004-.008.003a.29.29 0 0 1-.107.014.326.326 0 0 1-.24-.091L6.356 9.235l-.524-.512-.524.512-4.011 3.915a.327.327 0 0 1-.24.1.244.244 0 0 1-.103-.021l-.01-.004-.01-.005a.281.281 0 0 1-.139-.107.244.244 0 0 1-.046-.15V1.037c0-.058.014-.101.046-.15A.281.281 0 0 1 .935.78l.01-.005.01-.004A.245.245 0 0 1 1.057.75h9.552c.038 0 .07.007.102.021Z" />
                        </SvgIcon>
                      </div>

                      {isPlaying && (
                        <div className="absolute top-0 w-full max-w-full pt-[56.25%]">
                          <Loader />

                          {!error ? (
                            <iframe
                              className="absolute left-0 top-0 h-full w-full"
                              src={`https://www.youtube.com/embed/${trailerKey}?showinfo=0&autoplay=1&controls=0&enablejsapi=1&modestbranding=1`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <div>{"No trailer :("}</div>
                          )}
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>

              <div className="sm:w-4/5 lg:w-1/4 mb-8">
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

              <div className="w-full xl:-translate-y-1/3 lg:-translate-y-3/4">
                <ReviewsSection />
              </div>
            </div>
          </section>
        )
        : <Loader />}
    </>
  );
};

export default MoviePage;
