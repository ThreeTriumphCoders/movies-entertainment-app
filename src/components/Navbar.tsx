import Link from "next/link";
import Image from 'next/image';
import { NavbarLink } from "./NavbarLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconName, getIconByName } from "~/utils/getIconByName";
import { SvgIcon } from "./SvgIcon";

export const Navbar = () => {
  const { data: sessionData } = useSession();
  
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

        <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-full border-light border relative overflow-hidden">
              {sessionData ? (
                <Image src={sessionData?.user?.image ?? "./images/avatar.svg"} alt={sessionData?.user?.name ?? "user name"} fill />
              ) : (
                <Image src="./images/avatar.svg" alt="profile avatar" fill className="p-0.5"/>
              )}
            </div>
        </button>
      </div>
    </div>
  )
}
