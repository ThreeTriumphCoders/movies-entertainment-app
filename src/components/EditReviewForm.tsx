import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { ThemeType } from "~/types/ThemeType";
import { useThemeContext } from "~/utils/ThemeContext";
import useAutosizeTextArea from "~/utils/useResizaTextArea";

type Props = {
  handleUpdate: (e: React.FormEvent) => void;
  newText: string;
  setNewText: Dispatch<SetStateAction<string>>;
  newTextError: boolean;
  setNewTextError: Dispatch<SetStateAction<boolean>>;
  newRate: number;
  setNewRate: Dispatch<SetStateAction<number>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  rating: number;
  text: string;
}

export const EditReviewForm: FC<Props> = ({
  handleUpdate,
  newText,
  setNewText,
  newTextError,
  setNewTextError,
  newRate,
  setNewRate,
  setIsEditing,
  rating,
  text,
}) => {
  const { themeType } = useThemeContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, newText);

  const disableEditing = () => {
    setIsEditing(false);
    setNewRate(rating);
    setNewText(text);
  };

  useEffect(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.focus();
    }

    document.addEventListener('click', disableEditing);

    return () => {
      document.removeEventListener('click', disableEditing);
    }
  }, [])

  return (
    <form 
      className='font-light flex items-end' 
      onSubmit={handleUpdate} 
      onClick={(e) => e.stopPropagation()}
    >
      <textarea
        value={newText}
        rows={1}
        ref={textAreaRef}
        onChange={(e) => {
          setNewText(e.target.value);
          setNewTextError(false);
        }}
        className={classNames(
          'bg-semi-dark bg-opacity-0 w-3/4 border-b border-b-grey mr-5 caret-primary outline-none resize-none overflow-hidden focus:border-b-primary',
          { 'border-b-[#E84545] focus:border-b-[#E84545]': newTextError }
        )}
        onFocus={() => setNewText(state => state + ' ')}
      />

      <select
        value={newRate}
        onChange={(e) => setNewRate(Number(e.target.value))}
        className={classNames(
          'mr-5 bg-light bg-opacity-0 border-b border-b-grey pb-1 outline-none focus:border-b-primary',
        )}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map(rate => (
          <option 
            className={themeType === ThemeType.Light ? 'bg-grey' : 'bg-semi-dark'}
            key={rate}
          >
            {rate}
          </option>
        ))}
      </select>

      <button
        type='submit'
        className={classNames(
          ' px-2 sm:px-3 py-1 font-light text-sm sm:text-base text-dark border border-dark rounded-lg hover:bg-primary transition',
          { 'text-light border-light': themeType === ThemeType.Dark }
        )}
      >
        Send
      </button>
    </form>
  );
}