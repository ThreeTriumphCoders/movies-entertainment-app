import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Loader } from "./Loader";
import { SvgIcon } from "./SvgIcon";
import { IconName, getIconByName } from "~/utils/getIconByName";
import { useSwipeable } from 'react-swipeable';

type Props = {
  imagesPaths: string[];
}

export const MovieSlider = ({
  imagesPaths,
}: Props ) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const setSlideTo0 = () => {
    setCurrentSlide(0);
  }

  useEffect(() => {
    window.addEventListener('resize', setSlideTo0);
    const swipeInterval = setInterval(handleSlideRight, 10000)

    return () => {
      window.removeEventListener('resize', setSlideTo0);
      clearInterval(swipeInterval);
    }
  })
  
  const lastIndex = imagesPaths.length - 1;
  const slideRef = useRef<HTMLDivElement>(null);

  const handleSlideRight = () => {
    setCurrentSlide(prev => currentSlide === lastIndex
      ? 0
      : prev + 1)
  }

  const handleSlideLeft = () => {
    setCurrentSlide(prev => currentSlide === 0 
      ? lastIndex
      : prev - 1)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSlideRight(),
    onSwipedRight: () => handleSlideLeft(),
    delta: 10,
    swipeDuration: 1000,
    preventScrollOnSwipe: true,
  });

  const width = slideRef.current?.clientWidth || 0; 
  const translateWidth = currentSlide * width;

  return (
    <>
      <div 
        className="rounded-lg pt-[56.25%] select-none"
        {...handlers}
      >
        <div 
          ref={slideRef}
          className="absolute top-0 left-0 right-0 bottom-0 flex transition duration-500"
          style={{
            transform: `translateX(-${translateWidth}px)`
          }}
        >
          <div className="top-[1px] bottom-[1px] right-[1px] left-[1px] absolute bg-semi-dark animate-pulse"/>

          {imagesPaths && (
            imagesPaths.map((path) => (
              <div key={path} className="relative min-w-full min-h-full">
                <Image
                  className='transition-all duration-1000'
                  alt="movie image"
                  fill
                  priority
                  sizes="(max-width: 640px) 50vw, 33vw"
                  src={`https://www.themoviedb.org/t/p/original${path}`}
                />
              </div>
            ))
          )
          }
        </div>


        <button 
          className="
            absolute top-0 left-0 bottom-0 w-1/2
            text-light bg-gradient-to-r from-dark to-0%
            opacity-0 hover:opacity-100 transition duration-500
            flex items-center justify-start p-10
          "
          onClick={handleSlideLeft}
        >
            <SvgIcon 
              className="
                h-10 w-10 fill-light -rotate-90
              " 
              viewBox="5 5 38 38"
            >
              {getIconByName(IconName.ARROW_UP)}
            </SvgIcon>
        </button>

        <button 
          className="
            absolute top-0 right-0 bottom-0 w-1/2
            text-light bg-gradient-to-l from-dark to-0%
            opacity-0 hover:opacity-100 transition duration-500
            flex items-center justify-end p-10
          "
          onClick={handleSlideRight}
        >
            <SvgIcon 
              className="
                h-10 w-10 fill-light rotate-90
              " 
              viewBox="5 5 38 38"
            >
              {getIconByName(IconName.ARROW_UP)}
            </SvgIcon>
        </button>

      </div>

      <div className="
        hidden sm:flex
        absolute bottom-0 left-0 right-0 
        justify-center items-center gap-2 h-20
        opacity-0 hover:opacity-100 transition duration-500
        bg-gradient-to-t from-dark to-10%
      ">
        {imagesPaths.map((path, index) => (
          <button 
            key={path} 
            className="w-20 h-10 relative"
            onClick={() => setCurrentSlide(index)}
          >
            <Image
              className='object-cover, transition-all duration-1000'
              alt="movie image"
              fill
              priority
              sizes="(max-width: 640px) 50vw, 33vw"
              src={`https://www.themoviedb.org/t/p/original${path}`}
            />
          </button>
        ))}
      </div>
    </>
  )
}