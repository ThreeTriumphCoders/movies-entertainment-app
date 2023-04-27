/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import google from '../../../public/images/google.svg';
import github from '../../../public/images/github.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Loader } from '~/components/Loader';
import { SvgIcon } from '~/components/SvgIcon';
import { IconName, getIconByName } from '~/utils/getIconByName';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: process.env.NEXTAUTH_URL });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-20 justify-center items-center bg-dark h-screen">
      {isLoading
        ? <Loader />
        : (
          <>
            <SvgIcon className='fill-primary w-8 h-8' viewBox='0 0 32 32'>
              {getIconByName(IconName.LOGO)};
            </SvgIcon>

            <div className="flex flex-col bg-semi-dark px-8 pt-8 pb-28 rounded-3xl w-4/5 sm:w-1/2 lg:w-1/3 xl:w-1/4 font-body text-light">
              <h1 className="font-body text-3xl text-center mb-16">
                Login
              </h1>

              <div className="flex flex-col gap-y-6">
                <button 
                  type="button" 
                  className="flex gap-x-5 justify-center items-center font-light border border-grey rounded-lg w-full py-4 hover:bg-primary hover:border-primary hover:text-dark transition-all"
                  onClick={() => void handleSignIn('google')}
                >
                  <Image src={google} alt="google" width="28" height="28" />
                  Login with Google
                </button>

                <button 
                  type="button" 
                  className="flex gap-x-5 justify-center items-center font-light border border-grey rounded-lg w-full py-4 hover:bg-primary hover:border-primary hover:text-dark transition-all"
                  onClick={() => void handleSignIn('github')}
                >
                <Image src={github} alt="google" width="28" height="28" />
                  Login with GitHub
                </button>
              </div>
            </div>
          </>
        )}
    </section>
  );
};

export default SignIn;
