import React from "react";
import { Navbar } from "./Navbar";
import { Searchbar } from "./Searchbar";
import { ScrollUpButton } from "./ScrollUpButton";
import { useTheme } from "~/utils/ThemeContext";
import classNames from "classnames";
import { ThemeType } from "~/types/ThemeType";

type Props = {
  children : React.ReactNode,
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { themeType } = useTheme();

  return (
    <main 
      className={classNames(
        "min-h-screen font-body lg:pl-40 px-4 sm:px-6 py-16 sm:pt-[116px] lg:pt-0",
        { 
          "bg-dark text-light": themeType === ThemeType.Dark,
          "bg-light text-dark": themeType === ThemeType.Light,
        }
      )}
    >
      <Navbar />
      <Searchbar />
      <div className="pb-10">
        {children}
      </div>
      <ScrollUpButton />
    </main>
  );
}
