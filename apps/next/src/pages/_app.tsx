import "raf/polyfill";

import "setimmediate";

import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "react-datepicker/dist/react-datepicker.css";

import { View } from "@showtime-xyz/universal.view";

import Footer from "app/components/footer";
import Header from "app/components/header";
import { withColorScheme } from "app/components/memo-with-theme";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { useHeaderHeight } from "app/lib/react-navigation/elements";
import { AppProviders } from "app/providers/app-providers";
import { CreatorChannelsSettingsScreen } from "app/screens/creator-channels-settings";
import { CreatorTokensExplanationScreen } from "app/screens/creator-tokens-explanation";

import { LoginScreen } from "app/screens/login";
import { OnboardingScreen } from "app/screens/onboarding";

import { ReportScreen } from "app/screens/report";
import { ManifestoScreen } from "app/screens/manifesto";
import { DonationsScreen } from "app/screens/donations";
import { EditPreferencesScreen } from "app/screens/edit-preferences";

import { prevRouteRef } from "app/utilities";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "design-system/toast";

import Script from 'next/script'
import OneSignal from 'react-onesignal';

const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!
const safaraiWebId = process.env.NEXT_PUBLIC_SAFARI_WEB_ID!

function ServiceWorkerScriptTag() {
  return (
    <>
      <Script
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        async={false}
      ></Script>
      {/* <Script src="service.js" /> */}
    </>
  )
}

import "../styles/styles.css";
import { useEffect, useState } from 'react';
import { Alert } from "@showtime-xyz/universal.alert";

function App({ Component, pageProps, router }: AppProps) {
  const meta = pageProps.meta;

  useEffect(() => {
    function setPrevRoute() {
      prevRouteRef.current = router.asPath;
    }
    router.events?.on("routeChangeStart", setPrevRoute);
    return () => {
      router.events?.off("routeChangeStart", setPrevRoute);
    };
  }, [router]);

  const metaTags = meta ? (
    <>
      <title>{meta.title}</title>
      <meta key="title" name="title" content={meta.title} />
      <meta name="description" content={meta.description} />

      <ServiceWorkerScriptTag />

      {/* Open graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@goatsconnect" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:app:name:iphone" content="goatsconnect" />
      <meta name="twitter:app:id:iphone" content="1606611688" />

      {meta.deeplinkUrl && (
        <meta
          name="twitter:app:url:iphone"
          content={"io.goatsconnect://" + meta.deeplinkUrl}
        />
      )}

      <meta name="twitter:app:name:ipad" content="goatsconnect" />
      <meta name="twitter:app:id:ipad" content="1606611688" />

      <meta name="twitter:app:name:googleplay" content="goatsconnect" />
      <meta name="twitter:app:id:googleplay" content="io.goatsconnect" />

      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />

      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {meta.deeplinkUrl && (
        <meta
          name="twitter:app:url:googleplay"
          content={
            `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/` +
            meta.deeplinkUrl
          }
        />
      )}
    </>
  ) : (
    <>
      <title>goatsconnect</title>
      <meta key="title" name="title" content="goatsconnect" />
    </>
  );

  return (
    <>
      <Head>
        {process.env.NODE_ENV !== "development" ? (
          <>
            <link rel="preconnect" href="//showtimenft.wl.r.appspot.com" />
            <link rel="dns-prefect" href="//showtimenft.wl.r.appspot.com" />
            <link rel="preconnect" href="//showtime.b-cdn.net" />
            <link rel="dns-prefect" href="//showtime.b-cdn.net" />
            <link rel="preconnect" href="//lh3.googleusercontent.com" />
            <link rel="dns-prefect" href="//lh3.googleusercontent.com" />
            <link rel="preconnect" href="//res.cloudinary.com" />
            <link rel="dns-prefect" href="//res.cloudinary.com" />
          </>
        ) : null}

        {metaTags}

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" type="image/x-icon" href="https://www.pwabuilder.com/assets/icons/icon_512.png" />
        <link rel="apple-touch-icon" href="https://www.pwabuilder.com/assets/icons/icon_512.png" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="https://www.pwabuilder.com/assets/icons/icon_512.png"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

      </Head>
      <AppProviders>
        <Container>
          <View tw="mx-auto flex-col md:flex-row">
            <Header
              canGoBack={
                router.pathname === "/search" ||
                router.pathname.split("/").length - 1 >= 2
              }
            />

            <View tw="w-full items-center md:ml-auto md:w-[calc(100%-248px)]">
              <NextNProgress
                color="#4F46E5"
                options={{ showSpinner: false }}
                showOnShallow={false}
              />
              <Component {...pageProps} />
            </View>
          </View>
          <Footer />
        </Container>

        <SpeedInsights />

        {/* Modals */}
        <CreatorTokensExplanationScreen />
        <ReportScreen />
        <ManifestoScreen />
        <DonationsScreen />

        <EditPreferencesScreen />

        <CreatorChannelsSettingsScreen />
        <OnboardingScreen />
        {/* Login should be the last so it renders on top of others if needed */}
        <LoginScreen />
        <Toaster />
      </AppProviders>
    </>
  );
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const Container = withColorScheme(
  ({ children }: { children: React.ReactNode }) => {
    const fonts = [inter.variable].join(" ");
    const headerHeight = useHeaderHeight();
    const bottomBarHeight = usePlatformBottomHeight();
    return (
      <View
        tw="bg-white dark:bg-black md:bg-gray-100 dark:md:bg-gray-900"
        // @ts-ignore
        style={{
          paddingTop: headerHeight,
          paddingBottom: `calc(${bottomBarHeight}px + env(safe-area-inset-bottom))`,
        }}
      >
        <div className={fonts}>{children}</div>
      </View>
    );
  }
);

export default App;
