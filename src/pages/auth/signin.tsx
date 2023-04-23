/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import google from '../../../public/images/google.svg';
import github from '../../../public/images/github.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

// void signIn()

const SignIn = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="flex flex-col bg-semi-dark px-10 pt-10 pb-16 rounded-lg w-1/4 mt-12">
        <h1 className="font-light text-3xl text-center mb-12">
          Login
        </h1>

        <div className="flex flex-col gap-y-6">
          <button 
            type="button" 
            className="flex gap-x-5 justify-center items-center border border-grey rounded-lg w-full py-3"
            onClick={() => void signIn('google', { callbackUrl: 'http://localhost:3000' })}
          >
            <Image src={google} alt="google" width="28" height="28" />
            Login with Google
          </button>

          <button 
            type="button" 
            className="flex gap-x-5 justify-center items-center border border-grey rounded-lg w-full py-3"
            onClick={() => void signIn('github', { callbackUrl: 'http://localhost:3000' })}
          >
          <Image src={github} alt="google" width="28" height="28" />
            Login with GitHub
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default SignIn;
