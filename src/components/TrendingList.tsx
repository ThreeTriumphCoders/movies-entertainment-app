import { useEffect, useRef } from "react";
import { TrendingCard } from "./TrendingCard"
import { type IconName } from "~/utils/getIconByName";
import { useGetTrendings } from "~/utils/use-queries";
import { getCategoryNameFromAPIName } from "~/utils/functions";

export const TrendingList = () => {
  const trendings = useGetTrendings();
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
        scrollRef.current?.scrollTo({left: 0, behavior:'smooth'})
        return;
      }
      
      scrollRef.current?.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }

    const slideTime = 10000;
    let slidingInterval = setInterval(scroll, slideTime);

    let timeout: NodeJS.Timer;

    const clearSlidingInterval = () => {
      clearTimeout(timeout);
      clearInterval(slidingInterval);
    }

    const setSlidingInterval = () => {
      timeout = setTimeout(() => {
        slidingInterval = setInterval(scroll, slideTime);
      }, slideTime)
    };


    scrollRef.current?.addEventListener('mousedown', clearSlidingInterval);
    scrollRef.current?.addEventListener('mouseup', setSlidingInterval);
    scrollRef.current?.addEventListener('touchstart', clearSlidingInterval, { passive: true });
    scrollRef.current?.addEventListener('touchend', setSlidingInterval, { passive: true });

    return () => {
      clearInterval(slidingInterval)
      currentRef?.removeEventListener('mousedown', clearSlidingInterval)
      currentRef?.removeEventListener('mouseup', setSlidingInterval)
      currentRef?.removeEventListener('touchstart', clearSlidingInterval)
      currentRef?.removeEventListener('touchend', setSlidingInterval)
    }
    
  }, [currentRef])

  return (
    <section className="lg:pl-0 lg:pr-8 mb-12 sm:mb-16">
      <h2 className="text-xl mb-6 sm:text-[32px] lg:mb-10">
        Trending last week
      </h2>
    
      <div 
        className="
          flex overflow-x-scroll gap-4 sm:gap-10 pb-2 
          touch-pan-x snap-x snap-mandatory
        "
        ref={scrollRef}
      >
        {trendings.length > 0 ? (
          trendings.map(movie => {
            const {
              id,
              backdrop_path,
              title,
              name,
              release_date,
              first_air_date,
              media_type,
            } = movie;
  
            const category = getCategoryNameFromAPIName(media_type || '');
  
            return (
              <TrendingCard 
                key={id}
                movieId={id}
                imagePath={backdrop_path || ''}
                title={title || name}
                releaseDate={release_date || first_air_date}
                category={category as IconName}
              />
            )
          })
        ) : (
          [null, null, null, null, null].map((_, index) => (
            <TrendingCard key={index}/>
          ))
        )}
      </div>
    </section>
  )
}
