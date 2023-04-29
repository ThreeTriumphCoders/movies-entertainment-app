import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Searchbar } from "./Searchbar";
import { ScrollUpButton } from "./ScrollUpButton";
import classNames from "classnames";
import { ThemeType } from "~/types/ThemeType";
import { useThemeContext } from "~/utils/ThemeContext";

type Props = {
  children : React.ReactNode,
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { themeType } = useThemeContext();

  useEffect(() => {
    if (themeType === ThemeType.Dark) {
      document.documentElement.style.setProperty("--MyBackColor", "#171717");

      return;
    }

    document.documentElement.style.setProperty("--MyBackColor", "transparent");
  }, [themeType])

  return (
    <main 
      className={classNames(
        "min-h-screen font-body lg:pl-40 px-4 sm:px-6 py-16 sm:pt-[116px] lg:pt-0",
        {
          'bg-dark text-light' : themeType === ThemeType.Dark,
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
