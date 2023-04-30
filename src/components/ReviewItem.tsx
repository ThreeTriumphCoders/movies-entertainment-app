/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import classNames from 'classnames';
import { type Review } from '@prisma/client';
import Image from 'next/image';
import avatar from '../../public/images/avatar.svg';
import { useThemeContext } from '~/utils/ThemeContext';
import { ThemeType } from '~/types/ThemeType';

const getReviewTime = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

type Props = {
  review: Review,
};

export const ReviewItem: React.FC<Props> = ({ review }) => {
  const { rating, text, createdAt } = review;
  const { themeType } = useThemeContext();
  
  return (
    <section className='flex items-center gap-2.5 sm:gap-5'>
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full border-light border overflow-hidden relative">
        <Image src={avatar} alt="profile avatar" fill/>
      </div>
      <article 
        className={classNames(
          'bg-grey bg-opacity-40 w-4/5 sm:w-2/3 lg:w-3/4 rounded-lg px-3.5 py-4 sm:px-6 sm:py-5 relative',
          { 'bg-semi-dark': themeType === ThemeType.Dark }
        )}
      >
        <p className='font-light text-xs sm:text-sm'>
          {text}
        </p>
        <div className='flex items-center gap-1 sm:gap-2 absolute right-2 bottom-1'>
          <div className='flex items-center gap-1'>
            <div 
              className={classNames(
                'w-1.5 h-1.5 rounded-full',
                {
                  'bg-[#3B931C]': rating > 7.4,
                  'bg-[#FFF961]': rating > 4.9 && rating < 7.5,
                  'bg-[#E84545]': rating < 5,
                },
              )}
            />
            <p className='font-light text-xs sm:text-sm'>
              {`${rating}/10`}
            </p>
          </div>
          <p className='font-light text-xs sm:text-sm opacity-50'>
            {getReviewTime(createdAt)}
          </p>
        </div>
      </article>
    </section>
  );
};
