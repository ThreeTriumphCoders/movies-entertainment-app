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
      <ul className='flex flex-col gap-5 sm:gap-8'>
        {reviews.map(review => {
          return (
            <ReviewItem key={review.id} review={review} />
          )
        })}
      </ul>
  );
}
