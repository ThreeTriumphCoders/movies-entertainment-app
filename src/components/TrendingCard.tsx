import Link from "next/link";
import Image from 'next/image';
import { SvgIcon } from "./SvgIcon";
import { type FC } from "react";
import { IconName, getIconByName } from "~/utils/getIconByName";

type Props = {
  movieId: number;
  imagePath: string;
  title?: string;
  releaseDate?: string;
  category?: IconName;
}

const separator = <p className='-translate-y-1/4 select-none font-semibold opacity-60'>.</p>;

export const TrendingCard: FC<Props> = ({
  movieId,
  imagePath,
  title = 'No movie title',
  releaseDate = 'No release date',
  category = IconName.MOVIE,
}) => {
  return (
    <Link href={`/movie/${movieId}`} className='min-w-[230px] sm:min-w-[410px] lg:min-w-[470px] snap-start'>
      <div className='relative pt-[50%] rounded-lg overflow-hidden'>
        <>
          <Image
            className='object-cover hover:scale-110 duration-1000'
            alt='movie image'
            fill
            priority
            sizes="(max-width: 640px) 50vw, 33vw"
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
              viewBox="-10 -9 38 38"
            >
              {getIconByName(IconName.BOOKMARK)}
            </SvgIcon>
          </div>

          <div className="absolute bottom-2 left-2 p-2 bg-dark bg-opacity-50 rounded-md">
            <div className='flex gap-1.5 text-light opacity-75 font-light text-[11px] sm:text-[13px] leading-[14px] sm:leading-4 mb-1'>
              <p>{releaseDate.slice(0, 4)}</p>

              {separator}

              <div className='flex gap-1 items-center'>
                <SvgIcon className='fill-light h-2.5 w-2.5'>
                  {getIconByName(category)}
                </SvgIcon>


                <p>{category}</p>
              </div>
            </div>

            <h3 className='text-sm sm:text-lg leading-[18px] sm:leading-6 font-medium'>
              {title}
            </h3>
          </div>
        </>
      </div>
      </Link>
  )
}
