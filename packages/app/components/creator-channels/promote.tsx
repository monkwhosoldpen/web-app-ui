
import { useRef, useMemo, useCallback, Suspense } from "react";
import {
  useWindowDimensions,
  Linking,
  Platform,
  View as RNView,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { BottomSheetModalProvider } from "@showtime-xyz/universal.bottom-sheet";
import { Haptics } from "@showtime-xyz/universal.haptics";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  MoreHorizontal,
  Instagram,
  Download,
  Link,
  ArrowTopRounded,
  GrowthArrow,
  UnLocked,
  CreatorChannelFilled,
  X,
} from "@showtime-xyz/universal.icon";
import { Image } from "@showtime-xyz/universal.image";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { Spinner } from "@showtime-xyz/universal.spinner";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { BottomSheetScrollView } from "app/components/bottom-sheet-scroll-view";
import { ErrorBoundary } from "app/components/error-boundary";
import { useIsInstalledApps, useShareImage } from "app/components/share";
import { useUserProfile } from "app/hooks/api-hooks";
import { createParam } from "app/navigation/use-param";
import {
  getCurrencyPrice,
  getTwitterIntent,
  getWebBaseURL,
} from "app/utilities";

import { breakpoints } from "design-system/theme";
import { toast } from "design-system/toast";

import { ShowtimeBrandLogo } from "../showtime-brand";

type ChannelsPromoteParams = {
  username?: string | undefined;
};
const { useParam } = createParam<ChannelsPromoteParams>();
import { useEffect, useState } from 'react';
import { Analytics, EVENTS } from "app/lib/analytics";
import { useShare } from "app/hooks/use-share";
import { useTranslation } from "react-i18next";

