import React from 'react';
import { type Review } from '@prisma/client';
import { ReviewItem } from './ReviewItem';
import { useThemeContext } from '~/utils/ThemeContext';
import classNames from 'classnames';
import { ThemeType } from '~/types/ThemeType';

type Props = {
  reviews: Review[],
}

export const ReviewList: React.FC<Props> = ({ reviews }) => {
  const { themeType } = useThemeContext();

  return (
    <>
      <h3 
        className={classNames(
          'font-medium text-base text-dark mb-6 sm:text-lg sm:mb-5',
          { 'text-light': themeType === ThemeType.Dark }
        )}
      >
        {`${reviews.length} reviews`}
      </h3>

      <ul className='flex flex-col gap-5 sm:gap-8'>
        {reviews.map(review => {
          return (
            <ReviewItem key={review.id} review={review} />
          )
        })}
      </ul>
      
    </>
  );
}
