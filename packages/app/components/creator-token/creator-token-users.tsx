import { useMemo } from "react";
import { Platform } from "react-native";

import { BlurView } from "expo-blur";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  ChevronRight,
  GoldHexagon,
  ShowtimeRounded,
} from "@showtime-xyz/universal.icon";
import { PressableHover } from "@showtime-xyz/universal.pressable-hover";
import { useRouter } from "@showtime-xyz/universal.router";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { VerificationBadge } from "@showtime-xyz/universal.verification-badge";
import { View, ViewProps } from "@showtime-xyz/universal.view";

import {
  CreatorTokenItem,
  CreatorTokenUser,
  NewCreatorTokenItem,
  TopCreatorTokenUser,
} from "app/hooks/creator-token/use-creator-tokens";
import { linkifyDescription } from "app/lib/linkify";
import { useHeaderHeight } from "app/lib/react-navigation/elements";
import {
  cleanUserTextInput,
  formatAddressShort,
  limitLineBreaks,
  removeTags,
} from "app/utilities";

import { useFollow } from "app/hooks/use-follow";
import { FollowButtonSmall } from "../follow-button-small";
import { useJoin } from "app/hooks/use-join";
import { JoinButtonSmall } from "../join-button-small";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';


export const CreatorTokensTitle = ({ title }: { title: string }) => {
  const headerHeight = useHeaderHeight();
  return (
    <View tw="mb-4">
      <View
        style={{
          height: Platform.select({
            ios: headerHeight + 8,
            default: 8,
          }),
        }}
      />
      <View tw="hidden flex-row justify-between bg-white pb-4 dark:bg-black md:flex">
        <Text tw="font-bold text-gray-900 dark:text-white md:text-xl">
          {title}
        </Text>
      </View>
    </View>
  );
};

export const TopCreatorTokenItemOnProfile = ({
  index,
  tw,
  item,
  showName = false,
  ...rest
}: ViewProps & {
  index?: number;
  item: any;
  showName?: boolean;
}) => {
  const router = useRouter();
  const { onToggleJoin } = useJoin({
    username: item.channel_id,
  });

  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;
  const image_url = item.img_url;

  const [name, setName] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [bio, setBio] = useState<any>('');
  const [isPremium, setIsPremium] = useState<any>(false);

  useEffect(() => {
    if (item) {
      const nameObj = item?.metadata_with_translations?.name || {};
      const bioObj = item?.metadata_with_translations?.bio || {};
      const name = nameObj[selectedLanguage] || nameObj?.english;
      const bio = bioObj[selectedLanguage] || bioObj?.english;
      const location_code = item?.location_code || '';
      setLocation(location_code);
      setName(name);
      setBio(bio);
    }
  }, [selectedLanguage, item]);

  useEffect(() => {
  }, [selectedLanguage, item]);

  return (
    <PressableHover
      tw={["py-1.5", tw].join(" ")}
      onPress={() => router.push(`/@${item.username}`)}
      {...rest}
    >
      <View tw="flex-row items-center">
        <View tw="mr-1 items-center justify-center">
          <Text tw="text-xs font-bold text-gray-700 dark:text-white">
            {index + 1}
          </Text>
        </View>
        <View tw="web:flex-1 ml-2 flex-row items-center">
          <Avatar url={image_url} size={50} />
          <View tw="w-2" />
          <View tw="flex-1 justify-center">
            {item?.username ? (
              <>
                <Text
                  tw="text-sm font-semibold text-gray-900 dark:text-gray-500"
                  numberOfLines={1}
                >
                  {name}
                </Text>
                <View tw="h-2" />
              </>
            ) : null}

            {bio ? (
              <>
                <Text
                  tw="text-xs text-gray-900 dark:text-gray-500"
                  numberOfLines={2}
                >
                  {bio}
                </Text>
                <View tw="h-1" />
              </>
            ) : null}

            <View style={{ width: 100, height: 25, paddingTop: 4 }}> {/* Wrapper View with custom styles */}
              <JoinButtonSmall
                name={item.username}
                profileId={item.profile_id}
                onToggleFollow={onToggleJoin}
              />
            </View>
          </View>
        </View>
      </View>
    </PressableHover>
  );
};

