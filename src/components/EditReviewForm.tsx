import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { ThemeType } from "~/types/ThemeType";
import { useThemeContext } from "~/utils/ThemeContext";

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

  const inputField = useRef<HTMLInputElement>(null);

  const disableEditing = () => {
    setIsEditing(false);
    setNewRate(rating);
    setNewText(text);
  };

  useEffect(() => {
    if (inputField.current !== null) {
      inputField.current.focus();
    }

    document.addEventListener('click', disableEditing);

    return () => {
      document.removeEventListener('click', disableEditing);
    }
  }, [])

  return (
    <form 
      className='font-light' 
      onSubmit={handleUpdate} 
      onClick={(e) => e.stopPropagation()}
    >
      <input
        value={newText}
        ref={inputField}
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
        className={classNames(
          'bg-light bg-opacity-0 border-b border-b-grey pb-1 outline-none focus:border-b-primary',
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
    </form>
  );
}