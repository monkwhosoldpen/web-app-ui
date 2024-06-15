import { useCallback, useEffect, useState, memo } from "react";
import { Platform } from "react-native";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";

import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { USER_PROFILE_KEY, useMyInfo } from "app/hooks/api-hooks";
import {
  useNotifications,
} from "app/hooks/use-notifications";

import { useScrollbarSize } from "app/hooks/use-scrollbar-size";
import { breakpoints } from "design-system/theme";
import { useContentWidth } from "app/hooks/use-content-width";
import { useTranslation } from "react-i18next";
import { EmptyPlaceholder } from "app/components/empty-placeholder";

import { LockV2 } from "@showtime-xyz/universal.icon";

import { useSWRConfig } from "swr";
import { useMatchMutate } from "app/hooks/use-match-mutate";

export const ChannelsList = memo(
  () => {

    const { data: fullData, isLoading, refetchChannels } = useChannelsList({ pageSize: 10 });
    const data = fullData?.creator_tokens ? fullData?.creator_tokens : [];

    const { width } = useScrollbarSize();
    const contentWidth = useContentWidth();
    const isMdWidth = contentWidth + width > breakpoints["md"];

    const { t } = useTranslation();
    const { refetchMyInfo, data: myInfoData } = useMyInfo();

    useNotifications();

    useEffect(() => {
      refetchChannels();
    }, [myInfoData]);

    useEffect(() => {
      (async function resetNotificationLastOpenedTime() {
        await axios({
          url: "/v5/check_notifications",
          method: "POST",
          data: {},
        });
        refetchMyInfo();
      })();
    }, [refetchMyInfo]);

    const ListEmptyComponent = useCallback(() => {
      return (
        <EmptyPlaceholder
          title={t('Groups.EmptyChannels')}
          tw="h-[50vh]"
        />
      );
    }, []);

    return (
      <>
        <ChannelsHeader />
        {isLoading ? (
          <View>
            {new Array(20).fill(0).map((_, index) => {
              return (
                <TopCreatorTokenListItemSkeleton
                  tw="px-4 md:px-0"
                  key={index}
                  isMdWidth={isMdWidth}
                />
              );
            })}
          </View>
        ) : null}

        {!isLoading && <>
          {
            data.length ? (
              <View tw="flex-row flex-wrap">
                <View tw="flex-1">
                  {data?.map((item, index) => {
                    return (
                      <View key={index}>
                        <CreatorChannelsListItem item={item} />
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : (
              <ListEmptyComponent />
            )}
        </>
        }
      </>
    );
  }
);

ChannelsList.displayName = "ChannelsList";

const ChannelsHeader = memo(function ChannelsHeader() {
  const { t } = useTranslation(); // Initialize the translation function
  const isDark = useIsDarkMode();
  return (
    <View tw="w-full">
      <>
        <View tw="px-4 md:px-4">
          <View tw=" border-b border-gray-200 pb-4 dark:border-gray-700">
            <View tw="flex-row items-center justify-between pb-4 pt-6">
              <Text tw="text-gray-1100 text-lg font-bold dark:text-white">
                {t('Groups.headerText')} {/* Using translation key for header */}
              </Text>
            </View>
            <View tw="flex-row items-center">
              <LockV2
                width={14}
                height={14}
                color={isDark ? colors.white : colors.gray[900]}
              />
              <View tw="w-1" />
              <Text tw="text-sm font-medium text-gray-900 dark:text-white">
                {t('Groups.subheaderText')} {/* Using translation key for subheader */}
              </Text>
            </View>
          </View>

        </View>
      </>
    </View>
  );
});

import {
  useReducer,
} from "react";

import { AvatarHoverCard } from "app/components/card/avatar-hover-card";
import { Link } from "app/navigation/link";
import { formatDateRelativeWithIntl } from "app/utilities";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useRouter } from "@showtime-xyz/universal.router";

import { RectButton } from "react-native-gesture-handler";
import { axios } from "app/lib/axios";
import { useChannelsList } from "../hooks/use-channels-list";
import { TopCreatorTokenListItemSkeleton } from "app/components/creator-token/creator-token-users";
import { LeanText } from "./lean-text";
import { MY_INFO_ENDPOINT } from "app/providers/user-provider";
import sanitizeHtml from 'sanitize-html';

const PlatformPressable = Platform.OS === "web" ? Pressable : RectButton;

const CreatorChannelsListItem = memo(
  ({ item }: { item: any }) => {
    const time = formatDateRelativeWithIntl(
      item?.latest_message?.timestamp ?? Date.now()
    );
    const router = useRouter();
    const isDark = useIsDarkMode();

    const image_url = item?.img_url && item?.img_url.length > 0 ? item?.img_url[0] : null;

    const forceUpdate = useReducer((x) => x + 1, 0)[1];
    const { t, i18n } = useTranslation();

    const selectedLanguage = i18n.language;

    const [name, setName] = useState<any>('');
    const [location, setLocation] = useState<any>('');
    const [bio, setBio] = useState<any>('');
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

    const [messageContent, setMessageContent] = useState<any>('');

    useEffect(() => {
      const translatedContent = item?.latest_message?.content || {};

      let content = '';

      if (translatedContent) {
        content = translatedContent;
      }
      else {
        content = translatedContent || ''; // Provide a default value if item.content is falsy
      }

      // Sanitize the HTML content to remove any malicious scripts or tags
      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'p']) // Customize the allowed tags according to your needs
      });

      setMessageContent(sanitizedContent);
    }, [selectedLanguage, item]);

    const getPreviewText = useCallback(() => {

      if (
        messageContent
      ) {
        return (
          <LeanText tw="font-semibold">
            <div dangerouslySetInnerHTML={{ __html: messageContent }}></div>
          </LeanText>
        );
      }

      return <LeanText tw="font-semibold">
        <View tw="flex-row items-center">
          <Text
            tw={[
              "text-sm",
              isDark ? "text-white" : "text-black",
              !item.read ? "font-semibold" : "",
            ]}
          >
            {t('Groups.NoMessagesYet')}
            {/* 🎥 Video */}
          </Text>
        </View>
      </LeanText>;
    }, [isDark, item.itemType, item?.latest_message, item.read]);

    // const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // const uploadedImageUrl = item.img_url && item.img_url.length > 0 ? item.img_url[0] : null;
    // const image_url = `${supabaseURL}/storage/v1/object/public/${uploadedImageUrl}`;
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
                  {name}
                </Text>

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

export const CreatorChannelsListCreator = memo(
  ({ item }: { item: any }) => {
    const joinChannel: any = useMyInfo();
    const router = useRouter();

    const { mutate } = useSWRConfig();
    const matchMutate = useMatchMutate();
    const { i18n, t } = useTranslation();
    return (
      <View tw="flex-1 px-4 md:px-4 py-3">
        <View tw="flex-row items-start">
          <AvatarHoverCard
            username={item.username}
            url={item?.owner?.img_url}
            size={40}
            alt="CreatorPreview Avatar"
            tw={"mr-3"}
          />
          <View tw="flex-1 justify-center">
            <View tw="flex-1 flex-row items-center justify-center">
              <View tw="flex-1 items-start justify-start">
                <View tw="flex-1 flex-row items-start justify-start">
                  <Link
                    href={`/groups/${item.username}`}
                  >
                    <Text
                      tw="text-md max-w-[160px] overflow-ellipsis whitespace-nowrap text-[15px] font-semibold text-black dark:text-white"
                      numberOfLines={1}
                    >
                      {item.username}
                    </Text>
                  </Link>
                </View>
                <View tw="mt-1 flex-1">
                  <Text tw="text-[11px] font-bold text-gray-500 dark:text-gray-500">
                    {item?.followers_count} {t('Groups.members')} {/* Translated text */}
                  </Text>
                </View>
              </View>
              <View tw="items-end justify-end">
                <Pressable
                  tw={[
                    "rounded-full bg-black p-1 dark:bg-white",
                    joinChannel.isMutating ? "opacity-50" : "",
                  ]}
                  onPress={async () => {
                    await joinChannel.join(item?.username);
                    mutate(MY_INFO_ENDPOINT);
                    matchMutate(
                      (key) => typeof key === "string" && key.includes(USER_PROFILE_KEY)
                    );
                    router.push(`/groups/${item?.username}?fresh=channel`);
                  }}
                  disabled={joinChannel.isMutating}
                >
                  <Text tw="px-6 font-bold text-white dark:text-black">
                    {t('Groups.join')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
);
