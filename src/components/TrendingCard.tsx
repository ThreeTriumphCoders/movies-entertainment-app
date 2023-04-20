import Link from "next/link";
import Image from 'next/image';
import { SvgIcon } from "./SvgIcon";
import { type FC } from "react";

export enum Category {
  MOVIE = 'Movie',
  TV = 'TV Serie',
}

type Props = {
  movieCode?: string;
  imagePath?: string;
  title?: string;
  releaseDate?: string;
  category?: Category;
}

const getIconByCategory = (category: Category) => {
  switch (category) {
    case Category.MOVIE:
      return (
        <path
          d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z"
        />
      )
    
    case Category.TV:
      return (
        <path
          d="M9.08 4.481H20V20H0V4.481h4.92l-2.7-3.278L3.78.029 7 3.91 10.22 0l1.56 1.203-2.7 3.278ZM2 6.421v11.64h10V6.42H2Zm15 7.76h-2v-1.94h2v1.94Zm-2-3.88h2V8.36h-2v1.94Z"
        />
      )
    default:
      return;
  }
}

const separator = <p className='-translate-y-1/4 select-none font-semibold opacity-60'>.</p>;

export const TrendingCard: FC<Props> = ({
  movieCode = '',
  imagePath = '/jL6B8mm9TR8vmh9VtgEg0GC7jPy.jpg',
  title = 'Best movie ever',
  releaseDate = '2016-11-29',
  category = Category.MOVIE,
}) => {
  return (
    <div className='min-w-[230px] sm:min-w-[410px] lg:min-w-[470px] snap-start'>
      <div className='relative pt-[50%] rounded-lg overflow-hidden'>
        <>
          <Image
            className='object-cover hover:scale-110 duration-1000'
            alt='movie image'
            fill
            src={`https://www.themoviedb.org/t/p/original${imagePath}`}
          />

          <div 
            className='
              absolute top-2 right-2 sm:top-4 sm:right-4
              bg-dark hover:bg-light
              bg-opacity-50 hover: opacity-100
              rounded-full transition
              flex items-center justify-center 
              w-8 h-8
            '
          >
            <SvgIcon 
              className='
                fill-none active:fill-light
                stroke-light hover:stroke-dark
                stroke-[1.5]
                h-[32px] w-[32px]
                cursor-pointer
              ' 
              viewBox='-9 -8 30 30'
            >
              <path
                d="m10.711.771.01.004.01.005c.068.027.108.06.14.107.032.048.046.09.046.15v11.927a.243.243 0 0 1-.046.15.282.282 0 0 1-.14.106l-.007.004-.008.003a.29.29 0 0 1-.107.014.326.326 0 0 1-.24-.091L6.356 9.235l-.524-.512-.524.512-4.011 3.915a.327.327 0 0 1-.24.1.244.244 0 0 1-.103-.021l-.01-.004-.01-.005a.281.281 0 0 1-.139-.107.244.244 0 0 1-.046-.15V1.037c0-.058.014-.101.046-.15A.281.281 0 0 1 .935.78l.01-.005.01-.004A.245.245 0 0 1 1.057.75h9.552c.038 0 .07.007.102.021Z"
              />
            </SvgIcon>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className='flex gap-1.5 text-light opacity-75 font-light text-[11px] sm:text-[13px] leading-[14px] sm:leading-4 mb-1'>
              <p>{releaseDate.slice(0, 4)}</p>

              {separator}

              <div className='flex gap-1 items-center'>
                <SvgIcon className='fill-light h-2.5 w-2.5'>
                  {getIconByCategory(category)}
                </SvgIcon>


                <p>{category}</p>
              </div>
            </div>

            <h3 className='text-sm sm:text-lg leading-[18px] sm:leading-6 font-medium'>
              <Link href={`/${movieCode}`}>
                {title}
              </Link>
            </h3>
          </div>
        </>
      </div>
    </div>
  )
}
