import { type Review } from '@prisma/client';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { useState } from 'react';
import { ReviewItem } from './ReviewItem';
import { Loader } from './Loader';
import { useThemeContext } from '~/utils/ThemeContext';
import classNames from 'classnames';
import { ThemeType } from '~/types/ThemeType';

interface ReviewsSectionProps {
  reviews: Review[];
  movieId: number;
}

export const ReviewsSection = ({ reviews, movieId }: ReviewsSectionProps) => {
  const [tempReview, setTempReview] = useState<Review | null>(null);
  const { themeType } = useThemeContext();

  return (
    <section>
      <h2 
        className={classNames(
          'sm:text-2xl text-lg text-dark mb-5 sm:mb-8',
          { 'text-light': themeType === ThemeType.Dark }
        )}
      >
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
