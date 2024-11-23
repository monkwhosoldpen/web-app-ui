import React, { forwardRef, useImperativeHandle } from "react";
import {
  useCallback,
  useEffect,
  memo,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
import { Platform, useWindowDimensions } from "react-native";

import { Button } from "@showtime-xyz/universal.button";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { ChevronRight, InformationCircle, Lock, ShowtimeRounded, UnLocked } from "@showtime-xyz/universal.icon";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useRouter } from "@showtime-xyz/universal.router";
import { TabScrollView } from "@showtime-xyz/universal.tab-view";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View, ViewProps } from "@showtime-xyz/universal.view";

import { List } from "app/hooks/api-hooks";
import {
  useCreatorTokenCoLlected,
  useCreatorTokenCollectors,
} from "app/hooks/creator-token/use-creator-tokens";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { useUser } from "app/hooks/use-user";
import { useScrollToTop } from "app/lib/react-navigation/native";
import { Profile } from "app/types";
import { formatNumber } from "app/utilities";

import { ChannelPermissions } from "../creator-channels/types";
import { TopCreatorTokenItem, TopCreatorTokenItemOnProfile, TopCreatorTokenSkeleton } from "../creator-token/creator-token-users";
import { EmptyPlaceholder } from "../empty-placeholder";
import { useTranslation } from "react-i18next";
import { breakpoints } from "design-system/theme";
import { useChannelById } from "../creator-channels/hooks/use-channel-detail";
import { useRedirectToCreatorTokenSocialShare } from "app/hooks/use-redirect-to-creator-token-social-share-screen";
import { toast } from "design-system/toast";
import * as Clipboard from "expo-clipboard";

