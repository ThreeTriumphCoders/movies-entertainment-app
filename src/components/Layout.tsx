import React from 'react';
import { Navbar } from './Navbar';
import { ScrollUpButton } from './ScrollUpButton';
import { Searchbar } from './Searchbar';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main
      className="
        min-h-screen bg-dark px-4 pb-8 pt-16
        font-body text-light selection:bg-primary 
        selection:text-dark sm:px-6 sm:pt-[116px] lg:pl-40 lg:pt-0
      "
    >
      <Navbar />

      <Searchbar />

      <div className="pb-10">{children}</div>

      <ScrollUpButton />
    </main>
  );
};
