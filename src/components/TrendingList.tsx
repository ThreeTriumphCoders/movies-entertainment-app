import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { Category } from '~/types/Category.enum';
import { type MovieType, type MoviesType } from '~/types/Movie';
import { type IconName } from '~/utils/getIconByName';
import { getTrending } from '~/utils/helpers';
import { TrendingCard } from './TrendingCard';

export const TrendingList = () => {
  const { isError: isMoviesError, data: trendingMovies = [] } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: () => getTrending(Category.MOVIE),
  });

  const { isError: isSeriesError, data: trendingSeries = [] } = useQuery({
    queryKey: ['trendingSeries'],
    queryFn: () => getTrending(Category.TV),
  });

  const trendings: MoviesType = _.shuffle<MovieType>([
    ...trendingMovies,
    ...trendingSeries,
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = scrollRef.current;

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const scroll = () => {
      const {
        scrollLeft = 0,
        scrollWidth = 0,
        clientWidth = 0,
      } = scrollRef.current as HTMLDivElement;

      const isEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) < 5;

      if (isEnd) {
        scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      scrollRef.current?.scrollBy({ left: clientWidth, behavior: 'smooth' });
    };

    const slideTime = 10000;
    let slidingInterval = setInterval(scroll, slideTime);

    let timeout: NodeJS.Timer;

    const clearSlidingInterval = () => {
      clearTimeout(timeout);
      clearInterval(slidingInterval);
    };

    const setSlidingInterval = () => {
      timeout = setTimeout(() => {
        slidingInterval = setInterval(scroll, slideTime);
      }, slideTime);
    };

    scrollRef.current?.addEventListener('mousedown', clearSlidingInterval);
    scrollRef.current?.addEventListener('mouseup', setSlidingInterval);
    scrollRef.current?.addEventListener('touchstart', clearSlidingInterval, {
      passive: true,
    });
    scrollRef.current?.addEventListener('touchend', setSlidingInterval, {
      passive: true,
    });

    return () => {
      clearInterval(slidingInterval);
      currentRef?.removeEventListener('mousedown', clearSlidingInterval);
      currentRef?.removeEventListener('mouseup', setSlidingInterval);
      currentRef?.removeEventListener('touchstart', clearSlidingInterval);
      currentRef?.removeEventListener('touchend', setSlidingInterval);
    };
  }, [currentRef]);

  return (
    <>
      {!isMoviesError && !isSeriesError && (
        <section className="mb-12 sm:mb-16 lg:pl-0 lg:pr-8">
          <h2 className="mb-6 text-xl sm:text-[32px] lg:mb-10">
            Trending last week
          </h2>

          <div
            className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-scroll pb-2 sm:gap-10"
            ref={scrollRef}
          >
            {trendings.length > 0
              ? trendings.map((movie) => {
                  const {
                    id,
                    backdrop_path,
                    title,
                    name,
                    release_date,
                    first_air_date,
                    media_type,
                  } = movie;

                  return (
                    <TrendingCard
                      key={id}
                      movieId={id}
                      imagePath={backdrop_path || ''}
                      title={title || name}
                      releaseDate={release_date || first_air_date}
                      category={media_type as IconName}
                    />
                  );
                })
              : [null, null, null, null, null].map((_, index) => (
                  <TrendingCard key={index} />
                ))}
          </div>
        </section>
      )}
    </>
  );
};
