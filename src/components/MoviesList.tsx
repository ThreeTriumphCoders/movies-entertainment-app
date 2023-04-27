import { useState, type FC, useMemo } from "react";
import { MovieCard } from "./MovieCard";
import { type MoviesType } from "~/types/Movie";
import { IconName } from "~/utils/getIconByName";
import { Category } from "~/types/Category.enum";
import { useBookmarksContext } from "~/contexts/useBookmarks";

type Props = {
  movies: MoviesType;
  title?: string;
  category?: Category;
};

export const MoviesList: FC<Props> = ({
  movies = [],
  title = "Movies",
  category,
}) => {
  const [playingId, setPlayingId] = useState(0);
  const {
    bookmarks,
    isInBookmarks,
    addToBookmarks,
    deleteFromBookmarks,
  } = useBookmarksContext();

  const handleAddToBookmarks = (id: number, type: Category) => {
    addToBookmarks(id, type);
  };

  const handleRemoveFromBookmarks = (id: number) => {
    deleteFromBookmarks(id);
  };

  return (
    <section className="mb-6 pb-8 sm:mb-10 lg:pr-8">
      <h2 className="mb-6 text-xl sm:text-[32px] lg:mb-10">{title}</h2>

      <div
        className="
          grid grid-cols-2 gap-4 sm:grid-cols-3 
          sm:gap-x-7 sm:gap-y-6 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-8
        "
      >
        {movies.length > 0 && (
          <>
            {movies.map((movie) => {
              const {
                id,
                backdrop_path,
                title,
                name,
                release_date,
                first_air_date,
              } = movie;

              const isBookmarked = isInBookmarks(id);

              const type = category
                ? category
                : bookmarks.find(({ movieId }) => movieId === id)?.type;

              return (
                <MovieCard
                  key={id}
                  movieId={id}
                  imagePath={backdrop_path || ""}
                  title={title || name}
                  releaseDate={release_date || first_air_date}
                  categoryIcon={type as IconName}
                  category={type as Category}
                  playingId={playingId}
                  isBookmarkedInitial={isBookmarked}
                  onPlayingChange={setPlayingId}
                  onBookmarksAdd={handleAddToBookmarks}
                  onBookmarksRemove={handleRemoveFromBookmarks}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};
