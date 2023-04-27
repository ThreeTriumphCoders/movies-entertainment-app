import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Outfit } from 'next/font/google';

import { api } from '~/utils/api';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Layout } from '~/components/Layout';
import { BookmarksContextProvider } from '~/contexts/useBookmarks';
import '~/styles/globals.css';

const queryClient = new QueryClient();

const outfitBody = Outfit({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--body-font',
});

const outfitHeading = Outfit({
  weight: ['500'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--display-font',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const LayoutComponent =
    router.pathname === '/auth/signin' ? Fragment : Layout;

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <BookmarksContextProvider>
          <LayoutComponent>
            <Component
              className={`${outfitBody.variable} ${outfitHeading.variable}`}
              {...pageProps}
            />
          </LayoutComponent>
        </BookmarksContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
