import { useEffect, useState } from 'react';
import { ThemeType } from '~/types/ThemeType';

type SetTheme = (value: ThemeType) => void;

const themeKey = 'theme';
const initialTheme = ThemeType.Dark;

export const useLocalTheme = (): [ThemeType, SetTheme] => {
  const getTheme = () => {
    if (typeof window === 'undefined') {
      return initialTheme;
    }

    try {
      const item = localStorage.getItem(themeKey);
      console.log(item)
      return item ? (item as ThemeType) : initialTheme;
    } catch (err) {
      console.log(themeKey, err);

      return initialTheme;
    }
  }

  const [theme, setTheme] = useState<ThemeType>(getTheme());

  const saveTheme = (value: ThemeType) => {
    setTheme(value);
    localStorage.setItem(themeKey, value);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only set the initial value on the client
      console.log('trigger')
      setTheme(getTheme());
    }
  }, []);

  return [theme, saveTheme];
}