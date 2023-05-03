/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ThemeType } from '~/types/ThemeType';
import { useThemeContext } from '~/utils/ThemeContext';
import { IconName, getIconByName } from '~/utils/getIconByName';
import avatar from '../../public/images/avatar.svg';
import { NavbarLink } from './NavbarLink';
import { SvgIcon } from './SvgIcon';

export const Navbar = () => {
  const [isSignOut, setIsSignOut] = useState(false);
  const { data: sessionData } = useSession();

  const { themeType, setCurrentTheme } = useThemeContext();

  const handleThemeChange = () => {
    if (themeType === ThemeType.Dark) {
      setCurrentTheme(ThemeType.Light);

      return;
    }

    setCurrentTheme(ThemeType.Dark);
  };

  const router = useRouter();

  return (
    <div
      className="
      fixed left-0 right-0 z-10
      top-0 sm:left-6 sm:right-6 sm:py-6
      lg:bottom-0 lg:left-0 lg:top-0 lg:w-40 lg:p-8
      "
    >
      <div
        className={classNames(
          'flex h-full items-center justify-between bg-primary p-4 transition-transform duration-300 sm:rounded-xl lg:flex-col sm:hover:scale-[1.02] lg:rounded-[20px] lg:p-7',
          { 'bg-semi-dark': themeType === ThemeType.Dark },
        )}
      >
        <div className="flex items-center justify-end gap-6 sm:gap-8 lg:flex-col">
          <Link href="/">
            <SvgIcon
              className={classNames(
                'h-6 w-6 fill-primary transition hover:opacity-75 sm:h-8 sm:w-8',
                {
                  'fill-semi-dark': themeType === ThemeType.Light,
                },
              )}
              viewBox="0 0 32 26"
            >
              {getIconByName(IconName.LOGO)}
            </SvgIcon>
          </Link>

          <ul className="flex gap-2 sm:gap-4 lg:flex-col">
            <li>
              <NavbarLink href="/">{getIconByName(IconName.HOME)}</NavbarLink>
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

        <div className="flex items-center justify-center gap-2 sm:gap-4 lg:flex-col">
          <div className='relative'>
            {sessionData?.user && (
              <div
                className={`
              absolute -right-1 -bottom-1 flex flex-nowrap items-center rounded-full text-dark
              transition-all lg:-left-1 lg:items-start lg:justify-center
              ${
                themeType === ThemeType.Dark
                  ? 'bg-primary hover:bg-light'
                  : 'bg-light hover:bg-grey'
              }
              ${
                isSignOut
                  ? 'h-8 w-32 scale-100 pr-8 opacity-100 sm:h-10 sm:w-36 lg:h-24 lg:w-12 lg:pr-0'
                  : 'h-10 w-4 scale-0 pr-0 opacity-0 lg:w-12'
              }`}
              >
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="flex items-center gap-2 p-1"
                  aria-label="logout"
                  title="Logout"
                >
                  <SvgIcon
                    className="transition-color h-6 w-6 fill-none stroke-dark p-1 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    {getIconByName(IconName.EXIT)}
                  </SvgIcon>
                  <p className="lg:hidden">{isSignOut ? 'Logout' : ''}</p>
                </button>
              </div>
            )}

            <button
            className='block'
              onClick={
                sessionData?.user
                  ? () => setIsSignOut((state) => !state)
                  : () => void router.push('/auth/signin')
              }
            >
              <div
                className={classNames(
                  'relative h-6 w-6 overflow-hidden rounded-full border border-light bg-primary sm:h-8 sm:w-8 lg:h-10 lg:w-10',
                  {
                    'bg-semi-dark': themeType === ThemeType.Light,
                  },
                )}
              >
                {sessionData?.user ? (
                  <Image
                    src={sessionData?.user?.image ?? avatar}
                    alt={sessionData?.user?.name ?? 'user name'}
                    fill
                  />
                ) : (
                  <SvgIcon
                    className={classNames('px-1 pt-1 fill-light', {
                      'fill-semi-dark': themeType === ThemeType.Dark,
                    })}
                    viewBox="0 0 24 24"
                  >
                    {getIconByName(IconName.AVATAR)}
                  </SvgIcon>
                )}
              </div>
            </button>
          </div>

          <button
            type="button"
            className="flex items-center justify-center p-1"
            onClick={handleThemeChange}
          >
            {themeType === ThemeType.Dark && (
              <SvgIcon className="w-5 h-5 fill-grey transition hover:fill-primary sm:w-6 sm:h-6" viewBox='0 0 21 22'>
                {getIconByName(IconName.MOON)}
              </SvgIcon>
            )}
            {themeType === ThemeType.Light && (
              <SvgIcon className="h-5 w-5 fill-light transition hover:fill-semi-dark sm:h-6 sm:w-6" viewBox='0 0 21 22'>
                {getIconByName(IconName.SUN)}
              </SvgIcon>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
