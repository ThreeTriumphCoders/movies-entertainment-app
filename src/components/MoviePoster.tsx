import Image from 'next/image';
import { type FC } from 'react';
import { ThemeType } from '~/types/ThemeType';
import { useThemeContext } from '~/utils/ThemeContext';

type Props = {
  poster_path: string;
};

export const MoviePoster: FC<Props> = ({ poster_path }) => {
  const { themeType } = useThemeContext();

  const bgColor = themeType === ThemeType.Dark ? 'bg-semi-dark' : 'bg-grey';

  return (
    <div
      className={`${bgColor}
            absolute bottom-[1px] left-[1px] right-[1px] top-[1px]
            text-2xl 
          `}
    >
      {poster_path ? (
        <Image
          className="object-contain transition-all duration-1000"
          alt="movie image"
          fill
          priority
          sizes={origin}
          src={`https://www.themoviedb.org/t/p/original${poster_path}`}
        />
      ) : (
        <p>No image</p>
      )}
    </div>
  );
};
