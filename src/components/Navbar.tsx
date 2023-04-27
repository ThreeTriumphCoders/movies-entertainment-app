/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from 'next/image';
import { NavbarLink } from "./NavbarLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconName, getIconByName } from "~/utils/getIconByName";
import { SvgIcon } from "./SvgIcon";
import avatar from '../../public/images/avatar.svg';
import { useTheme } from "~/utils/ThemeContext";
import { ThemeType } from "~/types/ThemeType";
import { useLang } from "~/utils/LangContext";
import { LangType } from "~/types/LangType";

export const Navbar = () => {
  const { data: sessionData } = useSession();
  const { themeType, setCurrentTheme } = useTheme();
  const { langType, setCurrentLang } = useLang();

  const handleThemeChange = () => {
    if (themeType === ThemeType.Dark) {
      setCurrentTheme(ThemeType.Light);

      return;
    }

    setCurrentTheme(ThemeType.Dark);
  }

  const handleLangChange = () => {
    if (langType === LangType.ENG) {
      setCurrentLang(LangType.UA);

      return;
    }

    setCurrentLang(LangType.ENG);
  }

  return (
    <div 
      className="
      sm:py-6 lg:p-8 lg:w-40 
      absolute lg:fixed lg:top-0 top-0 
      left-0 right-0 sm:left-6 sm:right-6
      lg:bottom-0 lg:left-0
      "
    >
      <div className="bg-semi-dark flex lg:flex-col justify-between p-4 lg:p-7 items-center sm:rounded-xl lg:rounded-[20px] h-full">
        <Link href="/">
          <SvgIcon 
            className="h-6 w-6 sm:w-8 sm:h-8 fill-primary hover:opacity-75 transition"
            viewBox="0 0 32 26"
          >
            {getIconByName(IconName.LOGO)}
          </SvgIcon>
        </Link>

        <ul className="flex lg:flex-col gap-2 sm:gap-4 lg:mb-16 lg:mt-16">
          <li>
            <NavbarLink href="/">
              {getIconByName(IconName.HOME)}
            </NavbarLink>
          </li>
          <li>
            <NavbarLink href="/movies">
              {getIconByName(IconName.MOVIE)}
            </NavbarLink>
          </li>
          <li>
            <NavbarLink href="/series">
              {getIconByName(IconName.TV)}
            </NavbarLink>
          </li>
          {sessionData && (
            <li>
              <NavbarLink href="/bookmarks">
                {getIconByName(IconName.BOOKMARK)}
              </NavbarLink>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 lg:flex-col">
          <button
            type="button"
            className="text-grey text-sm sm:text-lg hover:text-primary transition"
            onClick={handleLangChange}
          >
            {langType.toUpperCase()}
          </button>
          <button 
            type="button"
            className="pb-1 flex justify-center items-center"
            onClick={handleThemeChange}
          >
            <SvgIcon className="fill-grey hover:fill-primary transition w-6 h-6 overflow-visible">
              {themeType === ThemeType.Dark
                ? getIconByName(IconName.MOON)
                : getIconByName(IconName.SUN)}
            </SvgIcon>
          </button>
        </div>

        <button className="block" onClick={sessionData ? () => void signOut() : () => void signIn()}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-full border-light border relative overflow-hidden">
              {sessionData ? (
                <Image src={sessionData?.user?.image ?? avatar} alt={sessionData?.user?.name ?? "user name"} fill />
              ) : (
                <Image src={avatar} alt="profile avatar" fill className="p-0.5"/>
              )}
            </div>
        </button>
      </div>
    </div>
  )
}
