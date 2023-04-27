import React,
{
  type Dispatch,
  type SetStateAction,
  useState,
  useContext
} from 'react';
import { ThemeType } from '~/types/ThemeType';

interface ThemeContextProps {
  themeType: ThemeType;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.Dark
} as ThemeContextProps);

export const ThemeProvider = (children: React.ReactNode) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(ThemeType.Dark);

  return (
    <ThemeContext.Provider value={{ themeType: currentTheme, setCurrentTheme }} >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
