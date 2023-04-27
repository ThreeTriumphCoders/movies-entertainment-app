import Image from "next/image";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useEffect, type FC, useState, useRef } from "react";
import { Loader } from "./Loader";
import { getImages, getTrailerKey } from "~/utils/helpers";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useBookmarksContext } from "~/contexts/useBookmarks";
import { getIconByName, IconName } from "~/utils/getIconByName";
import { type Category } from "~/types/Category.enum";

type Props = {
  movieId: number;
  imagePath: string;
  title?: string;
  releaseDate?: string;
  categoryIcon: IconName;
  category: Category;
  playingId: number;
  isBookmarkedInitial: boolean;
  onPlayingChange: (id: number) => void;
  onBookmarksAdd: (id: number, type: Category) => void;
  onBookmarksRemove: (id: number) => void;
};

export const MovieCard: FC<Props> = ({
  movieId = 0,
  imagePath,
  title = "No movie title",
  releaseDate = "No release date",
  categoryIcon = IconName.MOVIE,
  category,
  playingId,
  isBookmarkedInitial,
  onPlayingChange,
  onBookmarksAdd,
  onBookmarksRemove,
}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [additionalImagePaths, setAdditionalImagePaths] = useState<string[]>(
    []
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  const isPlaying = playingId === movieId;
  const { currentId } = useBookmarksContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const key = await getTrailerKey(movieId, category);
        const imagesPaths = await getImages(movieId, category);

        setAdditionalImagePaths(imagesPaths);
        setTrailerKey(key);
      } catch (err) {
        setError(true);
        setTrailerKey("");
      }
    };

    getData().catch(console.log);
  }, [movieId, category]);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const changeCurrentImageIndex = () => {
    setCurrentImageIndex((index) =>
      index === additionalImagePaths.length - 1 ? 0 : index + 1
    );
  };

  const startSlidesAnimation = () => {
    setTimeout(() => {
      changeCurrentImageIndex();
    }, 500);

    intervalRef.current = setInterval(() => {
      changeCurrentImageIndex();
    }, 5000);
  };

  const stopSlidesAnimation = () => {
    clearInterval(intervalRef.current as NodeJS.Timer);
  };

  const handleBookmarkClick = () => {
    if (sessionData?.user) {
      if (isBookmarked) {
        onBookmarksRemove(movieId);
        setIsBookmarked(false);
      } else {
        onBookmarksAdd(movieId, category);
        setIsBookmarked(true);
      }
    } else {
      void router.push("/signin");
    }
  };

  return (
    <div
      className={classNames("min-w-[140px] sm:min-w-[180px] lg:min-w-[250px]", {
        "pointer-events-none opacity-25": currentId === movieId,
      })}
      onMouseEnter={startSlidesAnimation}
      onMouseLeave={stopSlidesAnimation}
    >
      <div
        id="image-container"
        className="relative mb-2 overflow-hidden rounded-lg pt-[56.25%]"
      >
        <>
          <div className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] animate-pulse bg-semi-dark" />

          {!imagePath && (
            <div
              className="
                absolute bottom-[1px] left-[1px] right-[1px] top-[1px] 
                flex items-center
                justify-center bg-semi-dark text-2xl
              "
            >
              No image
            </div>
          )}

          {!isPlaying &&
            additionalImagePaths.map((path, index) => (
              <Image
                key={path}
                className={classNames(
                  "object-cover, transition-all duration-1000",
                  { "opacity-0": index !== currentImageIndex }
                )}
                alt="movie image"
                onClick={() => onPlayingChange(movieId)}
                fill
                priority
                sizes="(max-width: 640px) 50vw, 33vw"
                src={`https://www.themoviedb.org/t/p/original${path}`}
              />
            ))}

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
                className="flex w-fit cursor-pointer gap-5 rounded-full bg-light bg-opacity-25 p-2 pr-6 text-lg transition hover:bg-opacity-50"
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
            <button onClick={handleBookmarkClick}>
              <SvgIcon
                className={classNames(
                  "h-[32px] w-[32px] cursor-pointer fill-none stroke-light stroke-[1.5] hover:stroke-dark active:fill-light",
                  {
                    "fill-primary stroke-primary hover:stroke-primary":
                      isBookmarked,
                  }
                )}
                viewBox="-10 -9 38 38"
              >
                {getIconByName(IconName.BOOKMARK)}
              </SvgIcon>
            </button>
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

        {currentId === movieId && <Loader />}
      </div>

      <div className="mb-1 flex gap-1.5 text-[11px] font-light leading-[14px] text-light opacity-75 sm:text-[13px] sm:leading-4">
        <p>{releaseDate.slice(0, 4)}</p>

        <p className="-translate-y-1/4 select-none font-semibold opacity-60">
          .
        </p>

        <div className="flex items-center gap-1">
          <SvgIcon className="h-2.5 w-2.5 fill-light">
            {getIconByName(categoryIcon)}
          </SvgIcon>

          <p>{categoryIcon === IconName.MOVIE ? "Movie" : "TV Serie"}</p>
        </div>
      </div>

      <h3 className="text-sm font-medium leading-[18px] sm:text-lg sm:leading-6">
        <Link href={`/movie/${movieId}`}>{title}</Link>
      </h3>
    </div>
  );
};
