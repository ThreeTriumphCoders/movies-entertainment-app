import React,
{
  type Dispatch,
  type SetStateAction,
  useState,
  useContext,
  type ReactNode
} from 'react';
import { ThemeType } from '~/types/ThemeType';

interface ThemeContextProps {
  themeType: ThemeType;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.Dark
} as ThemeContextProps);

type Props = {
  children?: ReactNode,
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(ThemeType.Dark);

  return (
    <ThemeContext.Provider value={{ themeType: currentTheme, setCurrentTheme }} >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