type TabListProps = {
  profile?: Profile;
  isPremiumGoat: any;
  isBlocked?: boolean;
  list: List;
  index: number;
};
export type ProfileTabListRef = {
  refresh: () => void;
};
export const TokensTabHeader = ({
  channelId,
  isPremiumGoat,
  isService,
  isSelf,
  messageCount,
  channelPermissions,
}: {
  channelId: number | null | undefined | any;
  messageCount?: number | null;
  isPremiumGoat: boolean;
  isService: boolean;
  isSelf: boolean;
  channelPermissions?: ChannelPermissions | null;
}) => {

  const router = useRouter();
  const { t, i18n } = useTranslation();

  const showManifestoModal = useMemo(() => {
    const handleButtonClick = () => {
      router.push(
        {
          pathname: Platform.OS === 'web' ? `/@${channelId}/read` : `/@${channelId}/read`,
        },
      );
    };

    return handleButtonClick;
  }, [router]);

  const showReadModal = useMemo(() => {
    const handleButtonClick = () => {
      router.push(
        {
          pathname: Platform.OS === 'web' ? `/@${channelId}/read` : `/@${channelId}/read`,
        },
      );
    };

    return handleButtonClick;
  }, [router]);

  const windowDimension = useWindowDimensions();
  const channelDetail = useChannelById(channelId);
  const isMdWidth = windowDimension.width >= breakpoints["md"];

  const redirectToCreatorTokenSocialShare =
    useRedirectToCreatorTokenSocialShare();

  const shareLink = useCallback(async () => {
    const username = channelDetail.data?.owner.username;
    if (isMdWidth) {
      await Clipboard.setStringAsync(
        `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/@${username}`
      );
      toast.success("Copied!");
    } else {
      redirectToCreatorTokenSocialShare(username);
    }
  }, [
    channelDetail.data?.owner.username,
    isMdWidth,
    redirectToCreatorTokenSocialShare,
  ]);

  return (
    <View tw="w-full px-4">

      {channelId ? (
        <View tw="mt-4 md:mt-0 mb-2 md:mb-4 w-full flex-row items-center justify-between rounded-xl border border-gray-200 bg-green-700 px-4 py-3 dark:border-transparent">
          <Text tw="flex-1 text-sm text-white">
            {t('profilePage.exploreChannel')}
          </Text>
          <Button
            onPress={() => {
              router.push(`/groups/${channelId}`);
            }}
            theme="dark"
            tw="ml-2"
          >
            {t('profilePage.chat')}
          </Button>
        </View>
      ) : null}

      {
        (isPremiumGoat) && <>
          <View tw="mb-2 mt-2 rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <View tw="items-center gap-2">
              {
                !isService && <>
                  <View tw="w-full flex-row items-center justify-between">
                    <View tw="flex-row items-center">
                      <Text tw="mr-2 text-gray-500 dark:text-gray-300">
                        {t('profilePage.shareText')}
                      </Text>
                    </View>
                    <Button
                      onPress={shareLink}
                      theme="dark"
                      tw="ml-2"
                    >
                      {t('profilePage.share')}
                    </Button>
                  </View>

                  <View tw="w-full flex-row items-center justify-between">
                    <View tw="flex-row items-center">
                      <Text tw="mr-2 text-gray-500 dark:text-gray-300">
                        {t('profilePage.exploreManifesto')}
                      </Text>
                    </View>
                    <Button
                      onPress={showManifestoModal}
                      theme="dark"
                      tw="ml-2"
                    >
                      {t('profilePage.view')}
                    </Button>
                  </View>

                  {/* <View tw="w-full flex-row items-center justify-between">
                <View tw="flex-row items-center">
                  <Text tw="mr-2 text-gray-500 dark:text-gray-300">
                    {t('profilePage.donateText')}
                  </Text>
                </View>
                <Button
                  onPress={showDonationsModal}
                  theme="dark"
                  tw="ml-2"
                >
                  {t('profilePage.donate')}
                </Button>
              </View> */}

                  <View tw="w-full flex-row items-center justify-between">
                    <View tw="flex-row items-center">
                      <Text tw="mr-2 text-gray-500 dark:text-gray-300">
                        {t('profilePage.readTitle')}
                      </Text>
                    </View>
                    <Button
                      onPress={showReadModal}
                      theme="dark"
                      tw="ml-2"
                    >
                      {t('profilePage.read')}
                    </Button>
                  </View>
                </>
              }

              {
                isService && <>
                  <View tw="w-full flex-row items-center justify-between">
                    <View tw="flex-row items-center">
                      <Text tw="mr-2 text-gray-500 dark:text-gray-300">
                        {t('profilePage.shareText')}
                      </Text>
                    </View>
                    <Button
                      onPress={shareLink}
                      theme="dark"
                      tw="ml-2"
                    >
                      {t('profilePage.share')}
                    </Button>
                  </View>
                </>
              }
            </View>
          </View>
        </>
      }

      {
        !isPremiumGoat && <>
          <View tw="rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <View tw="items-center gap-2">

              <View tw="w-full flex-row items-center justify-between">
                <View tw="flex-row items-center">
                  <Text tw="mr-2 text-gray-500 dark:text-gray-300">
                    {t('profilePage.shareText')}
                  </Text>
                </View>
                <Button
                  onPress={shareLink}
                  theme="dark"
                  tw="ml-2"
                >
                  {t('profilePage.share')}
                </Button>
              </View>
            </View>
          </View>
        </>
      }
    </View>
  );
};

