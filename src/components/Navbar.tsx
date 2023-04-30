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

export const Navbar = () => {
  const [isSignOut, setIsSignOut] = useState(false);
  const { data: sessionData } = useSession();
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
      <div className="flex h-full items-center justify-between bg-semi-dark p-4 sm:rounded-xl lg:flex-col lg:rounded-[20px] lg:p-7">
        <Link href="/">
          <SvgIcon
            className="h-6 w-6 fill-primary transition hover:opacity-75 sm:h-8 sm:w-8"
            viewBox="0 0 32 26"
          >
            {getIconByName(IconName.LOGO)}
          </SvgIcon>
        </Link>

        <ul className="flex gap-2 sm:gap-4 lg:mb-auto lg:mt-16 lg:flex-col">
          <li>
            <NavbarLink href="/">{getIconByName(IconName.HOME)}</NavbarLink>
          </li>
          <li>
            <NavbarLink href="/movies">
              {getIconByName(IconName.MOVIE)}
            </NavbarLink>
          </li>
          <li>
            <NavbarLink href="/series">{getIconByName(IconName.TV)}</NavbarLink>
          </li>
          {sessionData && (
            <li>
              <NavbarLink href="/bookmarks">
                {getIconByName(IconName.BOOKMARK)}
              </NavbarLink>
            </li>
          )}
        </ul>

        {sessionData && (
          <div
            className={`
            absolute right-[13px] flex flex-nowrap items-center rounded-full bg-primary text-dark
            transition-all hover:bg-light lg:bottom-14 lg:right-14 lg:items-start lg:justify-center
            ${
              isSignOut
                ? 'h-10 w-32 scale-100 pr-8 opacity-100 sm:w-36 lg:h-24 lg:w-12 lg:pr-0'
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
          onClick={
            sessionData
              ? () => setIsSignOut((state) => !state)
              : () => void router.push('/auth/signin')
          }
        >
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-light bg-primary sm:h-8 sm:w-8 lg:h-10 lg:w-10">
            {sessionData ? (
              <Image
                src={sessionData?.user?.image ?? avatar}
                alt={sessionData?.user?.name ?? 'user name'}
                fill
              />
            ) : (
              <Image
                src={avatar}
                alt="profile avatar"
                fill
                className="p-0.5"
                sizes="33vw"
              />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
