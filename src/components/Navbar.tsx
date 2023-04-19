import Link from "next/link";
import Image from 'next/image';
import { NavbarLink } from "./NavbarLink";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: sessionData } = useSession();
  
  return (
    <div className="sm:p-6 lg:p-8 lg:w-40 lg:fixed lg:top-0 lg:bottom-0 lg:left-0">
      <div className="bg-semi-dark flex lg:flex-col justify-between p-4 lg:p-7 items-center sm:rounded-xl lg:rounded-[20px] h-full">
        <Link href="/blog/hello-world" className="relative w-6 h-6 sm:w-8 sm:h-8">
          <Image src="./images/logo.svg" alt="site logo" fill/>
        </Link>

        <ul className="flex lg:flex-col gap-2 sm:gap-4 lg:mb-auto lg:mt-16">
          <li>
            <NavbarLink href="/home">
              <path
                d="M1 0h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1Zm0 11h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm-7 11h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-7c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1Z"
              />
            </NavbarLink>
          </li>
          <li>
            <NavbarLink href="/movies">
              <path
                d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z"
              />
            </NavbarLink>
          </li>
          <li>
            <NavbarLink href="/series">
              <path
                d="M9.08 4.481H20V20H0V4.481h4.92l-2.7-3.278L3.78.029 7 3.91 10.22 0l1.56 1.203-2.7 3.278ZM2 6.421v11.64h10V6.42H2Zm15 7.76h-2v-1.94h2v1.94Zm-2-3.88h2V8.36h-2v1.94Z"
              />
            </NavbarLink>
          </li>
          <li>
            <NavbarLink href="/about">
              <path
                d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82V18.52c0 .3-.086.572-.258.82a1.49 1.49 0 0 1-.694.541 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.482c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
              />
            </NavbarLink>
          </li>
        </ul>

        <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-full border-light border relative overflow-hidden">
              {sessionData ? (
                <Image src={sessionData?.user?.image ?? "./images/avatar.svg"} alt={sessionData?.user?.name ?? "user name"} fill />
              ) : (
                <Image src="./images/avatar.svg" alt="profile avatar" fill />
              )}
            </div>
        </button>
      </div>
    </div>
  )
}