import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import avatar from '../../public/images/avatar.svg';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';
import { useThemeContext } from '~/utils/ThemeContext';
import { ThemeType } from '~/types/ThemeType';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { Review } from '@prisma/client';
import { string } from 'zod';

type Props = {
  movieId: number;
  setTempReview: Dispatch<SetStateAction<Review | null>>;
}

export const ReviewForm: FC<Props> = ({ movieId, setTempReview }) => {
  const [query, setQuery] = useState('');
  const [rate, setRate] = useState<number | string>('Rate');
  const [isFocused, setIsFocused] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const { data: sessionData } = useSession();
  const { themeType } = useThemeContext();
  const router = useRouter();

  const queryClient = useQueryClient();
  const reviewListKey = getQueryKey(api.review.getAll);
  const createReview = api.review.create.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reviewListKey });
      setTempReview(null);
    },
  });
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!sessionData?.user) {
      void router.push('/auth/signin');

      return;
    }

    if (!query) {
      setIsInputError(true);

      return;
    }

    if (typeof rate === 'string') {
      setIsSelectError(true);

      return
    }

    if (typeof rate === 'number') {
      setTempReview({
        id: '0',
        movieId,
        userId: sessionData.user.id,
        rating: rate,
        text: query,
        createdAt: new Date(),
      })
  
      createReview.mutate({
        movieId,
        text: query,
        rating: rate,
      })
  
      setQuery('');
      setRate('Rate');
    }
  };

  return (
    <form className='sm:mb-12 mb-8' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <label className='mr-4 sm:mr-6 relative'>
        <div
          className={classNames(
            "w-6 h-6 sm:w-9 sm:h-9 bg-primary rounded-full border-light border absolute bottom-0 overflow-hidden opacity-0 transition-opacity",
            { 'opacity-100': isFocused || query }
          )}
        >
          {sessionData ? (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <Image src={sessionData?.user?.image ?? avatar} alt={sessionData?.user?.name ?? "user name"} fill />
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <Image src={avatar} alt="profile avatar" fill/>
          )}
        </div>
        <input
          type="text"
          placeholder="Add a review"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsInputError(false);
          }}
          className={classNames(
            'caret-primary outline-none border-b bg-dark border-b-[#E84545] focus:border-b-[#E84545] placeholder:text-sm pb-3 focus:pl-9 sm:focus:pl-14 sm:pb-3 transition-all w-3/4 lg:w-4/5 font-body font-light text-dark',
            { 
              'pl-9 sm:pl-14': query,
              'bg-light': themeType === ThemeType.Light,
              'text-light': themeType === ThemeType.Dark,
              'border-b-grey focus:border-b-primary': !isInputError,
            }
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </label>
      
      <label>
        <select
          className={classNames(
            'outline-none bg-dark border-b border-b-[#E84545] focus:border-b-[#E84545] w-14 h-12 font-light text-sm text-dark',
            {
              'bg-light': themeType === ThemeType.Light,
              'text-light': themeType === ThemeType.Dark,
              'border-b-grey focus:border-b-primary': !isSelectError,
            }
          )}
          value={rate}
          onChange={(e) => {
            setRate(Number(e.target.value));
            setIsSelectError(false);
          }}
        >
          <option selected disabled>
            Rate
          </option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(rate => (
            <option key={rate}>
              {rate}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
