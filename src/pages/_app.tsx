import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/Layout";
import { useRouter } from "next/router";
import React from "react";
import { ThemeProvider } from "~/utils/ThemeContext";

const outfitBody = Outfit({
  weight: ["300"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--body-font",
});

const outfitHeading = Outfit({
  weight: ["500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--display-font",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const LayoutComponent = router.pathname === '/auth/signin' ? React.Fragment : Layout;

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <LayoutComponent>
          <Component
            className={`${outfitBody.variable} ${outfitHeading.variable}`}
            {...pageProps}
          />
        </LayoutComponent>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