export const TopCreatorTokenItem = ({
  index,
  tw,
  item,
  ...rest
}: ViewProps & {
  index?: number;
  item: TopCreatorTokenUser;
}) => {
  const router = useRouter();
  const isDark = useIsDarkMode();
  return (
    <PressableHover
      tw={["mb-2 py-1.5", tw].join(" ")}
      onPress={() => {
        router.push(
          `/@${item?.username}`
        );
      }}
      {...rest}
    >
      <View tw="flex-row items-center">
        <View tw="min-w-[24px]">
          {index != undefined ? (
            index < 3 ? (
              <View tw="items-center justify-center">
                <View tw="absolute -top-1">
                  <GoldHexagon width={18} height={18} />
                </View>
                <Text tw="text-xs font-bold text-white">{index + 1}</Text>
              </View>
            ) : (
              <View tw="items-center justify-center">
                <Text tw="text-xs font-bold text-gray-700 dark:text-white">
                  {index + 1}
                </Text>
              </View>
            )
          ) : null}
        </View>
        <View tw="ml-1 flex-1 flex-row items-center">
          <Avatar url={item?.img_url} size={34} />
          <View tw="ml-2 flex-1 justify-center">
            <View tw="flex-row items-center">
              <Text
                tw="text-sm font-semibold text-gray-900 dark:text-white"
                numberOfLines={1}
              >
                @ {item?.username}
              </Text>
              {Boolean(item?.verified) && (
                <View tw="ml-1">
                  <VerificationBadge size={14} />
                </View>
              )}
            </View>
            <View tw="mt-1 flex-row items-center">
              <Text
                tw="text-xs font-semibold text-gray-900 dark:text-white"
                numberOfLines={1}
              >
                {'5'}
              </Text>
              <View tw="w-1" />
              <ShowtimeRounded
                width={14}
                height={14}
                color={isDark ? colors.white : colors.gray[900]}
              />
            </View>
          </View>
        </View>
      </View>
    </PressableHover>
  );
};

