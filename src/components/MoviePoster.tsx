import Image from "next/image";
import { FC } from "react";

type Props = {
  poster_path: string;
}

export const MoviePoster: FC<Props> = ({ poster_path }) => {
  return (
    <div
      className="
            absolute bottom-[1px] left-[1px] right-[1px]
            top-[1px] flex items-center
            justify-center bg-semi-dark text-2xl
          "
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
}