import { useCallback } from "react";
import { useWindowDimensions, Platform } from "react-native";

import type { ListRenderItemInfo } from "@shopify/flash-list";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Showtime } from "@showtime-xyz/universal.icon";
import { InfiniteScrollList } from "@showtime-xyz/universal.infinite-scroll-list";
import { PressableHover } from "@showtime-xyz/universal.pressable-hover";
import { useRouter } from "@showtime-xyz/universal.router";
import Spinner from "@showtime-xyz/universal.spinner";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View, ViewProps } from "@showtime-xyz/universal.view";

import { EmptyPlaceholder } from "app/components/empty-placeholder";
import { ErrorBoundary } from "app/components/error-boundary";
import {
  CreatorTokenUser,
  useCreatorTokenCoLlected,
  useCreatorTokenCollectors,
} from "app/hooks/creator-token/use-creator-tokens";
import { createParam } from "app/navigation/use-param";

import { breakpoints } from "design-system/theme";
import {
  useMemo,
  useState,
} from "react";

import React, { useEffect } from 'react';

import { useHeaderHeight } from "app/lib/react-navigation/elements";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import {
  useReducer,
} from "react";

import { Image } from "@showtime-xyz/universal.image";
import { formatDateRelativeWithIntl } from "app/utilities";

import { LeanText } from "../creator-channels/components/lean-text";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { RectButton } from "react-native-gesture-handler";

const PlatformPressable = Platform.OS === "web" ? Pressable : RectButton;

const keyExtractor = (item: CreatorTokenUser) => `${item.profile_id}`;
type Query = {
  creatorTokenId: string;
};

const CreatorChannelsListItem = memo(
  ({ item }: { item: any }) => {
    const time = formatDateRelativeWithIntl(
      item?.latest_message?.updated_at ?? Date.now()
    );
    const router = useRouter();
    const isDark = useIsDarkMode();

    const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const uploadedImageUrl = item.img_url && item.img_url.length > 0 ? item.img_url[0] : null;
    const image_url = `${supabaseURL}/storage/v1/object/public/${uploadedImageUrl}`;

    const forceUpdate = useReducer((x) => x + 1, 0)[1];

    const getPreviewText = useCallback(() => {
      if (
        item?.latest_message?.content
      ) {
        return (
          <LeanText tw="font-semibold">
            {item?.latest_message?.content}
          </LeanText>

        );
      }

      return <LeanText tw="font-semibold">
        <View tw="flex-row items-center">
          <View tw="mr-2">
            <Image
              // source={'https://placehold.co/600x400'}
              source={image_url}
              width={18}
              height={18}
            />
          </View>
          <Text
            tw={[
              "text-sm",
              isDark ? "text-white" : "text-black",
              !item.read ? "font-semibold" : "",
            ]}
          >
            No messages yet
            {/* 🎥 Video */}
          </Text>
        </View>
      </LeanText>;
    }, [isDark, item.itemType, item?.latest_message, item.read]);

    const { t, i18n } = useTranslation();

    const selectedLanguage = i18n.language;

    const [name, setName] = useState<any>('');
    const [bio, setBio] = useState<any>('');
    const [location, setLocation] = useState<any>('');
    const [designation, setDesignation] = useState<any>('');
    const [designationAndLocation, setDesignationAndLocation] = useState<any>('');

    // const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // const uploadedImageUrl = item.img_url && item.img_url.length > 0 ? item.img_url[0] : null;
    // const image_url = `${supabaseURL}/storage/v1/object/public/${uploadedImageUrl}`;

    useEffect(() => {
      const metadataWithTranslations = Array.isArray(item['metadata_with_translations']) ? item['metadata_with_translations'][0] : [];
      const updatedBio = metadataWithTranslations['bio' + '_' + selectedLanguage] || metadataWithTranslations['bio'];
      setBio(updatedBio);

      const updatedLocation = metadataWithTranslations['location_name' + '_' + selectedLanguage] || metadataWithTranslations['location_name'];
      setLocation(updatedLocation);

      const designation = item?.type && item.type.length > 0 ? item.type[0] : 'Not Available';
      const translatedDesignation = t(`netaType.${designation}`);
      setDesignation(translatedDesignation);

      setDesignationAndLocation(`${translatedDesignation}, ${updatedLocation}`);
      setName(metadataWithTranslations['name' + '_' + selectedLanguage]);
    }, [selectedLanguage, item]);

    useEffect(() => {
      // setName(item['name' + '_' + selectedLanguage]);
    }, [selectedLanguage, item]);

    return (
      <PlatformPressable
        onPress={() => {
          router.push(`/groups/${item.username}`);
          item.read = true;
          requestAnimationFrame(() => {
            // doing this because I don't want to mutate the whole object for a simple read status
            forceUpdate();
          });
        }}
        underlayColor={isDark ? "white" : "black"}
        style={{ width: "100%" }}
      >
        <View tw="flex-1 px-4 md:px-4 py-2.5">
          <View tw="flex-row items-center">
            <Avatar
              url={image_url}
              size={52}
              alt="CreatorPreview Avatar"
              tw={"pointer-events-none mr-3"}
            />
            <View tw="flex-1">
              <View tw="flex-row items-center">
                <Text
                  tw={[
                    "web:text-base max-w-[80%] overflow-ellipsis whitespace-nowrap text-lg font-semibold text-black dark:text-white",
                    item.itemType === "owned"
                      ? "web:max-w-[60%] max-w-[70%]"
                      : "",
                  ]}
                  numberOfLines={1}
                >
                  {item?.username}
                </Text>

                {item.itemType === "owned" ? (
                  <LeanText
                    tw="web:max-w-[80%] web:text-base ml-3 overflow-ellipsis whitespace-nowrap text-lg font-medium text-gray-500 dark:text-slate-300"
                    numberOfLines={1}
                  >
                    {item?.username}
                  </LeanText>
                ) : null}
                <LeanText tw="ml-2 text-xs text-gray-500">
                  {item?.latest_message?.updated_at ? time : ""}
                </LeanText>
              </View>
              <View tw="mt-2">
                <Text
                  tw={[
                    "leading-5",
                    !item?.read && item.itemType !== "owned"
                      ? "font-semibold text-black dark:text-white"
                      : "text-gray-500 dark:text-gray-200",
                  ]}
                  numberOfLines={2}
                >
                  {getPreviewText()}
                </Text>
              </View>
            </View>
            {item?.itemType !== "owned" && !item?.read ? (
              // we don't want to show the unread indicator for owned channels
              <View>
                <View tw="h-2 w-2 rounded-full bg-indigo-600" />
              </View>
            ) : null}
          </View>
        </View>
      </PlatformPressable>
    );
  }
);

