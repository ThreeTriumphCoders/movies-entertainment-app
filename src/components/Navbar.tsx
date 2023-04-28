/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from 'next/image';
import { NavbarLink } from "./NavbarLink";
import { signOut, useSession } from "next-auth/react";
import { IconName, getIconByName } from "~/utils/getIconByName";
import { SvgIcon } from "./SvgIcon";
import avatar from '../../public/images/avatar.svg';
import { ThemeType } from "~/types/ThemeType";
import { LangType } from "~/types/LangType";
import { useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";
import { useLocalLang } from "~/utils/useLocalLang";
import { useThemeContext } from "~/utils/ThemeContext";


export const Navbar = () => {
  const [isSignOut, setIsSignOut] = useState(false);
  const { data: sessionData } = useSession();
  const [lang, setLang] = useLocalLang();

  const { themeType, setCurrentTheme } = useThemeContext();
  console.log('navbar', themeType);

  const handleThemeChange = () => {
    if (themeType === ThemeType.Dark) {
      setCurrentTheme(ThemeType.Light);

      return;
    }

    setCurrentTheme(ThemeType.Dark);
  }

  const handleLangChange = () => {
    if (lang === LangType.ENG) {
      setLang(LangType.UA);

      return;
    }

    setLang(LangType.ENG);
  }

  const router = useRouter();

  return (
    <div 
      className="
      sm:py-6 lg:p-8 lg:w-40 
      absolute lg:fixed lg:top-0 top-0 
      left-0 right-0 sm:left-6 sm:right-6
      lg:bottom-0 lg:left-0
      "
    >
      <div className={classNames(
        "bg-grey flex lg:flex-col justify-between p-4 lg:p-7 items-center sm:rounded-xl lg:rounded-[20px] h-full",
        { 'bg-semi-dark': themeType === ThemeType.Dark }
      )}>
        <Link href="/">
          <SvgIcon 
            className="h-6 w-6 sm:w-8 sm:h-8 fill-primary hover:opacity-75 transition"
            viewBox="0 0 32 26"
          >
            {getIconByName(IconName.LOGO)}
          </SvgIcon>
        </Link>

        <ul className="flex lg:flex-col gap-2 sm:gap-4">
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

        <div className="flex items-center gap-4 lg:flex-col lg:mt-32">
          <button
            type="button"
            className={classNames(
              "text-grey text-sm sm:text-lg hover:text-primary transition",
              { 'text-light': themeType === ThemeType.Light }
            )}
            onClick={handleLangChange}
          >
            {lang.toUpperCase()}
          </button>
          <button 
            type="button"
            className="pb-1 flex justify-center items-center"
            onClick={handleThemeChange}
          >
            {/* <SvgIcon className="fill-grey hover:fill-primary transition w-6 h-6 overflow-visible">
              {getIconByName(icon)}
            </SvgIcon> */}
            {themeType === ThemeType.Dark && (
              <SvgIcon className="fill-grey hover:fill-primary transition w-6 h-6 overflow-visible">
                {getIconByName(IconName.MOON)}
              </SvgIcon>
            )}
            {themeType === ThemeType.Light && (
              <SvgIcon className="fill-light hover:fill-primary transition w-6 h-6 overflow-visible">
                {getIconByName(IconName.SUN)}
              </SvgIcon>
            )}
          </button>
        </div>

        <button onClick={sessionData ? () => setIsSignOut(state => !state) : () => void router.push('/auth/signin')}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-full border-light border relative overflow-hidden">
              {sessionData ? (
                <Image src={sessionData?.user?.image ?? avatar} alt={sessionData?.user?.name ?? "user name"} fill />
              ) : (
                <Image src={avatar} alt="profile avatar" fill className="p-0.5"/>
              )}
            </div>
        </button>

        <div 
          className={classNames(
            "absolute w-max bottom-16 left-36 flex justify-center items-center bg-semi-dark rounded-lg py-3 px-8 transition-all",
            {
              '-translate-x-96 opacity-0': !isSignOut,
            }
          )}
        >
          <button 
            type="button" 
            className="py-1 px-10 bg-primary text-dark font-body rounded-lg"
            onClick={() => void signOut()}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
