import React,
{
  type Dispatch,
  type SetStateAction,
  useState,
  useContext,
  type ReactNode
} from 'react';
import { LangType } from '~/types/LangType';

interface LangContextProps {
  langType: LangType;
  setCurrentLang: Dispatch<SetStateAction<LangType>>;
}

export const LangContext = React.createContext<LangContextProps>({
  langType: LangType.ENG
} as LangContextProps);

type Props = {
  children?: ReactNode,
}

export const LangProvider: React.FC<Props> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<LangType>(LangType.ENG);

  return (
    <LangContext.Provider value={{ langType: currentLang, setCurrentLang }} >
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
