import { type Review } from '@prisma/client';
import React from 'react';
import { useThemeContext } from '~/contexts/useThemeContext';
import { ReviewItem } from './ReviewItem';

type Props = {
  reviews: Review[];
};

export const ReviewList: React.FC<Props> = ({ reviews }) => {
  const { themeType } = useThemeContext();

  return (
    <ul className="flex flex-col gap-5 sm:gap-8">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review} />;
      })}
    </ul>
  );
};
