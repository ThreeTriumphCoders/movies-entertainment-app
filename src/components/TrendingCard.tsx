import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect,useState,type FC } from 'react';
import { useBookmarksContext } from '~/contexts/useBookmarks';
import { Category } from '~/types/Category.enum';
import { IconName,getIconByName } from '~/utils/getIconByName';
import { SvgIcon } from './SvgIcon';

type Props = {
  movieId?: number;
  imagePath?: string;
  title?: string;
  releaseDate?: string;
  categoryIcon?: IconName;
  category?: Category;
  isBookmarkedInitial?: boolean;
  onBookmarksAdd?: (id: number, type: Category) => void;
  onBookmarksRemove?: (id: number) => void;
};

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

export const TrendingCard: FC<Props> = ({
  movieId = 0,
  imagePath = '',
  title = '',
  releaseDate = '',
  categoryIcon = IconName.NONE,
  category = Category.MOVIE,
  isBookmarkedInitial,
  onBookmarksAdd,
  onBookmarksRemove,
}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  const { currentId, bookmarks, isInBookmarks } = useBookmarksContext();

  useEffect(() => {
    setIsBookmarked(isInBookmarks(movieId));
  }, [bookmarks]);


  const handleBookmarkClick = () => {
    if (
      sessionData?.user &&
      currentId !== movieId &&
      onBookmarksAdd &&
      onBookmarksRemove
    ) {
      if (isBookmarked) {
        onBookmarksRemove(movieId);
        setIsBookmarked(false);
      } else {
        onBookmarksAdd(movieId, category);
        setIsBookmarked(true);
      }
    } else {
      void router.push('/signin');
    }
  };

  if (!movieId) {
    return (
      <div className="min-w-[230px] snap-start sm:min-w-[410px] lg:min-w-[470px]">
        <div className="relative overflow-hidden rounded-lg pt-[50%]">
          <div className="absolute bottom-0 left-0 right-0 top-0 animate-pulse bg-semi-dark" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-w-[230px] snap-start sm:min-w-[410px] lg:min-w-[470px]">
      <Link
        href={category === Category.MOVIE ? `/movie/${movieId}` : `/serie/${movieId}`}
        className="min-w-[230px] snap-start sm:min-w-[410px] lg:min-w-[470px]"
      >
        <div className="relative overflow-hidden rounded-lg pt-[50%]">
          <>
            <Image
              className="object-cover duration-1000 hover:scale-110"
              alt="movie image"
              fill
              priority
              sizes="(max-width: 640px) 50vw, 33vw"
              src={`https://www.themoviedb.org/t/p/original${imagePath}`}
            />

            <div className="absolute bottom-2 left-2 rounded-md bg-dark bg-opacity-50 p-2">
              <div className="mb-1 flex gap-1.5 text-[11px] font-light leading-[14px] text-light opacity-75 sm:text-[13px] sm:leading-4">
                <p>{releaseDate.slice(0, 4)}</p>

                {separator}

                <div className="flex items-center gap-1">
                  <SvgIcon className="h-2.5 w-2.5 fill-light">
                    {getIconByName(categoryIcon)}
                  </SvgIcon>

                  <p>
                    {categoryIcon === IconName.MOVIE ? 'Movie' : 'TV Serie'}
                  </p>
                </div>
              </div>

              <h3 className="text-sm font-medium leading-[18px] sm:text-lg sm:leading-6">
                {title}
              </h3>
            </div>
          </>
        </div>
      </Link>

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
    </div>
  );
};
