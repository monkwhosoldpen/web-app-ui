import React, { useCallback, useMemo } from "react";
import { Linking } from "react-native";

import * as Clipboard from "expo-clipboard";
import { createParam } from "solito";

import { BottomSheetModalProvider } from "@showtime-xyz/universal.bottom-sheet";
import { Button } from "@showtime-xyz/universal.button";
import { Haptics } from "@showtime-xyz/universal.haptics";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Congrats, Twitter, Link, ShowtimeRounded, ShowtimeBrand } from "@showtime-xyz/universal.icon";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { useShare } from "app/hooks/use-share";
import { Analytics, EVENTS } from "app/lib/analytics";
import { getTwitterIntent, getWebBaseURL } from "app/utilities";

import { toast } from "design-system/toast";
import { useTranslation } from "react-i18next";
import { ShowtimeBrandLogo } from "./showtime-brand";

type Query = {
  channelId: string;
};
const { useParam } = createParam<Query>();

export const OpenedInPWA = () => {
  const isDark = useIsDarkMode();
  const [channelId] = useParam("channelId");

  const { t, i18n } = useTranslation();

  const { share, canShare } = useShare();
  const bottomBarHeight = usePlatformBottomHeight();
  const url = useMemo(
    () => `${getWebBaseURL()}`,
    [channelId]
  );
  const shareWithTwitterIntent = useCallback(() => {
    Linking.openURL(
      getTwitterIntent({
        url: url,
        message: `Please get the Latest Updates from Netas on goatsconnect.com `,
      })
    );
  }, [url]);
  const onCopyLink = useCallback(async () => {
    await Clipboard.setStringAsync(url.toString());
    toast.success("Copied!");
  }, [url]);

  const shareLink = async () => {
    const result = await share({
      url,
    });
    if (result.action === "sharedAction") {
      Analytics.track(
        EVENTS.USER_SHARED_PROFILE,
        result.activityType ? { type: result.activityType } : undefined
      );
    }
  };
  return (
    <>
      <View tw="flex-1 items-center justify-center px-6 pb-4">
        <View tw="mt-0 items-center my-10">
          <ShowtimeBrandLogo
            color={isDark ? "#fff" : "#000"}
            size={20}
          />
        </View>
        <ShowtimeRounded
          width={210}
          height={210}
          color={isDark ? colors.white : colors.gray[900]}
        />
        <View tw="h-10" />
        <Text
          tw="text-center font-bold text-gray-900 dark:text-white"
          style={{ fontSize: 24 }}
        >
          {t('ThanksPage.UsingApp')}
        </Text>
        <View tw="h-8" />
        <Text tw="text-center text-base font-medium text-gray-500 dark:text-gray-400">

          {t('ThanksPage.ShareMessage')}

        </Text>
      </View>
      <View
        tw="mt-8 w-full px-4"
        style={{
          paddingBottom: Math.max(bottomBarHeight + 8, 24),
        }}
      >
        <Button
          size="regular"
          style={{ backgroundColor: colors.twitter }}
          onPress={() => {
            Haptics.impactAsync();
            shareWithTwitterIntent();
          }}
        >
          <>
            <Twitter color="white" width={24} height={24} />
            <Text tw="ml-1 text-base font-bold text-white">
              {t('ThanksPage.shareTwitter')}
            </Text>
          </>
        </Button>
        <View tw="h-4" />
        <View tw="w-full flex-row">
          <Button
            size="regular"
            tw="flex-1"
            onPress={() => {
              Haptics.impactAsync();
              shareLink();
            }}
          >
            <>
              <Text tw="ml-1 text-base font-bold text-white dark:text-gray-900">
                {t('ThanksPage.shareLink')}
              </Text>
            </>
          </Button>
          {canShare && (
            <Button
              size="regular"
              tw="ml-4"
              iconOnly
              onPress={() => {
                Haptics.impactAsync();
                onCopyLink();
              }}
            >
              <Link />
            </Button>
          )}
        </View>
      </View>
    </>
  );
};