export const ChannelsPromote = () => {
  const [username] = useParam("username");
  const { data: userProfiles } = useUserProfile({
    address: username,
  });
  const profile = useMemo(() => userProfiles?.data?.profile, [userProfiles]);

  const viewRef = useRef<RNView | Node>(null);
  const isDark = useIsDarkMode();
  const { bottom } = useSafeAreaInsets();
  const { shareImageToIG, downloadToLocal, shareOpenMore } =
    useShareImage(viewRef);
  const { isInstalledApps } = useIsInstalledApps();

  const iconColor = isDark ? colors.white : colors.gray[900];
  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];
  const imageWidth = isMdWidth ? 390 : width - 32;
  const imageHeight = imageWidth * (435 / 319);
  const { share } = useShare();

  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  const [img_url, setImg_url] = useState<any>('');
  const [cover_url, setCover_url] = useState<any>('');

  const item = profile;

  const [name, setName] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [bio, setBio] = useState<any>('');
  const [isPremium, setIsPremium] = useState<any>(false);

  const [designation, setDesignation] = useState<any>('');

  useEffect(() => {
    if (item) {
      const nameObj = item?.metadata_with_translations?.name || {};
      const bioObj = item?.metadata_with_translations?.bio || {};
      const name = nameObj[selectedLanguage] || nameObj?.english;
      const bio = bioObj[selectedLanguage] || bioObj?.english;

      const location_code = item?.location_code || '';
      const designation = item?.type && item.type.length > 0 ? item.type[0] : '';
      const translatedDesignation = t(`netaType.${designation}`);
      setDesignation(translatedDesignation);
      setLocation(location_code);
      setName(name);
      setBio(bio);
    }
  }, [selectedLanguage, item]);

  useEffect(() => {

    if (item) {
      const image_url = item.img_url[0];
      const coverUrl = item.cover_url[0];
      setImg_url(image_url);
      setCover_url(coverUrl);
    }
  }, [item]);

  const url = useMemo(
    () => `${getWebBaseURL()}/groups/${username}/`,
    [username]
  );
  const twitterIntent = `Trying the @goatsconnect.com alpha. Join @${username} for latest updates.🪩`;

  const shareWithXIntent = useCallback(() => {
    Linking.openURL(
      getTwitterIntent({
        url: url,
        message: twitterIntent,
      })
    );
  }, [twitterIntent, url]);

  const onCopyLink = useCallback(async () => {
    await Clipboard.setStringAsync(url);
    toast.success("Copied!");
  }, [url]);

  const onShareLinkDevice = useCallback(async () => {
    const result = await share({
      url: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/@${username}`,
    });

    if (result.action === "sharedAction") {
      Analytics.track(
        EVENTS.USER_SHARED_PROFILE,
        result.activityType ? { type: result.activityType } : undefined
      );
    }
  }, [url]);

  const shareButtons = Platform.select({
    web: [
      {
        title: "Share on X",
        Icon: X,
        onPress: shareWithXIntent,
        visable: true,
      },
      {
        title: "Share Link",
        Icon: Link,
        onPress: onShareLinkDevice,
        visable: true,
      },
      {
        title: "Copy Link",
        Icon: Link,
        onPress: onCopyLink,
        visable: true,
      },
    ],
    default: [
      {
        title: "X",
        Icon: X,
        onPress: shareWithXIntent,
        visable: isInstalledApps.twitter,
      },
      {
        title: "Instagram",
        Icon: Instagram,
        onPress: () => shareImageToIG(),
        visable: isInstalledApps.instagram,
      },
      {
        title: "Link",
        Icon: Link,
        onPress: onCopyLink,
        visable: true,
      },
      {
        title: "Save QR",
        Icon: Download,
        onPress: downloadToLocal,
        visable: true,
      },
      {
        title: "More",
        Icon: MoreHorizontal,
        onPress: shareOpenMore,
        visable: true,
      },
    ],
  });

  useEffect(() => {
    if (profile) {
      const image_url = profile.img_url[0];
      // setImg_url(image_url);
      setImg_url(image_url);
    }
  }, [profile]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <View tw="p-4">
            <Spinner />
          </View>
        }
      >
        <View tw="w-full flex-1">
          <BottomSheetModalProvider>
            <BottomSheetScrollView useNativeModal={false}>
              <View tw="web:pb-2 web:self-center select-none items-center justify-center pt-0">
                <View collapsable={false} ref={viewRef as any}>
                  <View
                    style={{
                      width: imageWidth,
                      height: imageHeight - 20,
                    }}
                    tw="my-4 items-center overflow-hidden rounded-t-3xl"
                  >
                    <View tw="mt-0 items-center">
                      <ShowtimeBrandLogo
                        color={isDark ? "#fff" : "#000"}
                        size={16}
                      />
                    </View>
                    <View tw="h-2.5" />
                    <View tw="mt-10 w-full flex-1 px-0">
                      <View tw="flex-row items-center">
                        <Avatar url={img_url} size={70} />
                        <View tw="w-2.5" />
                        <View tw="mt-0 ">
                          <Text tw="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            {name}
                          </Text>
                          <View tw="mt-0 flex-row">
                            <Text tw="mt-2 text-md font-bold text-gray-800 dark:text-gray-200">
                              {designation},  {location}
                            </Text>
                          </View>
                        </View>

                      </View>
                      <View tw="mt-8  rounded-2xl border border-gray-200 px-6 py-8 md:py-8">

                        <View tw="mt-0 flex-row">
                          <Text tw="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {t('sharePage.Title')}
                          </Text>
                          <View
                            tw="relative -right-6 rounded-full"
                            style={{ backgroundColor: "#008F77" }}
                          >
                            <ArrowTopRounded
                              color={"#08F6CC"}
                              width={16}
                              height={16}
                            />
                          </View>
                        </View>
                        {/* <View tw="mt-4 w-full flex-row">
                          <View tw="h-6 w-24 flex-1 items-center justify-center rounded-full bg-[#00E9BF]">
                            <Text tw="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              Option 1
                            </Text>
                          </View>
                          <View tw="w-4" />
                          <View tw="h-6 w-24 flex-1 items-center justify-center rounded-full bg-[#FD749D]">
                            <Text tw="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              Option 2
                            </Text>
                          </View>
                        </View> */}
                        <View tw="web:items-start items-center">
                          <View tw="mt-4 flex-row items-center">
                            <UnLocked
                              color={isDark ? "#fff" : "#000"}
                              width={16}
                              height={16}
                            />
                            <Text tw="ml-2 flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                              {t('sharePage.Line1')}
                            </Text>
                          </View>
                          <View tw="mt-4 flex-row items-center">
                            <CreatorChannelFilled
                              color={isDark ? "#fff" : "#000"}
                              width={16}
                              height={16}
                            />

                            <Text tw="ml-2 flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                              {t('sharePage.Line2')}
                            </Text>
                          </View>
                          <View tw="mt-4 flex-row items-center">
                            <GrowthArrow
                              color={isDark ? "#fff" : "#000"}
                              width={16}
                              height={16}
                            />
                            <Text tw="ml-2 flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                              {t('sharePage.Line3')}

                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheetModalProvider>
          <View
            tw="absolute bottom-0 w-full flex-row border-t border-gray-100 bg-white dark:border-gray-700 dark:bg-black"
            style={{ paddingBottom: Math.max(bottom, 8) }}
          >
            {shareButtons
              .filter((item) => item.visable)
              .map(({ onPress, Icon, title }) => (
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync();
                    onPress();
                  }}
                  tw="flex-1 flex-col items-center justify-center pt-4 md:flex-row"
                  key={title}
                >
                  <Icon height={24} width={24} color={iconColor} />
                  <View tw="h-2 md:w-2" />
                  <Text tw="text-xs font-semibold text-gray-800 dark:text-gray-200 dark:text-white md:text-sm">
                    {title}
                  </Text>
                </Pressable>
              ))}
          </View>
        </View>
      </Suspense>
    </ErrorBoundary>
  );
};
