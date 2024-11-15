import { memo, useCallback } from "react";
import {
  useWindowDimensions,
  Dimensions,
  Platform,
  ListRenderItemInfo,
} from "react-native";

import { BorderlessButton } from "react-native-gesture-handler";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { CreatorChannel as CreatorChannelIcon } from "@showtime-xyz/universal.icon";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useRouter } from "@showtime-xyz/universal.router";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View, ViewProps } from "@showtime-xyz/universal.view";

import {
  CreatorChannel,
} from "app/components/creator-channels/hooks/use-channels-list";
import { DESKTOP_CONTENT_WIDTH } from "app/constants/layout";

import { breakpoints } from "design-system/theme";

import { HomeSlider } from "./home-slider";
import { useAllNetasList } from "app/hooks/use-netas-list";
import { FollowButtonSmall } from "../follow-button-small";
import { useFollow } from "app/hooks/use-follow";

const PlatformPressable = Platform.OS === "web" ? Pressable : BorderlessButton;

const INFO_HEIGTH = 180;
const windowWidth = Dimensions.get("window").width;
const PopularCreatorItem = memo(function PopularCreatorItem({
  item,
  width,
  style,
  tw = "",
  ...rest
}: {
  item: any;
  width: number;
  index: number;
} & ViewProps) {
  const isDark = useIsDarkMode();
  const router = useRouter();

  const { onToggleFollow } = useFollow({
    username: item.username,
  });
  return (
    <Pressable
      tw={["w-full", tw]}
      style={[
        {
          width: Platform.select({
            web: undefined,
            default: width,
          }),
          height: INFO_HEIGTH,
        },
        style,
      ]}
      onPress={() => router.push(`/@${item.username}`)}
      {...rest}
    >
      <View tw="h-[84px] w-[84px]">
        <Avatar url={item?.img_url} size={84} />
        <View tw="absolute -bottom-1 -right-4 self-center rounded-full bg-white p-2 dark:bg-black dark:shadow-white/20">
          <CreatorChannelIcon
            color={isDark ? colors.white : colors.black}
            width={24}
            height={24}
          />
        </View>
      </View>
      <View tw="mt-3">
        <Text tw="text-base font-semibold text-black dark:text-white">
          {item?.name || item?.username}
        </Text>
        <View tw="h-2" />
        <Text
          tw="font-bold text-gray-500 dark:text-gray-400"
          style={{ fontSize: 10, lineHeight: 12 }}
        >
          {`${item?.followers_count} followers`}
        </Text>
        <View tw="h-2.5" />
        <Text tw="text-xs text-gray-600 dark:text-gray-300" numberOfLines={1}>
          {item?.location}
        </Text>
      </View>
      <FollowButtonSmall
        size={"small"}
        tw={["absolute bottom-0 h-5 items-center justify-center rounded-full border border-gray-300 px-3.5 dark:border-gray-600",]}
        name={item.username}
        username={item.username}
        onToggleFollow={onToggleFollow}
      />
    </Pressable>
  );
});
const PopularCreatorSkeletonItem = ({
  width = 174,
  style,
  ...rest
}: { width?: number } & ViewProps) => {
  return (
    <View
      style={[
        {
          height: INFO_HEIGTH,
          width: width,
        },
        style,
      ]}
      {...rest}
    >
      <Skeleton width={84} height={84} radius={999} />
      <View tw="h-3" />
      <Skeleton width={110} height={19} radius={999} />
      <View tw="h-2" />
      <Skeleton width={56} height={12} radius={999} />
      <View tw="h-2.5" />
      <Skeleton width={150} height={15} radius={999} />
      <View tw="h-2" />
      <Skeleton width={80} height={14} radius={999} />
      <View tw="h-2" />
      <View tw="absolute bottom-0">
        <Skeleton width={54} height={18} radius={999} />
      </View>
    </View>
  );
};
export const PopularAppsHorizontal = memo(function PopularAppsHorizontal() {
  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];
  const { data, isLoading } = useAllNetasList();
  const isShowSeeAll = data.length > (isMdWidth ? 3 : 2);
  const router = useRouter();
  const pagerWidth = isMdWidth ? DESKTOP_CONTENT_WIDTH : windowWidth - 32;
  const itemWidth = Platform.select({
    web: undefined,
    default: pagerWidth / 2,
  });
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<CreatorChannel>) => (
      <PopularCreatorItem
        item={item}
        index={index}
        width={itemWidth}
        tw={index === 0 && Platform.OS !== "web" ? "ml-4 md:ml-0" : ""}
      />
    ),
    [itemWidth]
  );
  if (data.length === 0) return null;
  return (
    <View tw="mt-0 w-full md:pl-0">
      <View tw="w-full flex-row items-center justify-between px-4 py-2 pb-4 md:px-0">
        <Text tw="text-sm font-bold text-gray-900 dark:text-white">
          Popular Netas
        </Text>
        {isShowSeeAll && (
          <PlatformPressable
            onPress={() => {
              router.push("/entities");
            }}
            shouldActivateOnStart
            hitSlop={10}
          >
            <View
              tw="-mt-1 p-1"
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            >
              <Text tw="text-sm font-semibold text-indigo-600">see all</Text>
            </View>
          </PlatformPressable>
        )}
      </View>
      <View tw="mb-2 w-full rounded-2xl">
        {isLoading ? (
          <View style={{ height: INFO_HEIGTH }} tw="flex-row overflow-hidden">
            <PopularCreatorSkeletonItem width={itemWidth} tw="ml-4 md:ml-0" />
            <PopularCreatorSkeletonItem width={itemWidth} />
            <PopularCreatorSkeletonItem width={itemWidth} />
            <PopularCreatorSkeletonItem width={itemWidth} />
          </View>
        ) : (
          <HomeSlider
            data={data}
            slidesPerView={isMdWidth ? 3.5 : 2.2}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
});
