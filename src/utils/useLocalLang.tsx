import { useState } from 'react';
import { LangType } from '~/types/LangType';

type SetLang = (value: LangType) => void;
type LocalLangType = [LangType, SetLang];

const langKey = 'lang';
const initialLang = LangType.ENG;

export const useLocalLang = (): LocalLangType => {
  const getLang = () => {
    if (typeof window === 'undefined') {
      return initialLang;
    }

    try {
      const item = window.localStorage.getItem(langKey);

      return item ? (JSON.parse(item) as LangType) : initialLang;
    } catch (err) {
      console.log(langKey, err);

      return initialLang;
    }
  }

  const [lang, setLang] = useState<LangType>(getLang());

  const save = (value: LangType) => {
    setLang(value);
    localStorage.setItem(langKey, JSON.stringify(value));
  }

  return [lang, save];
}
