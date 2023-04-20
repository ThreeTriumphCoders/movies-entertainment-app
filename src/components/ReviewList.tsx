import React from 'react';
import { type Review } from '@prisma/client';
import { ReviewItem } from './ReviewItem';

type Props = {
  reviews: Review[],
}

export const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <>
      <h3 className='font-medium text-lg mb-5'>
        {`${reviews.length} reviews`}
      </h3>

      <ul className='flex flex-col gap-8'>
        {reviews.map(review => {
          return (
            <ReviewItem key={review.id} review={review} />
          )
        })}
      </ul>
      
    </>
  );
}