CreatorChannelsListItem.displayName = "CreatorChannelsListItem";


export const CreatorTokenCollectorsList = ({ servicesLocation, isLoading }: any) => {
  const { height: screenHeight, width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];
  const [list, setList] = useState<any>([]);
  // const [services, setServices] = useState<any>([]);

  useEffect(() => {
    setList(servicesLocation || []);
    const services_ = servicesLocation?.filter(ele => {
      return ele.is_secondary_stream;
    });

    setList(services_);
  }, [servicesLocation]);

  const { i18n, t } = useTranslation();

  const numColumns = 1;
  const itemWidth = isMdWidth ? 130 : (width - 40 - 2 * 16) / 3;
  const renderItem = useCallback(
    ({
      item,
      index,
    }: ListRenderItemInfo<CreatorTokenUser & { loading?: boolean }>) => {
      return (
        <View tw="">
          <CreatorChannelsListItem
            item={item}
            index={index}
          // style={{ width: itemWidth }}
          />
        </View>
      );
    },
    [itemWidth]
  );

  const getItemType = useCallback(
    (_: CreatorTokenUser, index: number) => {
      const marginLeft = isMdWidth ? 0 : index % numColumns === 0 ? 0 : 8;
      if (marginLeft) {
        return "right";
      }
      return "left";
    },
    [isMdWidth, numColumns]
  );

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return null;
    }
    if (!isLoading) {
      return (
        <EmptyPlaceholder
          title={t('Groups.services_empty')}
          tw="h-[50vh]"
          hideLoginBtn
        />
      );
    }
  }, [isLoading]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <View tw="pt-8 py-4 px-4 h-8 flex-row items-center justify-between">
        <Text tw={["text-xl font-bold text-gray-900 dark:text-white"]}>
          {t('Groups.services_title')}
        </Text>
      </View>
    );
  }, []);

  const headerHeight = useHeaderHeight();

  return (
    <View tw="bg-white px-0 dark:bg-black md:px-0">
      <ErrorBoundary>
        <InfiniteScrollList
          useWindowScroll
          data={list || []}
          preserveScrollPosition
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          renderItem={renderItem}
          drawDistance={500}
          getItemType={getItemType}
          style={{
            height: Platform.select({
              web: undefined,
              default: screenHeight - headerHeight,
            }),
            paddingTop: Platform.select({
              ios: headerHeight,
              default: 0,
            }),
          }}
          overscan={28}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={ListHeaderComponent}
          estimatedItemSize={46}
        />
      </ErrorBoundary>
    </View>
  );
};
