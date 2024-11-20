import React from "react";
import { MotiView } from "moti";
import {
  ShowtimeRounded,
} from "@showtime-xyz/universal.icon";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";
import { Challenge as SkipButton } from "./hcaptcha";
import { colors } from "@showtime-xyz/universal.tailwind";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useTranslation } from "react-i18next";

export const SelectSocial = ({ channelId }: { channelId: string }) => {
  const isDark = useIsDarkMode();
  const { t, i18n } = useTranslation();
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={() => {
        "worklet";
        return {
          opacity: 0,
          scale: 0.9,
        };
      }}
      exitTransition={{
        type: "timing",
        duration: 600,
      }}
      style={{ flex: 1 }}
    >
      <View tw="flex-1 px-4 text-center">
        <View tw="items-center">
          <Text tw="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('Onboarding.Title')}
          </Text>
          <View tw="h-4" />
          <Text tw="text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            {t('Onboarding.SubTitle')}
          </Text>
        </View>
        <View tw="h-8" />
        <View tw="my-0 flex flex-grow-0">
          <View tw="flex-1 mb-0 items-center justify-center px-6 pb-0">
            <ShowtimeRounded
              width={180}
              height={180}
              color={isDark ? colors.white : colors.gray[900]}
            />
          </View>
          <View tw="h-4" />
          <SkipButton channelId={channelId} />
        </View>
      </View>
    </MotiView>
  );
};
