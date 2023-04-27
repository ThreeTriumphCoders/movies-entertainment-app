import React,
{
  type Dispatch,
  type SetStateAction,
  useState,
  useContext
} from 'react';
import { LangType } from '~/types/LangType';

interface LangContextProps {
  langType: LangType;
  setCurrentLang: Dispatch<SetStateAction<LangType>>;
}

export const LangContext = React.createContext<LangContextProps>({
  langType: LangType.ENG
} as LangContextProps);

export const ThemeProvider = (children: React.ReactNode) => {
  const [currentLang, setCurrentLang] = useState<LangType>(LangType.ENG);

  return (
    <LangContext.Provider value={{ langType: currentLang, setCurrentLang }} >
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
