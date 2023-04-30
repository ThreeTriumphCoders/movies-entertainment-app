import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { IconName, getIconByName } from '~/utils/getIconByName';
import { SvgIcon } from './SvgIcon';
import classNames from 'classnames';
import { useThemeContext } from '~/utils/ThemeContext';
import { ThemeType } from '~/types/ThemeType';

type Props = {
  imagesPaths: string[];
};

export const MovieSlider = ({ imagesPaths }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { themeType } = useThemeContext();

  const setSlideTo0 = () => {
    setCurrentSlide(0);
  };

  useEffect(() => {
    window.addEventListener('resize', setSlideTo0);
    const swipeInterval = setInterval(handleSlideRight, 10000);

    return () => {
      window.removeEventListener('resize', setSlideTo0);
      clearInterval(swipeInterval);
    };
  });

  const lastIndex = imagesPaths.length - 1;
  const slideRef = useRef<HTMLDivElement>(null);

  const handleSlideRight = () => {
    setCurrentSlide((prev) => (currentSlide === lastIndex ? 0 : prev + 1));
  };

  const handleSlideLeft = () => {
    setCurrentSlide((prev) => (currentSlide === 0 ? lastIndex : prev - 1));
  };

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
      <div className="select-none rounded-lg pt-[56.25%]" {...handlers}>
        <div
          ref={slideRef}
          className="absolute bottom-0 left-0 right-0 top-0 flex transition duration-500"
          style={{
            transform: `translateX(-${translateWidth}px)`,
          }}
        >
          <div className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] animate-pulse bg-semi-dark" />

          {imagesPaths &&
            imagesPaths.map((path) => (
              <div key={path} className="relative min-h-full min-w-full">
                <Image
                  className="object-cover transition-all duration-1000"
                  alt="movie image"
                  fill
                  priority
                  sizes={origin}
                  src={`https://www.themoviedb.org/t/p/original${path}`}
                />
              </div>
            ))}
        </div>

        <button
          className={classNames(
            "absolute bottom-0 left-0 top-0 flex w-1/2 items-center justify-start bg-gradient-to-r from-[#fff] to-0% p-10 text-light opacity-0 transition duration-500 hover:opacity-100",
            {
              'from-dark': themeType === ThemeType.Dark,
            }
          )}
          onClick={handleSlideLeft}
        >
          <SvgIcon
            className={classNames(
              "h-10 w-10 -rotate-90",
              {
                'fill-light': themeType === ThemeType.Dark,
              }
            )}
            viewBox="5 5 38 38"
          >
            {getIconByName(IconName.ARROW_UP)}
          </SvgIcon>
        </button>

        <button
          className={classNames(
            "absolute bottom-0 right-0 top-0 flex w-1/2 items-center justify-end bg-gradient-to-l from-[#fff] to-0% p-10 text-light opacity-0 transition duration-500 hover:opacity-100",
            {
              'from-dark': themeType === ThemeType.Dark
            }
          )}
          onClick={handleSlideRight}
        >
          <SvgIcon
            className={classNames(
              "h-10 w-10 rotate-90",
              { 'fill-light': themeType === ThemeType.Dark }
            )}
            viewBox="5 5 38 38"
          >
            {getIconByName(IconName.ARROW_UP)}
          </SvgIcon>
        </button>
      </div>

      <div
        className={classNames(
          "absolute bottom-0 left-0 right-0 hidden items-center justify-center gap-2 bg-gradient-to-t from-[#fff] to-10% pb-1 opacity-100 transition duration-500 sm:flex",
          { 'from-dark': themeType === ThemeType.Dark }
        )}
      >
        {imagesPaths.map((path, index) => (
          <button
            key={path}
            className="relative h-10 w-20"
            onClick={() => setCurrentSlide(index)}
          >
            <Image
              className="object-cover, rounded-lg transition-all duration-1000"
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
  );
};
