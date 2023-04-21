import { useEffect, useRef } from "react";
import { TrendingCard } from "./TrendingCard"

const mockMovies = [
  {
    movieCode: '1',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '2',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '3',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '4',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '5',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '6',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '7',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '8',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '9',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '10',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '11',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
]

export enum Category {
  MOVIE = 'Movie',
  TV = 'TV Serie',
}

export const TrendingList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const timeout = setInterval(() => {
      const {
        scrollLeft = 0,
        scrollWidth = 0,
        clientWidth = 0,
      } = scrollRef.current as HTMLDivElement;

      const isEnd = scrollLeft === scrollWidth - clientWidth;

      if (isEnd) {
        scrollRef.current?.scrollTo({left: 0, behavior:'smooth'})
        return;
      }
      
      scrollRef.current?.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }, 10000)

    return () => {
      clearInterval(timeout)
    }
    
  }, [scrollRef])

  return (
    <div className="lg:pl-0 lg:pr-8 mb-6">
      <h2 className="text-xl mb-6 sm:text-[32px] lg:mb-10">
        Trending
      </h2>
    
      <div 
        className="
          flex overflow-x-scroll gap-4 sm:gap-10 pb-2 
          touch-pan-x snap-x snap-mandatory
        "
        ref={scrollRef}
      >
        {mockMovies.map(movie => {
          const {
            movieCode,
            imagePath,
            title,
            releaseDate,
            category,
          } = movie;

          return (
            <TrendingCard 
              key={movieCode}
              movieCode={movieCode}
              imagePath={imagePath}
              title={title}
              releaseDate={releaseDate}
              category={category as Category}
            />
          )
        })}
      </div>
    </div>
  )
}
