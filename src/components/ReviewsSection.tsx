import { type Review } from '@prisma/client';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useThemeContext } from '~/contexts/useThemeContext';
import { ThemeType } from '~/types/ThemeType';
import { ReviewForm } from './ReviewForm';
import { ReviewItem } from './ReviewItem';
import { ReviewList } from './ReviewList';

interface ReviewsSectionProps {
  reviews: Review[];
  movieId: number;
}

export const ReviewsSection = ({ reviews, movieId }: ReviewsSectionProps) => {
  const [tempReview, setTempReview] = useState<Review | null>(null);
  const { themeType } = useThemeContext();
  const { data: sessionData } = useSession();

  const userIds = reviews.map((review) => review.userId);
  const currentId = sessionData?.user.id || '';

  return (
    <section>
      <h2
        className={classNames('mb-5 text-lg text-dark sm:mb-8 sm:text-2xl', {
          'text-light': themeType === ThemeType.Dark,
        })}
      >
        Reviews
      </h2>

      {!userIds.includes(currentId) && (
        <ReviewForm movieId={movieId} setTempReview={setTempReview} />
      )}

      {tempReview && (
        <div className="pointer-events-none mb-8 opacity-50">
          <ReviewItem review={tempReview} />
        </div>
      )}

      <ReviewList reviews={reviews} />
    </section>
  );
};