export const TopCreatorTokenListItem = ({
  index,
  tw,
  item,
  isSimplified = false,
  isMdWidth,
  ...rest
}: ViewProps & {
  index?: number;
  item: any;
  isSimplified?: boolean;
  isMdWidth?: boolean;
}) => {
  const isDark = useIsDarkMode();
  const router = useRouter();
  const { onToggleFollow } = useFollow({
    username: item?.username,
  });

  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  const [name, setName] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [bio, setBio] = useState<any>('');
  const [designation, setDesignation] = useState<any>('');

  useEffect(() => {
    if (item) {
      // Directly accessing the name and bio fields from metadata_with_translations
      const nameObj = item?.metadata_with_translations?.name || {};
      const bioObj = item?.metadata_with_translations?.bio || {};

      // Access the name and bio in the selected language or fall back to English
      const name = nameObj[selectedLanguage] || nameObj?.english;
      const bio = bioObj[selectedLanguage] || bioObj?.english;

      // Safely retrieve the location and designation
      const location_code = item?.location_code || '';
      const designation = item?.type && item.type.length > 0 ? item.type[0] : '';

      // Translate designation if available
      const translatedDesignation = t(`netaType.${designation}`);

      // Update state with the translated or fallback values
      setDesignation(translatedDesignation);
      setLocation(location_code);
      setName(name);
      setBio(bio);
    }
  }, [selectedLanguage, item]);


  // const image_url = item.img_url && item.img_url.length > 0 ? item.img_url[0] : null;
  const [image_url, setImage_url] = useState<any>('');

  useEffect(() => {
    if (item) {
      const placeholderImage = 'https://via.placeholder.com/150/FF0000/FFFFFF?text=No+Image';
      const image_url = item?.img_url?.url ? item.img_url.url : placeholderImage;
      setImage_url(image_url);
    }
  }, [item]);

  return (
    <PressableHover
      tw={["py-2.5 mx-2", tw].join(" ")}
      onPress={() => {
        router.push(
          `/@${item?.username}`
        );
      }}
      {...rest}>
      <View tw={[""]}>
        <View tw="flex-row items-center pl-1">

          {index != undefined ? (
            index < 0 ? (
              <View tw="items-center ">
                <View tw="absolute -top-1">
                  <GoldHexagon width={18} height={18} />
                </View>
                <Text tw="text-xs font-bold text-white">{index + 1}</Text>
              </View>
            ) : (
              <View tw="items-center ">
                <Text tw="text-xs font-bold text-gray-700 dark:text-white">
                  {index + 1}
                </Text>
              </View>
            )
          ) : null}

          <View tw="w-2.5" />
          <View tw="md:w-10" />
          <Avatar url={item?.img_url} size={35} />
          <View tw="md:w-10" />

          <View tw="ml-2 w-[200px] md:w-[300px]">
            <View tw="flex-row items-center">
              <Text
                tw="max-w-[200px] text-sm font-semibold text-gray-900 dark:text-white"
                numberOfLines={1}
                style={{ lineHeight: 20 }}
              >
                {name || item?.username || 'NA'}
              </Text>

              <View tw="h-1" />

              {Boolean(item?.verified) && (
                <View tw="ml-1">
                  <VerificationBadge size={14} bgColor={isDark ? "white" : "black"} />
                </View>
              )}

            </View>
            <View tw="flex-row items-center pt-1">
              <Text tw="text-xs text-gray-500 dark:text-gray-400"
                numberOfLines={1}
                style={{ lineHeight: 20 }}
              >
                {bio || 'NA'}
              </Text>
            </View>
          </View>

          <View tw="ml-auto lg:ml-10">
            <FollowButtonSmall
              size={"small"}
              tw={["",]}
              style={{ backgroundColor: "#08F6CC", height: 26 }}
              name={item?.username}
              username={item?.username}
              onToggleFollow={onToggleFollow}
            />
          </View>
        </View>
      </View>
    </PressableHover >
  );
};

