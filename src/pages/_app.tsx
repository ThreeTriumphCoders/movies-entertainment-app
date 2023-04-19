import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

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
  return (
    <SessionProvider session={session}>
      <Component
        className={`${outfitBody.variable} ${outfitHeading.variable}`}
        {...pageProps}
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
