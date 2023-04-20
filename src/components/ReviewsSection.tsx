import { type Review } from '@prisma/client';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

const testReviews: Review[] = [
  {
    id: 'fagiusoudik',
    movieId: 1,
    userId: 'fyuidhdocjdsbud',
    rating: 8,
    text: 'I like it!!',
    createdAt: new Date(),
  },
  {
    id: 'fagiusoudik',
    movieId: 1,
    userId: 'fyuidhdocjdsbud',
    rating: 8,
    text: 'I like it!!',
    createdAt: new Date(),
  }
]

export const ReviewsSection = () => {
  return (
    <section>
      <h2 className='text-2xl text-light mb-8'>
        Reviews
      </h2>

      <ReviewForm />
      <ReviewList reviews={testReviews} />
    </section>
  );
}
