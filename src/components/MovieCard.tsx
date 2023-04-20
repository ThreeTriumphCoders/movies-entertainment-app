import Image from "next/image";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useEffect, type FC, useState } from "react";
import { Loader } from "./Loader";
import fallbackImage from "../../public/images/fallbackImage.png";
import { getMovieImages, getTrailerKey } from "~/utils/helpers";

const getIconByCategory = (category: Category) => {
  switch (category) {
    case Category.MOVIE:
      return (
        <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z" />
      );

    case Category.TV:
      return (
        <path d="M9.08 4.481H20V20H0V4.481h4.92l-2.7-3.278L3.78.029 7 3.91 10.22 0l1.56 1.203-2.7 3.278ZM2 6.421v11.64h10V6.42H2Zm15 7.76h-2v-1.94h2v1.94Zm-2-3.88h2V8.36h-2v1.94Z" />
      );
    default:
      return;
  }
};

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

export enum Category {
  MOVIE = "Movie",
  TV = "TV Serie",
}

type Props = {
  movieId: number;
  imagePath: string;
  title: string;
  releaseDate: string;
  category: Category;
  playingId: number;
  onPlayingChange: (id: number) => void;
};

export const MovieCard: FC<Props> = ({
  movieId = 0,
  imagePath = "/jL6B8mm9TR8vmh9VtgEg0GC7jPy.jpg",
  title = "No movie title",
  releaseDate = "No release date",
  category = Category.MOVIE,
  playingId,
  onPlayingChange,
}) => {
  const isPlaying = playingId === movieId;
  const [error, setError] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string>("");
  const [additionalImagePaths, setAdditionalImagePaths] = useState<string[]>(
    []
  );

  /**
   * TODO: change card images on hover using additionalImagePaths
   */

  useEffect(() => {
    const getData = async () => {
      try {
        const key = await getTrailerKey(movieId);
        const imagesPaths = await getMovieImages(movieId);

        setAdditionalImagePaths(imagesPaths);
        setTrailerKey(key);
      } catch (err) {
        setError(true);
        setTrailerKey("");
      }
    };

    getData().catch(console.log);
  }, []);

  return (
    <div className="min-w-[140px] sm:min-w-[180px] lg:min-w-[250px]">
      <div className="relative mb-2 overflow-hidden rounded-lg pt-[56.25%]">
        <>
          <Image
            className="object-cover"
            alt="movie image"
            onClick={() => onPlayingChange(movieId)}
            fill
            priority
            src={
              imagePath
                ? `https://www.themoviedb.org/t/p/original${imagePath}`
                : fallbackImage
            }
            sizes="(max-width: 640px) 50vw, 33vw"
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
                onClick={() => onPlayingChange(movieId)}
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

      <div className="mb-1 flex gap-1.5 text-[11px] font-light leading-[14px] text-light opacity-75 sm:text-[13px] sm:leading-4">
        <p>{releaseDate.slice(0, 4)}</p>
        {separator}
        <div className="flex items-center gap-1">
          <SvgIcon className="h-2.5 w-2.5 fill-light">
            {getIconByCategory(category)}
          </SvgIcon>

          <p>{category}</p>
        </div>
        {separator}
        <p>E</p> {/* age rating */}
      </div>

      <h3 className='text-sm sm:text-lg leading-[18px] sm:leading-6 font-medium'>
        <Link href={`/movie/${movieId}`}>
          {title}
        </Link>
      </h3>
    </div>
  );
};
