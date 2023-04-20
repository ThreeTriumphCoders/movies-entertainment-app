import { type ChangeEvent, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import { IconName, getIconByName } from "~/utils/getIconByName";

export const Searchbar = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  return (
    <label 
      className="
        flex items-center gap-4 
        sm:gap-6
        py-4 sm:py-2 sm:mb-6 lg:pt-16
        cursor-text 
        sm:text-2xl
      "
    >
      <SvgIcon className="fill-light h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24">
        {getIconByName(IconName.SEARCH)}
      </SvgIcon>

      <input 
        type="text"
        placeholder="Search for movies or TV series" 
        value={query}
        onChange={handleChangeQuery}
        className="
          caret-primary 
          bg-dark 
          p-2 
          w-full 
          font-light text-light 
          placeholder:text-light placeholder:opacity-50 
          outline-none 
          border-b border-b-dark focus:border-b-grey
        "
      />
    </label>
  )
};