export const TopCreatorTokenSkeleton = ({ tw, ...rest }: ViewProps) => {
  return (
    <View tw={["mb-2 py-1.5", tw].join(" ")} {...rest}>
      <View tw="flex-row items-center pl-1">
        <Skeleton width={16} height={16} show radius={8} />
        <View tw="ml-2 flex-row items-center">
          <Skeleton width={34} height={34} show radius={999} />
          <View tw="w-2" />
          <View tw="">
            <Skeleton width={80} height={13} show radius={4} />
            <View tw="h-1" />
            <Skeleton width={60} height={13} show radius={4} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const TopCreatorTokenListItemSkeleton = ({
  tw,
  ...rest
}: ViewProps & {
  isMdWidth: boolean;
}) => {
  return (
    <View tw={["py-2.5", tw].join(" ")} {...rest}>
      <View tw="flex-row items-center pl-1">
        <Skeleton width={16} height={16} show radius={8} />
        <View tw="w-2.5" />
        <Skeleton width={34} height={34} show radius={999} />
        <View tw="ml-2 w-[178px] md:w-[214px]">
          <Skeleton width={140} height={13} show radius={4} />
        </View>
        <Skeleton width={30} height={14} show radius={4} />
        <View tw="ml-auto lg:ml-10">
          <Skeleton width={42} height={24} show radius={999} />
        </View>
        {/* <View tw="hidden lg:ml-8 lg:flex">
          <Skeleton width={200} height={14} show radius={999} />
        </View> */}
      </View>
    </View>
  );
};




import { useCallback, createContext, useContext } from "react";
import { useWindowDimensions } from "react-native";

import type { ListRenderItemInfo } from "@shopify/flash-list";

import { InfiniteScrollList } from "@showtime-xyz/universal.infinite-scroll-list";
import { TabBarSingle } from "@showtime-xyz/universal.tab-view";

import { EmptyPlaceholder } from "app/components/empty-placeholder";
import { ErrorBoundary } from "app/components/error-boundary";
import { useContentWidth } from "app/hooks/use-content-width";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { useScrollbarSize } from "app/hooks/use-scrollbar-size";
import { createParam } from "app/navigation/use-param";
import { NFT } from "app/types";

import { breakpoints } from "design-system/theme";
import { TrendingItem, TrendingSkeletonItem } from "./trending-item";
import { SettingsTitle } from "../settings/settings-title";

type Query = {
  tab: "creator" | "drop";
  filter: string;
  article: any;
};
const MOBILE_HEADER_HEIGHT = 88;
const TrendingHeaderContext = createContext<{
  filter: string | undefined;
  setFilter: (type: string) => void;
}>({
  filter: undefined,
  setFilter: () => { },
});

const { useParam } = createParam<Query>();

const INITIAL_FILTER = "all";

export const Trending = ({ data }: any) => {

  const { height: screenHeight } = useWindowDimensions();
  const contentWidth = useContentWidth();
  const bottom = usePlatformBottomHeight();
  const { width } = useScrollbarSize();
  const isMdWidth = contentWidth + width > breakpoints["md"];

  const [filter, setFilter] = useParam("filter", { initial: INITIAL_FILTER });

  const contextValues = useMemo(
    () => ({ filter: filter, setFilter }),
    [filter, setFilter]
  );

  const keyExtractor = useCallback(
    (_item: NFT, index: number) => `${index}`,
    []
  );
  const numColumns = isMdWidth ? 4 : 3;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  // const [data, setData] = useState([]);
  const [cachedData, setCachedData] = useState([]);

  const router = useRouter();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<any & { loading?: boolean }>) => {
      const marginLeft = isMdWidth ? 0 : index % numColumns === 0 ? 0 : 8;
      // const { article, setArticle } = useAppState();
      const newItem: any = {
        // ...sampleItem,
        ...item,
        owner_username: 'test',
        "image_url": item.img_url,
      };
      const handleGoTo = (ele: any) => {
        router.push(`/${ele.username}`);
      }
      return (
        <>
          <TrendingItem
            nft={newItem}
            index={index}
            goTo={handleGoTo}
            tw="mb-1"
            style={{ marginLeft: marginLeft }}
            numColumns={numColumns} setArticle={undefined} />
        </>
      );
    },
    [isMdWidth, numColumns]
  );

  return (
    <>
      <TrendingHeaderContext.Provider value={contextValues}>
        <View tw="bg-white dark:bg-black">
          {/* <View tw="flex justify-center">
            <View tw="md:h-20" />
          </View> */}
          <View tw="max-w-screen-content mx-auto w-full px-0 md:px-0">
            <ErrorBoundary>
              <InfiniteScrollList
                useWindowScroll={isMdWidth}
                data={data}
                preserveScrollPosition
                keyExtractor={keyExtractor}
                numColumns={numColumns}
                renderItem={renderItem}
                style={{
                  height: screenHeight + Math.max(bottom, 8),
                }}
                ListHeaderComponent={Header}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                }}
                estimatedItemSize={275}
              />
            </ErrorBoundary>
          </View>
        </View>
      </TrendingHeaderContext.Provider>
    </>
  );
};

export const Header = () => {

  const { i18n, t } = useTranslation();
  const context = useContext(TrendingHeaderContext);
  // const { filter, setFilter } = context;
  const isDark = useIsDarkMode();
  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];

  return (
    <View tw="z-10 mx-auto w-full max-w-screen-xl">
      <View tw="mb-4 ">
        <SettingsTitle
          title={t('settings.' + "advanced_title")}
          desc={t('settings.' + "advanced_description")}
          descTw="my-1"
        />
        {/* <TrendingEntitiesHeader /> */}
      </View>
    </View>
  );
};
