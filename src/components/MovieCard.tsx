import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState, type FC } from 'react';
import { useBookmarksContext } from '~/contexts/useBookmarks';
import { Category } from '~/types/Category.enum';
import { IconName, getIconByName } from '~/utils/getIconByName';
import { getImages, getTrailerKey } from '~/utils/helpers';
import { Loader } from './Loader';
import { SvgIcon } from './SvgIcon';
import { useThemeContext } from '~/utils/ThemeContext';
import { ThemeType } from '~/types/ThemeType';

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
  title = 'No movie title',
  releaseDate = 'No release date',
  categoryIcon = IconName.MOVIE,
  category,
  playingId,
  isBookmarkedInitial,
  onPlayingChange,
  onBookmarksAdd,
  onBookmarksRemove,
}) => {
  const { themeType } = useThemeContext();

  const { data: newTrailerKey = '' } = useQuery({
    queryKey: [`${movieId}-trailerKey`],
    queryFn: () => getTrailerKey(movieId, category),
  });

  const { isError: isImagesError, data: moreImagePaths = [] } = useQuery({
    queryKey: [`${movieId}-images`],
    queryFn: () => getImages(movieId, category),
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isPlaying = playingId === movieId;
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const changeCurrentImageIndex = () => {
    setCurrentImageIndex((index) =>
      index === moreImagePaths.length - 1 ? 0 : index + 1,
    );
  };

  const startSlidesAnimation = () => {
    if (!isImagesError && moreImagePaths.length > 0) {
      setTimeout(() => {
        changeCurrentImageIndex();
      }, 500);

      intervalRef.current = setInterval(() => {
        changeCurrentImageIndex();
      }, 3000);
    }
  };

  const stopSlidesAnimation = () => {
    clearInterval(intervalRef.current as NodeJS.Timer);
  };

  const { data: sessionData } = useSession();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  const { currentId, bookmarks, isInBookmarks } = useBookmarksContext();

  useEffect(() => {
    setIsBookmarked(isInBookmarks(movieId));
  }, [bookmarks]);

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
      void router.push('/auth/signin');
    }
  };

  return (
    <div
      className="min-w-[140px] sm:min-w-[180px] lg:min-w-[250px]"
      onMouseEnter={startSlidesAnimation}
      onMouseLeave={stopSlidesAnimation}
    >
      <div
        id="image-container"
        className="relative mb-2 overflow-hidden rounded-lg pt-[56.25%]"
      >
        <>
          <div className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] animate-pulse  bg-semi-dark" />

          {!imagePath && (
            <div
              className="
                absolute bottom-[1px] left-[1px] right-[1px] top-[1px] 
                flex items-center
                justify-center bg-semi-dark text-2xl
                text-light
              "
            >
              No image
            </div>
          )}

          {!isPlaying &&
            moreImagePaths.map((path, index) => (
              <Image
                key={path}
                className={classNames(
                  'object-cover, transition-all duration-1000',
                  { 'opacity-0': index !== currentImageIndex },
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
              absolute bottom-0 left-0 right-0 top-0
              flex items-center justify-center bg-dark bg-opacity-50
              opacity-0 transition-opacity hover:opacity-100
            "
          >
            {newTrailerKey ? (
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

                <p className='text-light'>Play</p>
              </div>
            ) : (
              <div className="flex w-fit justify-center rounded-full bg-light bg-opacity-25 px-4 py-2 text-lg">
                <p className="text-medium">No trailer</p>
              </div>
            )}
          </div>

          <div
            className={classNames(
              'hover: absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-dark bg-opacity-50 opacity-100 transition hover:bg-light  sm:right-4 sm:top-4',
              {
                'pointer-events-none opacity-25': currentId === movieId,
              },
            )}
          >
            <button onClick={handleBookmarkClick}>
              <SvgIcon
                className={classNames(
                  'h-[32px] w-[32px] cursor-pointer fill-none stroke-light stroke-[1.5] hover:stroke-dark active:fill-light',
                  {
                    'fill-primary stroke-primary hover:stroke-primary':
                      isBookmarked,
                  },
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

              {newTrailerKey ? (
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${newTrailerKey}?showinfo=0&autoplay=1&controls=0&enablejsapi=1&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div>{'No trailer :('}</div>
              )}
            </div>
          )}
        </>
      </div>

      <div className="mb-1 flex gap-1.5 text-[11px] font-light leading-[14px] opacity-75 sm:text-[13px] sm:leading-4">
        <p>{releaseDate.slice(0, 4)}</p>

        <p className="-translate-y-1/4 select-none font-semibold opacity-60">
          .
        </p>

        <div className="flex items-center gap-1">
          <SvgIcon 
            className={classNames(
              "h-2.5 w-2.5 fill-light",
              { 'fill-semi-dark': themeType === ThemeType.Light }
            )}
          >
            {getIconByName(categoryIcon)}
          </SvgIcon>

          <p>{categoryIcon === IconName.MOVIE ? 'Movie' : 'TV Serie'}</p>
        </div>
      </div>

      <h3 className="text-sm font-medium leading-[18px] sm:text-lg sm:leading-6">
        <Link href={category === Category.MOVIE ? `/movie/${movieId}` : `/tv/${movieId}`}>{title}</Link>
      </h3>
    </div>
  );
};
