import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback,useEffect,useState } from 'react';
import { Loader } from '~/components/Loader';
import { MovieSlider } from '~/components/MovieSlider';
import { MovieTrailerPopup } from '~/components/MovieTrailerPopup';
import { ReviewsSection } from '~/components/ReviewsSection';
import { SvgIcon } from '~/components/SvgIcon';
import { useBookmarksContext } from '~/contexts/useBookmarks';
import { Category } from '~/types/Category.enum';
import { type MovieType } from '~/types/Movie';
import { IconName,getIconByName } from '~/utils/getIconByName';
import { getImages,getMovie,getTrailerKey } from '~/utils/helpers';

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

const TVPage = () => {
  const { query } = useRouter();
  const movieId = query.movieId ? Number(query.movieId) : 0;
  const [tv, setTv] = useState<MovieType | null>(null);
  const [isPlayerOpened, setPlayerOpened] = useState(false);

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


  console.log(tv);
  return (
    <>
      {!isMovieLoadingError && tv ? (
        <section>
          <h1 className="mb-2 text-xl font-light sm:mb-4 sm:text-3xl">
            {tv.name}
          </h1>

          <div className="mb-2 flex gap-1.5 text-[11px] font-light leading-[14px] opacity-75 sm:mb-4 sm:text-[13px] sm:leading-4">
            <p>{date}</p>
            {separator}
            <div className="flex items-center gap-1">
              <SvgIcon className="h-2.5 w-2.5 fill-light">
                {getIconByName(IconName.TV)}
              </SvgIcon>

              <p>TV Serie</p>
            </div>
          </div>

          <div className="grid gap-x-12 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative mb-8 overflow-hidden lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2">
              {moreImagePaths.length && !isImagesError ? (
                <MovieSlider imagesPaths={...moreImagePaths} />
              ) : (
                <div
                  className="
                      absolute bottom-[1px] left-[1px] right-[1px]
                      top-[1px] flex items-center
                      justify-center bg-semi-dark text-2xl
                      text-light
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
                    text-md relative flex h-10 w-full items-center justify-center gap-2
                    rounded-lg bg-primary transition hover:bg-semi-dark text-light
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
                        className="h-5 w-5 fill-light"
                        viewBox="0 0 20 20"
                      >
                        {getIconByName(IconName.BOOKMARK)}
                      </SvgIcon>
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </>
                  )}
                </button>

                {trailerKey && (
                  <button
                    className="
                      text-md relative flex h-10 w-full items-center justify-center gap-2
                      rounded-lg  bg-[#ff0000] transition hover:bg-semi-darktext-light
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

              <h3 className="mb-4 text-lg font-medium text-light">
                Description
              </h3>

              <p className="mb-8 font-light">{tv.overview || 'No description'}</p>

              <h3 className="mb-4 text-lg font-medium">Status</h3>

              <p className="mb-8 font-light">{tv.status}</p>

              <h3 className="mb-4 text-lg font-medium">
                Original language
              </h3>

              <p className="mb-8 font-light">
                {tv.original_language}
              </p>

              <h3 className="mb-4 text-lg font-medium">Rating</h3>

              <div className="mb-8 flex gap-3">
                <div>
                  <div className="flex items-center gap-1">
                    <div
                      className={classNames('h-2 w-2 rounded-full', {
                        'bg-[#7ED061]': tv.vote_average > 7.4,
                        'bg-[#FFF961]':
                          tv.vote_average > 4.9 && tv.vote_average < 7.5,
                        'bg-[#E84545]': tv.vote_average < 5,
                      })}
                    />
                    <p className="font-light">
                      {tv.vote_average.toFixed(1)}
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
                    <p className="font-light">No votes</p>
                  </div>
                </div>
                <div>
                  <p className="font-light">TMDB</p>
                  <p className="font-light">Movies Ent.</p>
                </div>
              </div>

              <h3 className="mb-4 text-lg font-medium">Genres</h3>
              <p className="mb-8 font-light text-light">
                {tv.genres
                  .reduce((acc, genre) => {
                    return acc + genre.name + ', ';
                  }, '')
                  .slice(0, -2)}
              </p>

              <h3 className="mb-4 text-lg font-medium">Seasons</h3>
              <table className='text-left w-3/4 sm:w-1/2 lg:w-full'>
                <tr className='text-sm'>
                  <th className='pr-8'>Name</th>
                  <th className='pr-3'>Series count</th>
                  <th>Release date</th>
                </tr>
                {tv.seasons?.map(season => (
                  <tr key={season.id}>
                    <td>{season.name}</td>
                    <td>{season.episode_count}</td>
                    <td>{season.air_date}</td>
                  </tr>
                ))}
              </table>
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
