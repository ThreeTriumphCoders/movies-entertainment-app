/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconName, getIconByName } from '~/utils/getIconByName';
import avatar from '../../public/images/avatar.svg';
import { NavbarLink } from './NavbarLink';
import { SvgIcon } from './SvgIcon';
import { ThemeType } from "~/types/ThemeType";
import classNames from "classnames";
import { useThemeContext } from "~/utils/ThemeContext";


export const Navbar = () => {
  const [isSignOut, setIsSignOut] = useState(false);
  const { data: sessionData } = useSession();

  const { themeType, setCurrentTheme } = useThemeContext();
  console.log('navbar', themeType);

  const handleThemeChange = () => {
    if (themeType === ThemeType.Dark) {
      setCurrentTheme(ThemeType.Light);

      return;
    }

    setCurrentTheme(ThemeType.Dark);
  }

  const router = useRouter();

  return (
    <div
      className="
      absolute left-0 right-0 
      top-0 sm:left-6 sm:right-6 sm:py-6 
      lg:fixed lg:bottom-0 lg:left-0 lg:top-0
      lg:w-40 lg:p-8
      "
    >
      <div className={classNames(
        "bg-primary flex lg:flex-col justify-between p-4 lg:p-7 items-center sm:rounded-xl lg:rounded-[20px] h-full",
        { 'bg-semi-dark': themeType === ThemeType.Dark }
      )}>
        <div className="flex justify-end items-center lg:flex-col gap-8 sm:gap-16">
          <Link href="/">
            <SvgIcon 
              className={classNames(
                "h-6 w-6 sm:w-8 sm:h-8 fill-primary hover:opacity-75 transition",
                {
                  'fill-semi-dark': themeType === ThemeType.Light,
                }
              )}
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
        </div>

        <div className="flex justify-center items-center lg:flex-col gap-6 sm:gap-16">
          <button 
            type="button"
            className="flex justify-center items-center"
            onClick={handleThemeChange}
          >
            {themeType === ThemeType.Dark && (
              <SvgIcon className="fill-grey hover:fill-primary transition w-4 h-4 sm:w-6 sm:h-6 overflow-visible">
                {getIconByName(IconName.MOON)}
              </SvgIcon>
            )}
            {themeType === ThemeType.Light && (
              <SvgIcon className="fill-light hover:fill-semi-dark transition w-4 h-4 sm:w-6 sm:h-6 overflow-visible">
                {getIconByName(IconName.SUN)}
              </SvgIcon>
            )}
          </button>

          <button onClick={sessionData ? () => setIsSignOut(state => !state) : () => void router.push('/auth/signin')}>
              <div 
                className={classNames(
                  "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-full border-light border relative overflow-hidden",
                  { 
                    'bg-semi-dark': themeType === ThemeType.Light,
                  }
                )}
              >
                {sessionData ? (
                  <Image src={sessionData?.user?.image ?? avatar} alt={sessionData?.user?.name ?? "user name"} fill />
                ) : (
                  <SvgIcon 
                    className={classNames(
                      'px-1 pt-1',
                      {
                        'fill-light': themeType === ThemeType.Light,
                      }
                    )}
                    viewBox="0 0 24 24"
                  >
                    {getIconByName(IconName.AVATAR)}
                  </SvgIcon>
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
    </div>
  );
};
