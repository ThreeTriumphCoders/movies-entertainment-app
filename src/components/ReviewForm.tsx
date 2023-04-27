import Image from 'next/image';
import { useState } from 'react';
import avatar from '../../public/images/avatar.svg';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';

export const ReviewForm = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data: sessionData } = useSession();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery('');
  };

  return (
    <form className='sm:mb-12 mb-8' onSubmit={handleSubmit}>
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
          onChange={(event) => setQuery(event.target.value)}
          className={classNames(
            'bg-dark caret-primary outline-none border-b border-b-grey focus:border-b-light placeholder:text-light placeholder:opacity-50 placeholder:text-sm pb-3 focus:pl-9 sm:focus:pl-14 sm:pb-3 transition-all w-3/4 lg:w-4/5 font-body font-light',
            { 'pl-9 sm:pl-14': query }
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </label>
      
      <label>
        <select
          className='
            bg-dark
            outline-none
            border-b border-b-grey focus:border-b-light
            w-12 h-12
            font-light text-sm
          '
        >
          <option
            disabled 
            selected
          >
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
