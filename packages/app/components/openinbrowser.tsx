'use client'

import { View } from "@showtime-xyz/universal.view";
import { useEffect } from "react";

import { Accordion } from "@showtime-xyz/universal.accordion";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Apple, GoogleOriginal } from "@showtime-xyz/universal.icon";
import { colors } from "@showtime-xyz/universal.tailwind";

import { Text } from "@showtime-xyz/universal.text";
import { Button } from "@showtime-xyz/universal.button";
import React, { } from 'react';

import { DESKTOP_CONTENT_WIDTH, DESKTOP_LEFT_MENU_WIDTH } from "app/constants/layout";

import { Image } from "@showtime-xyz/universal.image";
import { useTranslation } from "react-i18next";

// If you're using a web project, import Link from your router library or use a tag instead of TouchableOpacity

import { breakpoints } from "design-system/theme";
import {
  useWindowDimensions,
} from "react-native";

import { Twitter, ShowtimeRounded } from "@showtime-xyz/universal.icon";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";

import { ShowtimeBrandLogo } from "./showtime-brand";
import { ShowPermissionsNotifications } from "./serviceWorkerSettings";

export const OpenInBrowser = () => {
  const isDark = useIsDarkMode();
  const bottomBarHeight = usePlatformBottomHeight();
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );
  if (!isVisible) {
    return <>
      <View tw="">
        <DownloadPWAHelper />
        <PromptNotVisible />
        <ShowPermissionsNotifications />
      </View>
    </>;
  }
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
          Download here
        </Text>
        <View tw="h-8" />
        <Text tw="text-center text-base font-medium text-gray-500 dark:text-gray-400">

          Need help?

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
            promptToInstall()
          }}
        >
          <>
            <Twitter color="white" width={24} height={24} />
            <Text tw="ml-1 text-base font-bold text-white">
              Download APP(PWA)
            </Text>
          </>
        </Button>
      </View>
    </>
  );
};


interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function useAddToHomescreenPrompt(): [
  IBeforeInstallPromptEvent | null,
  () => void
] {
  const [prompt, setState] = React.useState<IBeforeInstallPromptEvent | null>(
    null
  );

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  React.useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener("beforeinstallprompt", ready as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready as any);
    };
  }, []);

  return [prompt, promptToInstall];
}

// If you're using a web project, import Link from your router library or use a tag instead of TouchableOpacity

const PromptNotVisible = () => {
  return (
    <>
      <View tw="my-2 py-2 items-center flex">
        <View tw="flex-row items-center justify-between py-2">
          Prompt not Visible
        </View>
      </View>
      {/* <DownloadPWAHelper /> */}
    </>
  );
};

const DownloadPWAHelper = () => {
  const isDark = useIsDarkMode();
  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];

  const pagerWidth = isMdWidth
    ? Math.min(DESKTOP_CONTENT_WIDTH, width - DESKTOP_LEFT_MENU_WIDTH)
    : width - 32;

  const { t } = useTranslation();

  const isSelectedAndroid = true;
  const isSelectedApple = false;

  return (
    <View>
      <View tw="px-4 pb-8 pt-4">
        <Text tw="text-lg text-gray-900 dark:text-white">
          Select your Device
        </Text>
      </View>
      <View tw="h-px bg-gray-100 dark:bg-gray-800" />
      <Accordion.Root>
        <Accordion.Item value={isSelectedAndroid ? "open" : "close"}>
          <Accordion.Trigger>
            <View tw="w-full flex-row items-center justify-between pr-1">
              <Text tw="flex-1 text-sm font-medium text-gray-900 dark:text-white">
                <GoogleOriginal
                  width={30}
                  height={30}
                  color={isDark ? colors.white : colors.gray[900]}
                />
              </Text>
              <Accordion.Chevron rotazeZ={["right", "bottom"]} />
            </View>
          </Accordion.Trigger>
          <Accordion.Content tw="pt-0">
            <>
              <View tw="mt-4  w-full items-center">

                <View tw="mb-2 mt-2  w-full rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <View tw="items-center gap-2">
                    <View tw="mt-0 ">
                      <Text tw="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Step: 1
                      </Text>
                      <View tw="mt-0 flex-row">
                        <Text tw="mt-2 text-md font-bold text-gray-800 dark:text-gray-200">
                          Click on button in browser
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: "/assets/pwa_android.png" }}
                      width={pagerWidth}
                      height={pagerWidth * 2}
                      tw="rounded-md duration-150 hover:scale-105"
                      alt="Play Store"
                    />
                  </View>
                </View>

                <View tw="mb-2 mt-2  w-full rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <View tw="items-center gap-2">
                    <View tw="mt-0 ">
                      <Text tw="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Step: 2
                      </Text>

                      <View tw="mt-0 flex-row">
                        <Text tw="mt-2 text-md font-bold text-gray-800 dark:text-gray-200">
                          Click on Add to Home screen
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: "/assets/pwa_ios.png" }}
                      width={pagerWidth}
                      height={pagerWidth * 2}
                      tw="rounded-md duration-150 hover:scale-105"
                      alt="App Store"
                    />

                  </View>
                </View>
              </View>
            </>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value={isSelectedApple ? "open" : "close"}>
          <Accordion.Trigger>
            <View tw="w-full flex-row items-center justify-between pr-1">
              <Text tw="flex-1 text-sm font-medium text-gray-900 dark:text-white">
                <Apple
                  width={30}
                  height={30}
                  color={isDark ? colors.white : colors.gray[900]}
                />
              </Text>
              <Accordion.Chevron rotazeZ={["right", "bottom"]} />
            </View>
          </Accordion.Trigger>
          <Accordion.Content tw="pt-0">
            <>
              <View tw="mt-4  w-full items-center">

                <View tw="mb-2 mt-2  w-full rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <View tw="items-center gap-2">
                    <View tw="mt-0 ">
                      <Text tw="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Step: 1
                      </Text>
                      <View tw="mt-0 flex-row">
                        <Text tw="mt-2 text-md font-bold text-gray-800 dark:text-gray-200">
                          Click on button in browser
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: "/assets/pwa_android.png" }}
                      width={pagerWidth}
                      height={pagerWidth * 2}
                      tw="rounded-md duration-150 hover:scale-105"
                      alt="Play Store"
                    />
                  </View>
                </View>

                <View tw="mb-2 mt-2  w-full rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <View tw="items-center gap-2">
                    <View tw="mt-0 ">
                      <Text tw="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Step: 2
                      </Text>

                      <View tw="mt-0 flex-row">
                        <Text tw="mt-2 text-md font-bold text-gray-800 dark:text-gray-200">
                          Click on Add to Home screen
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: "/assets/pwa_ios.png" }}
                      width={pagerWidth}
                      height={pagerWidth * 2}
                      tw="rounded-md duration-150 hover:scale-105"
                      alt="App Store"
                    />
                  </View>
                </View>
              </View>
            </>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </View>
  );
};
