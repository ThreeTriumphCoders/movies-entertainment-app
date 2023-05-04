import classNames from "classnames";
import { FC } from "react";
import { Category } from "~/types/Category.enum";
import { MovieType } from "~/types/Movie";

type Props = {
  movie: MovieType;
  category: Category;
}

export const MovieInfo: FC<Props> = ({ movie, category }) => {
  return (
    <>
      <h3 className="mb-4 text-lg font-medium">Description</h3>

      <p className="mb-8 font-light">{movie.overview}</p>

      <h3 className="mb-4 text-lg font-medium">Status</h3>

      <p className="mb-8 font-light">{movie.status}</p>

      <h3 className="mb-4 text-lg font-medium">Original language</h3>

      <p className="mb-8 font-light">{movie.original_language}</p>

      <h3 className="mb-4 text-lg font-medium">Rating</h3>

      <div className="mb-8 flex gap-3">
        <div>
          <div className="flex items-center gap-1">
            <div
              className={classNames('h-2 w-2 rounded-full', {
                'bg-[#3B931C]': movie.vote_average > 7.4,
                'bg-[#FFF961]':
                  movie.vote_average > 4.9 && movie.vote_average < 7.5,
                'bg-[#E84545]': movie.vote_average < 5,
              })}
            />
            <p className="font-light">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
          <div>
            {/* <div
                className={classNames(
                  'w-2 h-2 rounded-full',
                  {
                    'bg-[#3B931C]': rating > 7.4,
                    'bg-[#FFF961]': rating > 4.9 && rating < 7.5,
                    'bg-[#E84545]': rating < 5,
                  },
                )}
              />
              <p className="font-light text-light text-sm">9.0</p> */}
            <p className="font-light">No votes</p>
          </div>
        </div>
        <div>
          <p className="font-light">TMDB</p>
          <p className="font-light">Movies Ent.</p>
        </div>
      </div>

      <h3 className="font-mediumt mb-4 text-lg">Genres</h3>
      <p className="mb-8 font-light">
        {movie.genres
          .reduce((acc, genre) => {
            return acc + genre.name + ', ';
          }, '')
          .slice(0, -2)}
      </p>

      {category === Category.MOVIE
        ? (
          <>
            <h3 className="mb-4 text-lg font-medium">Duration</h3>
            <p className="font-light">{movie.runtime} min.</p>
          </>
        )
        : (
          <>
            <h3 className="mb-4 text-lg font-medium">Seasons</h3>
            <table className="w-4/5 text-left sm:w-2/3 lg:w-full">
              <tr className="text-sm">
                <th className="pr-3">Name</th>
                <th className="pr-3">Series count</th>
                <th>Release date</th>
              </tr>
              {movie.seasons?.map((season) => (
                <tr key={season.id} className="font-light">
                  <td className="pr-3">{season.name}</td>
                  <td>{season.episode_count}</td>
                  <td>
                    {season.air_date
                      ? season.air_date.split('-').join('.')
                      : '-'}
                  </td>
                </tr>
              ))}
            </table>
          </>
        )}
    </>
  );
}