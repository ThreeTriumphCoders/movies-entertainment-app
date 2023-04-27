import { useState, type FC } from "react";
import { MovieCard } from "./MovieCard";
import { type MovieType } from "~/types/Movie";
import { type IconName } from "~/utils/getIconByName";
import { getCategoryNameFromAPIName } from "~/utils/functions";

type Props = {
  movies: MovieType[];
  title?: string;
  category?: string;
  apiPath?: 'tv' | 'movie';
}

export const MoviesList: FC<Props> = ({
  movies = [],
  title = 'Movies',
  category = 'Movie',
  apiPath = 'movie',
}) => {
  const [playingId, setPlayingId] = useState(0);

  return (
    <section className="pb-8 lg:pr-8 mb-6 sm:mb-10">
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

              const type = getCategoryNameFromAPIName(media_type || category);

              return (
                <MovieCard
                  key={id}
                  movieId={id}
                  imagePath={backdrop_path || ''}
                  title={title || name}
                  releaseDate={release_date || first_air_date}
                  category={type as IconName}
                  apiPath={apiPath}
                  playingId={playingId}
                  onPlayingChange={setPlayingId}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}