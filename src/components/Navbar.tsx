/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from 'next/image';
import { NavbarLink } from "./NavbarLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconName, getIconByName } from "~/utils/getIconByName";
import { SvgIcon } from "./SvgIcon";
import avatar from '../../public/images/avatar.svg';
import { useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";

export const Navbar = () => {
  const [isSignOut, setIsSignOut] = useState(false);
  const { data: sessionData } = useSession();
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
      <div className="bg-semi-dark flex lg:flex-col justify-between p-4 lg:p-7 items-center sm:rounded-xl lg:rounded-[20px] h-full">
        <Link href="/">
          <SvgIcon 
            className="h-6 w-6 sm:w-8 sm:h-8 fill-primary hover:opacity-75 transition"
            viewBox="0 0 32 26"
          >
            {getIconByName(IconName.LOGO)}
          </SvgIcon>
        </Link>

        <ul className="flex lg:flex-col gap-2 sm:gap-4 lg:mb-auto lg:mt-16">
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
