import { SvgIcon } from "./SvgIcon";

export const Searchbar = () => {
  return (
    <label 
      className="
        flex items-center gap-4 
        sm:gap-6
        p-4 sm:py-2 sm:px-6 sm:mb-6 lg:pl-0 lg:pt-16
        cursor-text 
        sm:text-2xl
      "
    >
      <SvgIcon className="fill-light h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24">
        <path
          d="m17.31 15.9 3.4 3.39a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0l-3.39-3.4A7.92 7.92 0 0 1 11 19a8 8 0 1 1 8-8 7.92 7.92 0 0 1-1.69 4.9ZM11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
        />
      </SvgIcon>

      <input 
        type="text"
        placeholder="Search for movies or TV series" 
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
