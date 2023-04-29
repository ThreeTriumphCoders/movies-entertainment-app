import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState, type ChangeEvent } from 'react';
import { IconName, getIconByName } from '~/utils/getIconByName';
import { SvgIcon } from './SvgIcon';

export const Searchbar = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const router = useRouter();

  const handleRequest = _.debounce((param: string) => {
    void router.push(`/search?params=${param}`);
  }, 500);

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(event.target.value);
    handleRequest(event.target.value);
  };

  return (
    <label
      className="
        flex cursor-text items-center 
        gap-4
        py-4 sm:mb-6 sm:gap-6 sm:py-2
        sm:text-2xl 
        lg:pt-16
      "
    >
      <SvgIcon className="h-6 w-6 fill-light sm:h-8 sm:w-8" viewBox="0 0 24 24">
        {getIconByName(IconName.SEARCH)}
      </SvgIcon>

      <input
        type="text"
        placeholder="Search for movies or TV series"
        value={currentQuery}
        onChange={handleChangeQuery}
        className="
          w-full 
          border-b 
          border-b-dark 
          bg-dark 
          p-2 font-light 
          text-light caret-primary 
          outline-none 
          placeholder:text-light placeholder:opacity-50 focus:border-b-grey
        "
      />
    </label>
  );
};
