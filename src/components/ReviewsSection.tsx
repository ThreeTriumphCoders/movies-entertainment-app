import { type Review } from '@prisma/client';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { useState } from 'react';
import { ReviewItem } from './ReviewItem';
import { Loader } from './Loader';

interface ReviewsSectionProps {
  reviews: Review[];
  movieId: number;
}

export const ReviewsSection = ({ reviews, movieId }: ReviewsSectionProps) => {
  const [tempReview, setTempReview] = useState<Review | null>(null);

  return (
    <section>
      <h2 className='sm:text-2xl text-lg mb-5 sm:mb-8'>
        Reviews
      </h2>

      <ReviewForm movieId={movieId} setTempReview={setTempReview} />
      <ReviewList reviews={reviews} />
      
      {tempReview && (
        <div className='mt-8 pointer-events-none opacity-50'>
          <ReviewItem review={tempReview} />
        </div>
      )}
    </section>
  );
}
