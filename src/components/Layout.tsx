import classNames from 'classnames';
import React, { useEffect } from 'react';
import { ThemeType } from '~/types/ThemeType';
import { useThemeContext } from '~/utils/ThemeContext';
import { Navbar } from './Navbar';
import { ScrollUpButton } from './ScrollUpButton';
import { Searchbar } from './Searchbar';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const { themeType } = useThemeContext();

  useEffect(() => {
    if (themeType === ThemeType.Dark) {
      document.documentElement.style.setProperty('--MyBackColor', '#171717');

      return;
    }

    document.documentElement.style.setProperty('--MyBackColor', 'transparent');
  }, [themeType]);

  return (
    <main
      className={classNames(
        'min-h-screen px-4 pb-8 pt-16 font-body selection:bg-primary selection:text-dark sm:px-6 sm:pt-[116px] lg:pl-40 lg:pt-0',
        { 'bg-dark text-light': themeType === ThemeType.Dark },
      )}
    >
      <Navbar />

      <Searchbar />

      <div className="pb-10">{children}</div>

      <ScrollUpButton />
    </main>
  );
};
