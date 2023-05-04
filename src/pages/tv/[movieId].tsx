import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { BookmarkButton } from '~/components/BookmarkButton';
import { InfoCut } from '~/components/InfoCut';
import { Loader } from '~/components/Loader';
import { MovieInfo } from '~/components/MovieInfo';
import { MoviePoster } from '~/components/MoviePoster';
import { MovieSlider } from '~/components/MovieSlider';
import { MovieTrailerPopup } from '~/components/MovieTrailerPopup';
import { ReviewsSection } from '~/components/ReviewsSection';
import { TrailerButton } from '~/components/TrailerButton';
import { useBookmarksContext } from '~/contexts/useBookmarks';
import { Category } from '~/types/Category.enum';
import { type MovieType } from '~/types/Movie';
import { useThemeContext } from '~/utils/ThemeContext';
import { IconName } from '~/utils/getIconByName';
import { getImages, getMovie, getTrailerKey } from '~/utils/helpers';

const TVPage = () => {
  const { query } = useRouter();
  const movieId = query.movieId ? Number(query.movieId) : 0;
  const [tv, setTv] = useState<MovieType | null>(null);
  const [isPlayerOpened, setPlayerOpened] = useState(false);
  const { themeType } = useThemeContext();

  const { isError: isMovieLoadingError } = useQuery({
    queryKey: [`${movieId}-tv`],
    queryFn: () => getMovie(movieId, Category.TV),
    onSuccess: (data) => setTv(data),
  });

  const { data: trailerKey = '' } = useQuery({
    queryKey: [`${movieId}-trailerKey`],
    queryFn: () => getTrailerKey(movieId, Category.TV),
  });

  const { isError: isImagesError, data: moreImagePaths = [] } = useQuery({
    queryKey: [`${String(movieId)}-images`],
    queryFn: () => getImages(movieId, Category.TV),
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
        addToBookmarks(movieId, Category.TV);
      }
    } else {
      void router.push('/auth/signin');
    }
  };

  const handlePopup = useCallback(() => {
    setPlayerOpened((prev) => !prev);
  }, []);

  const date = tv?.first_air_date
    ? tv.first_air_date.slice(0, 4)
    : 'No release date';

  return (
    <>
      {!isMovieLoadingError && tv ? (
        <section>
          <h1 className="mb-2 text-xl font-light sm:mb-4 sm:text-3xl">
            {tv.name}
          </h1>

          <div className="mb-2">
            <InfoCut year={date} type="TV Serie" icon={IconName.TV} />
          </div>

          <div className="grid gap-x-12 lg:grid-cols-3">
            <div className="relative mb-8 overflow-hidden rounded-xl pt-[56.25%] lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2">
              <MoviePoster poster_path={tv.poster_path} />

              {moreImagePaths.length !== 0 && !isImagesError && (
                <MovieSlider imagesPaths={...moreImagePaths} />
              )}
            </div>

            <div className="mb-10 max-w-2xl lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-7 lg:mb-0">
              <div
                className="
                    mb-8 flex flex-col flex-wrap items-center
                    justify-between gap-[4%] gap-y-3 sm:flex-row
                  "
              >
                <BookmarkButton
                  isBookmarked={isBookmarked}
                  handleBookmarkClick={handleBookmarkClick}
                  currentId={currentId}
                  movieId={movieId}
                />

                {trailerKey && <TrailerButton handlePopup={handlePopup} />}
              </div>

              <MovieInfo movie={tv} category={Category.TV} />
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

export default TVPage;
