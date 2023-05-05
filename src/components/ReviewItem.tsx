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
import { EditReviewForm } from './EditReviewForm';

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
    setSetting(false);

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
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full border-light border overflow-hidden relative">
        <Image
          src={userData?.image}
          alt={userData?.name ?? 'username'}
          fill />
      </div>
      <article
        className={classNames(
          'bg-grey bg-opacity-40 w-4/5 sm:w-2/3 lg:w-3/4 rounded-lg px-3.5 py-4 sm:px-6 sm:py-5 relative text-dark',
          { 
            'bg-semi-dark text-light': themeType === ThemeType.Dark
          }
        )}
        onMouseLeave={() => setSetting(false)}
      >
        {isEditing
          ? (
            <EditReviewForm
              handleUpdate={handleUpdate}
              newText={newText}
              setNewText={setNewText}
              newTextError={newTextError}
              setNewTextError={setNewTextError}
              newRate={newRate}
              setNewRate={setNewRate}
              setIsEditing={setIsEditing}
              rating={rating}
              text={text}
            />
          )
          : (
            <>
              <p className='font-light text-xs sm:text-sm'>
                {text}
              </p>

              <button
                className={classNames(
                  'absolute right-0 top-1 opacity-70 hover:opacity-100',
                  { 'hidden': userData?.name !== sessionData?.user.name}
                )}
                onClick={() => setSetting(true)}
              >
                <SvgIcon 
                  className={classNames(
                    'w-5 h-5 fill-dark',
                    { 'fill-light': themeType === ThemeType.Dark }
                  )}
                >
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
                  className={classNames(
                    'absolute right-0 -top-14 sm:-right-[90px] sm:top-0 bg-[#DADADA] w-max py-1 px-5 rounded-lg flex flex-col gap-1 text-center font-light text-sm',
                    { 'bg-semi-dark': themeType === ThemeType.Dark }
                  )}
                  onMouseLeave={() => setSetting(false)}
                >
                  <p
                    className={classNames(
                      'hover:text-primary cursor-pointer text-dark',
                      { 'text-light': themeType === ThemeType.Dark }
                    )}
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </p>

                  <p
                    className={classNames(
                      'hover:text-primary cursor-pointer text-dark',
                      { 'text-light': themeType === ThemeType.Dark }
                    )}
                    onClick={(e) => {
                      if (!isEditing) {
                        e.stopPropagation();
                      }
                      setIsEditing(true);
                      setSetting(false);
                    }}
                  >
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
