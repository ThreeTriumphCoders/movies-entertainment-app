import Image from "next/image";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useEffect, type FC, useState } from "react";
import { Loader } from "./Loader";
import fallbackImage from "../../public/images/fallbackImage.png";
import { getMovieImages, getTrailerKey } from "~/utils/helpers";
import { getIconByName, IconName } from "~/utils/getIconByName";

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

type Props = {
  movieId: number;
  imagePath: string;
  title: string;
  releaseDate: string;
  category: IconName;
  playingId: number;
  onPlayingChange: (id: number) => void;
};

export const MovieCard: FC<Props> = ({
  movieId = 0,
  imagePath,
  title = "No movie title",
  releaseDate = "No release date",
  category = IconName.MOVIE,
  playingId,
  onPlayingChange,
}) => {
  const isPlaying = playingId === movieId;
  const [error, setError] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
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
          <div className="top-[1px] bottom-[1px] right-[1px] left-[1px] absolute bg-semi-dark animate-pulse"/>

          {!isPlaying && (
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
          )}

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
                className="flex w-fit cursor-pointer gap-5 rounded-full bg-light bg-opacity-25 hover:bg-opacity-50 p-2 pr-6 text-lg transition"
                onClick={() => onPlayingChange(movieId)}
              >
                <SvgIcon
                  className="h-[30px] w-[30px] fill-light"
                  viewBox="0 0 30 30"
                >
                  {getIconByName(IconName.PLAY)}
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
              viewBox="-10 -9 38 38"
            >
              {getIconByName(IconName.BOOKMARK)}
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
            {getIconByName(category)}
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
