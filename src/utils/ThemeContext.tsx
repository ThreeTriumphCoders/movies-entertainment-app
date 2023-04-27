import React,
{
  useContext,
  type ReactNode,
  useEffect,
} from 'react';
import { ThemeType } from '~/types/ThemeType';
import { useLocalTheme } from './useLocalTheme';

interface ThemeContextProps {
  themeType: ThemeType;
  setCurrentTheme: (value: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.Dark
} as ThemeContextProps);

type Props = {
  children?: ReactNode,
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useLocalTheme();

  return (
    <ThemeContext.Provider value={{ themeType: currentTheme, setCurrentTheme }} >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
