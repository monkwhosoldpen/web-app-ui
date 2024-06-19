import { memo } from "react";
import { Platform, useWindowDimensions } from "react-native";

import { ResizeMode } from "expo-av";

import { VerificationBadge } from "@showtime-xyz/universal.verification-badge";
import { View, ViewProps } from "@showtime-xyz/universal.view";
import { useMemo } from "react";

import { DESKTOP_CONTENT_WIDTH } from "app/constants/layout";
import { NFT } from "app/types";

import { breakpoints } from "design-system/theme";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { useFollow } from "app/hooks/use-follow";
import { FollowButton } from "../follow-button";
import { PressableScale } from "@showtime-xyz/universal.pressable-scale";
import { FollowButtonSmall } from "../follow-button-small";
import { Avatar } from "@showtime-xyz/universal.avatar";

type TrendingItemProps = ViewProps & {
  index: number;
  nft: NFT;
  width?: number;
  numColumns: number;
  tw?: string;
  filter?: "all" | "music";
  setArticle: any;
  goTo: any;
};
export const TrendingItem = memo<TrendingItemProps>(function TrendingItem({
  index,
  nft,
  width,
  tw = "",
  numColumns = 3,
  style,
  filter = "all",
  goTo,
  ...rest
}) {
  const { width: windowWidth } = useWindowDimensions();
  const isMdWidth = windowWidth > breakpoints["md"];
  const pagerWidth = isMdWidth ? DESKTOP_CONTENT_WIDTH : windowWidth;
  const spacing = (isMdWidth ? 0 : 32) + 24 * (numColumns - 1);
  const mediaWidth =
    numColumns % 1 === 0
      ? (pagerWidth - spacing) / numColumns
      : pagerWidth / numColumns - 16;

  const { onToggleFollow } = useFollow({
    username: nft.username,
  });

  const isDark = useIsDarkMode();

  const buttonBgColor = useMemo(() => {
    return isDark ? colors.white : colors.gray[900];
  }, [isDark]);

  const buttonTextColor = useMemo(() => {
    return isDark ? colors.gray[900] : colors.white;
  }, [isDark]);

  return (
    <View
      tw={["h-full w-full", tw]}
      style={[
        {
          width: Platform.select({
            web: undefined,
            default: width,
          }),
        },
        style,
      ]}
      {...rest}
    >
      <>
        <View
        // tw="overflow-hidden rounded-2xl"
        // style={{ width: mediaWidth - 1, height: mediaWidth - 1 }}
        >
          <View
          // style={{ width: mediaWidth, height: mediaWidth }}
          >
            <>
              <Avatar url={''} size={50} />
              {/* item={nft}
              resizeMode={ResizeMode.COVER}
              optimizedWidth={500} */}
            </>
          </View>
        </View>
      </>

      <View tw="mt-2 flex-row items-center">

        <VerificationBadge style={{ padding: 0, margin: 0 }} size={12} />

        <View tw="w-1" />

        <Text
          tw="text-13 overflow-hidden pt-0 text-ellipsis whitespace-nowrap text-gray-900 dark:text-white"
          onPress={() => {
            goTo(nft);
          }}
          rows={1}
          style={{ maxWidth: mediaWidth - 10 }}
        >
          {'username'}
        </Text>

      </View>

      <View tw="my-1 flex-row items-center">
        <Text
          numberOfLines={1}
          tw="text-13 overflow-hidden pt-0 text-ellipsis inline-block max-w-[114px] text-gray-900 dark:text-white"
          style={{ maxWidth: mediaWidth - 10 }}
        >
          {'name'}
        </Text>

      </View>

      <View tw="mt-1 mb-2 flex-row items-center" style={{ maxWidth: mediaWidth }}>
        <FollowButtonSmall
          size={"small"}
          name={nft.username}
          username={nft.username}
          onToggleFollow={onToggleFollow}
        />
      </View>
    </View>
  );
});

export const TrendingSkeletonItem = memo<{ numColumns: number } & ViewProps>(
  function TrendingSkeletonItem({ tw = "", ...rest }) {
    const { width: windowWidth } = useWindowDimensions();
    const isMdWidth = windowWidth > breakpoints["md"];
    const numColumns = isMdWidth ? 4 : 3;
    const pagerWidth = isMdWidth ? DESKTOP_CONTENT_WIDTH : windowWidth;

    const spacing = (isMdWidth ? 0 : 32) + 24 * (numColumns - 1);
    const mediaWidth =
      numColumns % 1 === 0
        ? (pagerWidth - spacing) / numColumns
        : pagerWidth / numColumns - 16;

    return (
      <View tw={["", tw]} {...rest}>
        <Skeleton width={mediaWidth} height={mediaWidth} radius={16} />
        <View tw="mt-2 flex-row items-center">
          <Skeleton width={60} height={16} radius={4} />
        </View>
        <View tw="my-1 flex-row items-center">
          <Skeleton width={80} height={12} radius={4} />
        </View>
        {/* <View tw="h-2" /> */}
        <View tw="my-0.5 flex-row items-center">
          <Skeleton width={100} height={24} radius={999} />
        </View>
      </View>
    );
  }
);
