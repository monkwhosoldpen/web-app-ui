import { useMemo, useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { yup } from "app/lib/yup";

import { LoginFooter } from "./login-footer";
import { LoginOverlays } from "./login-overlays";
// import type { SubmitWalletParams } from "./use-login";
import { LoginWithGuest } from "./login-with-guest";

import React, { } from 'react';

// import { Challenge as SkipButton } from "./hcaptcha";

interface LoginComponentProps {
  tw?: string;
  handleSubmitEmail: (email: string) => Promise<void>;
  handleSubmitPhoneNumber: (phoneNumber: string) => Promise<void>;
  handleSubmitWallet: (
    params?: any | undefined
  ) => Promise<void>;
  loading: boolean;
}

export function LoginComponent({
  handleSubmitEmail,
  handleSubmitPhoneNumber,
  handleSubmitWallet,
  loading,
  tw = "",
}: LoginComponentProps) {
  //#region state
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  //#endregion

  //#region variables

  const emailValidationSchema = useMemo(
    () =>
      yup
        .object({
          data: yup
            .string()
            .email("Please enter a valid email address.")
            .required("Please enter a valid email address."),
        })
        .required(),
    []
  );

  //#endregion
  return (
    <View tw={tw}>
      <View
        style={[
          styles.tabListItemContainer,
          { display: showEmailLogin ? "flex" : "none" },
        ]}
      >
      </View>
      <View style={{ display: showEmailLogin ? "none" : "flex" }}>
        {/* <LoginHeader /> */}
        <View style={styles.tabListItemContainer}>
          <View tw="mb-[0px]">
            <LandingHero />
          </View>
          <LoginWithGuest />
          <LoginFooter tw="mt-4" />
        </View>
      </View>
      <LoginOverlays loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    minHeight: 400,
  },
  tabListItemContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flex: 1,
    paddingTop: 16,
  },
});

import { useTranslation } from "react-i18next";


import { useIsDarkMode } from "@showtime-xyz/universal.hooks";

import { BottomSheetScrollView } from "app/components/bottom-sheet-scroll-view";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";

import { ShowtimeRounded } from "@showtime-xyz/universal.icon";
import { colors } from "@showtime-xyz/universal.tailwind";

const LandingHero = () => {
  const bottomBarHeight = usePlatformBottomHeight();
  const { i18n, t } = useTranslation();
  const [serviceIdx, setServiceIdx] = useState(3);

  const landingTextMap: any = {
    0: "landing.latestContent",
    1: "landing.stayUpdated",
    2: "landing.connectWithNetas",
    3: "landing.authenticInfo",
    4: "landing.shareWithFans",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIdx((prevServiceIdx) => (prevServiceIdx === 3 ? 0 : prevServiceIdx + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isDark = useIsDarkMode();

  return (
    <>
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingBottom: Math.max(bottomBarHeight, 16),
        }}
      >
        <>
          <View tw="flex justify-center items-center mt-0 mb-4">
            <Text tw="text-2xl md:text-3xl px-0">
              <Text tw="uppercase font-bold" style={{ color: "#007ACC" }}>
                {t(landingTextMap[serviceIdx])} {" "}
              </Text>
            </Text>
          </View>
        </>

        <View tw="h-8" />

        <View tw="flex-1 items-center justify-center px-6 pb-0">
          <ShowtimeRounded
            width={210}
            height={210}
            color={isDark ? colors.white : colors.gray[900]}
          />
        </View>
      </BottomSheetScrollView>
    </>
  );
};
