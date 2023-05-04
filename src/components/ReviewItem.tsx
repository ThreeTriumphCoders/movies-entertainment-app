/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import classNames from 'classnames';
import { type Review } from '@prisma/client';
import Image from 'next/image';
import avatar from '../../public/images/avatar.svg';
import { useThemeContext } from '~/utils/ThemeContext';
import { ThemeType } from '~/types/ThemeType';
import { api } from '~/utils/api';
import { SvgIcon } from './SvgIcon';
import { IconName, getIconByName } from '~/utils/getIconByName';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

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
  const { rating, text, createdAt, id } = review;
  const { themeType } = useThemeContext();
  const {
    data: userData = { image: avatar, name: 'username' }
  } = api.user.getById.useQuery({ id: review.userId });
  const { data: sessionData } = useSession();
  const [isSetting, setSetting] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newRate, setNewRate] = useState(rating);
  const [isEditing, setIsEditing] = useState(false);
  const [newTextError, setNewTextError] = useState(false);

  const queryClient = useQueryClient();
  const reviewListKey = getQueryKey(api.review.getAll);
  const { mutate: deleteReview, isLoading: isDeleteLoading } = api.review.delete.useMutation({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reviewListKey }),
  });

  const { mutate: changeReview, isLoading: isChangeLoading } = api.review.change.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reviewListKey });
      setIsEditing(false);
    },
  })

  const handleDelete = () => {
    deleteReview({ id: review.id });
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (newText === text && newRate === rating) {
      setIsEditing(false);

      return;
    }

    if (!newText) {
      setNewTextError(true);

      return;
    }

    changeReview({
      id,
      text: newText,
      rating: newRate,
    });
  }
  
  return (
    <section
      className={classNames(
        'flex items-center gap-2.5 sm:gap-5',
        { 'opacity-50 pointer-events-none': isDeleteLoading || isChangeLoading }
      )}
      onMouseLeave={() => setSetting(false)}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full border-light border overflow-hidden relative">
        <Image
          src={userData?.image}
          alt={userData?.name ?? 'username'}
          fill />
      </div>
      <article
        className={classNames(
          'bg-grey bg-opacity-40 w-4/5 sm:w-2/3 lg:w-3/4 rounded-lg px-3.5 py-4 sm:px-6 sm:py-5 relative',
          { 'bg-semi-dark': themeType === ThemeType.Dark }
        )}
      >
        {isEditing
          ? (
            <form onSubmit={handleUpdate}>
              <input
                value={newText}
                onChange={(e) => {
                  setNewText(e.target.value);
                  setNewTextError(false);
                }}
                className={classNames(
                  'bg-semi-dark bg-opacity-0 w-4/5 border-b border-b-grey pb-1 mr-5 caret-primary outline-none focus:border-b-primary',
                  { 'border-b-[#E84545] focus:border-b-[#E84545]': newTextError }
                )}
              />
              <select
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                className='bg-semi-dark bg-opacity-0 border-b border-b-grey pb-1 outline-none focus:border-b-primary'
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(rate => (
                  <option className='bg-semi-dark' key={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </form>
          )
          : (
            <>
              <p className='font-light text-xs sm:text-sm'>
                {text}
              </p>

              <button
                className={classNames(
                  'absolute right-0 top-1 opacity-50 hover:opacity-100',
                  { 'hidden': userData?.name !== sessionData?.user.name}
                )}
                onMouseEnter={() => setSetting(true)}
              >
                <SvgIcon className='w-5 h-5 fill-light'>
                  {getIconByName(IconName.SETTINGS)}
                </SvgIcon>
              </button>

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

              {isSetting && (
                <div
                  className='absolute -right-[90px] top-0 bg-semi-dark w-max py-1 px-5 rounded-lg flex flex-col gap-1 text-center font-light text-sm'
                  onMouseLeave={() => setSetting(false)}
                >
                  <p className='hover:text-primary cursor-pointer' onClick={() => handleDelete()}>
                    Delete
                  </p>

                  <p className='hover:text-primary cursor-pointer' onClick={() => setIsEditing(true)}>
                    Change
                  </p>
                </div>
              )}
            </>
          )}
      </article>
    </section>
  );
};
