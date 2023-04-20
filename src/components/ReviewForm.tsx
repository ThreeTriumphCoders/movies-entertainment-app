import Image from 'next/image';
import { useState } from 'react';
import avatar from '../../public/images/avatar.svg';

export const ReviewForm = () => {
  const [query, setQuery] = useState('');

  return (
    <form className='mb-12'>
      <label className='w-auto mr-6'>
        <Image
          src={avatar}
          width="36"
          height="36"
          alt="Your avatar"
          className='
            border border-light rounded-full
            absolute opacity-0 transition-opacity
          '
        />
        <input
          type="text"
          placeholder="Add a review"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className='
            bg-dark 
            caret-primary 
            outline-none 
            border-b 
            border-b-grey
            focus:border-b-light
            placeholder:text-light placeholder:opacity-50 placeholder:text-sm
            pl-5 pb-3 focus:pl-14 transition-all
            w-1/3
            font-body font-light
          '
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
