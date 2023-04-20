import { useState, type FC } from "react";
import { MovieCard, type Category } from "./MovieCard";

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
  {
    movieCode: '12',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '13',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '14',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
  {
    movieCode: '15',
    videoCode: 'Ew9ngL1GZvs',
    imagePath: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    title: 'The Godfather',
    releaseDate: '1972-03-14',
    category: 'Movie',
  },
  {
    movieCode: '16',
    videoCode: 'je0aAf2f8XQ',
    imagePath: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    title: 'La La Land',
    releaseDate: '2016-11-29',
    category: 'Movie',
  },
]

type Props = {
  title?: string;
}

export const MoviesList: FC<Props> = ({
  title = 'Movies'
}) => {
  const [playingId, setPlayingId] = useState('');

  return (
    <div className="px-4 sm:px-6 lg:pl-0 lg:pr-8">
      <h2 className="text-xl mb-6 sm:text-[32px] lg:mb-10">
        {title}
      </h2>

      <div 
        className="
          grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 
          gap-4 sm:gap-x-7 sm:gap-y-6 xl:gap-x-10 xl:gap-y-8
        "
      >
        {mockMovies.map(movie => {
          const {
            category,
            imagePath,
            movieCode,
            releaseDate,
            title,
            videoCode,
          } = movie;
          return <MovieCard 
            key={movieCode}
            movieCode={movieCode}
            videoCode={videoCode}
            imagePath={imagePath}
            title={title}
            releaseDate={releaseDate}
            category={category as Category}
            playingId={playingId}
            onPlayingChange={setPlayingId}
          />
        })}
      </div>
    </div>
  )
}