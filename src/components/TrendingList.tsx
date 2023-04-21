import { useEffect, useRef } from "react";
import { TrendingCard } from "./TrendingCard"
import { type IconName } from "~/utils/getIconByName";
import { useGetTrendings } from "~/utils/use-queries";
import { getCategoryNameFromAPIName } from "~/utils/functions";

const slideTime = 10000;

export const TrendingList = () => {
  const trendings = useGetTrendings();
  const scrollRef = useRef<HTMLDivElement>(null);

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

    let timeout = setInterval(scroll, slideTime)

    scrollRef.current.addEventListener('mousedown', () => {
      clearInterval(timeout);
    })

    scrollRef.current.addEventListener('mouseup', () => {
      timeout = setInterval(scroll, slideTime)
    })

    return () => {
      clearInterval(timeout)
    }
    
  }, [scrollRef])

  return (
    <div className="lg:pl-0 lg:pr-8 mb-6">
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
        {trendings.map(movie => {
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
        })}
      </div>
    </div>
  )
}