export const CreatorTokenCollectors = ({
  profileId,
  username,
  name,
  ...rest
}: {
  profileId: number | undefined;
  username: string | undefined;
  name: string | undefined;
} & ViewProps) => {
  const router = useRouter();
  const { data, count, isLoading } = useCreatorTokenCollectors(profileId);
  if ((!data?.length || data?.length === 0) && !isLoading) {
    return null;
  }
  return (
    <View {...rest}>
      <View tw="flex-row items-center justify-between py-4">
        <Text tw="text-13 font-semibold text-gray-900 dark:text-gray-50">
          Free Channels
        </Text>
        {/* {true ? (
          <Text
            onPress={() => {
              const as = `/creator-token/${profileId}/collected`;
              console.log(as);
            }}
            tw="text-xs font-semibold px-4 text-gray-500 dark:text-gray-50"
          >
            Show all
          </Text>
        ) : null} */}
      </View>
      {/* <View tw="h-2" /> */}
      <View tw="flex-row flex-wrap items-center gap-x-4 gap-y-2">
        {data?.map((item, i) => {
          return (
            <TopCreatorTokenItemOnProfile
              item={item}
              key={i}
              style={{ width: "45%" }}
              showName
            />
          );
        })}
      </View>
    </View>
  );
};

export const CreatorTokenCollected = ({
  profileId,
  username,
  name,
  ...rest
}: {
  profileId: number | undefined;
  username: string | undefined;
  name: string | undefined;
} & ViewProps) => {
  const router = useRouter();
  const { data, count, isLoading } = useCreatorTokenCoLlected(profileId);
  if ((!data?.length || data?.length === 0) && !isLoading) {
    return null;
  }
  return (
    <View {...rest}>
      <View tw="flex-row items-center justify-between py-4">
        <Text tw="text-13 font-semibold text-gray-900 dark:text-gray-50">
          Premium Channels
        </Text>
        {/* {true ? (
          <Text
            onPress={() => {
              const as = `/creator-token/${profileId}/collected`;
              console.log(as);
            }}
            tw="text-xs font-semibold px-4 text-gray-500 dark:text-gray-50"
          >
            Show all
          </Text>
        ) : null} */}
      </View>
      {/* <View tw="h-2" /> */}
      <View tw="flex-row flex-wrap items-center gap-x-4 gap-y-2">
        {data?.map((item, i) => {
          return (
            <TopCreatorTokenItemOnProfile
              item={item}
              key={i}
              style={{ width: "45%" }}
              showName
            />
          );
        })}
      </View>
    </View>
  );
};
export const TokensTab = forwardRef<
  ProfileTabListRef,
  TabListProps & {
    channelId: number | null | undefined;
    messageCount?: number | null;
    channelPermissions?: ChannelPermissions | null;
    isSelf: boolean;
  }
>(function ProfileTabList(
  { profile, isBlocked, list, index, channelId, messageCount, isSelf },
  ref
) {
  const isDark = useIsDarkMode();
  const profileId = profile?.profile_id;
  const username = profile?.username;
  const { user } = useUser();
  const listRef = useRef(null);
  const channelPermissions = useMemo(() => {
    return profile?.channels?.[0]?.permissions;
  }, [profile?.channels]);

  const bottomHeight = usePlatformBottomHeight();
  useScrollToTop(listRef);
  useImperativeHandle(ref, () => ({
    refresh: () => { },
  }));

  if (isBlocked) {
    return (
      <TabScrollView
        contentContainerStyle={{ marginTop: 48, alignItems: "center" }}
        index={index}
        ref={listRef}
      >
        <EmptyPlaceholder
          title={
            <Text tw="text-gray-900 dark:text-white">
              <Text tw="font-bold">@{username}</Text> is blocked
            </Text>
          }
          hideLoginBtn
        />
      </TabScrollView>
    );
  }

  return (
    <>
      <TabScrollView
        contentContainerStyle={{ paddingBottom: bottomHeight + 56 }}
        index={index}
        ref={listRef}
      >
        <TokensTabHeader
          channelId={channelId}
          isSelf={isSelf}
          messageCount={messageCount}
          channelPermissions={channelPermissions}
        />
        <View tw="px-4">
          <CreatorTokenCollectors
            profileId={profileId}
            name={profile?.name}
            username={username}
          />
          <CreatorTokenCollected
            profileId={profileId}
            name={profile?.name}
            username={username}
          />
        </View>
      </TabScrollView>
    </>
  );
});
