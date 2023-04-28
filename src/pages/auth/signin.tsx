/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type NextPage } from 'next';
import { type BuiltInProviderType } from 'next-auth/providers';
import { signIn, useSession, type LiteralUnion } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { env } from 'process';
import { useEffect } from 'react';
import { Loader } from '~/components/Loader';
import { SvgIcon } from '~/components/SvgIcon';
import { IconName, getIconByName } from '~/utils/getIconByName';
import github from '../../../public/images/github.svg';
import google from '../../../public/images/google.svg';

const buttonClasses =
  'flex w-full items-center justify-center gap-x-5 rounded-lg border border-grey py-4 font-light transition-all hover:border-primary hover:bg-primary hover:text-dark font-medium';

const SignIn: NextPage = ({}) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectToHomePage = async () => {
      if (status === 'authenticated') {
        await router.push('/').catch(() => console.error('error occured'));
      }
    };

    redirectToHomePage().catch((err) => console.error(err));
  }, [status]);

  const handleSignInClick = (provider: LiteralUnion<BuiltInProviderType>) => {
    signIn(provider, {
      callbackUrl: env.NEXTAUTH_URL,
    }).catch((err) => console.error(err));
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-20 bg-dark">
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Link href="/">
            <SvgIcon className="h-8 w-8 fill-primary" viewBox="0 0 32 32">
              {getIconByName(IconName.LOGO)};
            </SvgIcon>
          </Link>

          <div className="flex w-4/5 flex-col rounded-3xl bg-semi-dark px-8 pb-28 pt-8 font-body text-light sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <h1 className="mb-16 text-center font-body text-3xl">Login</h1>

            <div className="flex flex-col gap-y-6">
              <button
                type="button"
                className={buttonClasses}
                onClick={() => void handleSignInClick('google')}
              >
                <Image src={google} alt="google" width="28" height="28" />
                Login with Google
              </button>

              <button
                type="button"
                className={buttonClasses}
                onClick={() => void handleSignInClick('github')}
              >
                <Image src={github} alt="google" width="28" height="28" />
                Login with GitHub
              </button>

              <Link
                href="/"
                className="text-center transition-all hover:text-primary"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SignIn;
