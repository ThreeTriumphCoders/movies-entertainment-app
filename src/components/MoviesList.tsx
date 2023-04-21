import { useState, type FC } from "react";
import { MovieCard } from "./MovieCard";
import { type MovieType } from "~/types/Movie";
import { type IconName } from "~/utils/getIconByName";
import { getCategoryNameFromAPIName } from "~/utils/functions";

type Props = {
  movies: MovieType[];
  title?: string;
}

export const MoviesList: FC<Props> = ({
  movies = [],
  title = 'Movies'
}) => {
  const [playingId, setPlayingId] = useState(0);

  return (
    <div className="pb-8 lg:pr-8 ">
      <h2 className="mb-6 text-xl sm:text-[32px] lg:mb-10">{title}</h2>

      <div
        className="
          grid grid-cols-2 gap-4 sm:grid-cols-3 
          sm:gap-x-7 sm:gap-y-6 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-8
        "
      >
        {movies.length > 3 && (
          <>
            {movies.map((movie) => {
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
                <MovieCard
                  key={id}
                  movieId={id}
                  imagePath={backdrop_path || ''}
                  title={title || name}
                  releaseDate={release_date || first_air_date}
                  category={category as IconName}
                  playingId={playingId}
                  onPlayingChange={setPlayingId}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}