import { memo, RefObject, useContext } from "react";
import { Platform } from "react-native";

import Animated, {
  useAnimatedStyle,
  useAnimatedRef,
  SharedValue,
} from "react-native-reanimated";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Flag } from "@showtime-xyz/universal.icon";
import { MoreHorizontal } from "@showtime-xyz/universal.icon";
import { FlashList } from "@showtime-xyz/universal.infinite-scroll-list";
import { useRouter } from "@showtime-xyz/universal.router";
import { colors } from "@showtime-xyz/universal.tailwind";
import { View } from "@showtime-xyz/universal.view";

import { UserContext } from "app/context/user-context";
import { linkifyDescription } from "app/lib/linkify";
import { Link } from "app/navigation/link";
import {
  cleanUserTextInput,
  formatDateRelativeWithIntl,
  limitLineBreaks,
  removeTags,
} from "app/utilities";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "design-system/dropdown-menu";

import { MenuItemIcon } from "../../dropdown/menu-item-icon";
import { ChannelById, MessageItemProps } from "../types";
import { ImagePreview } from "./image-preview";
import { LeanText, LeanView } from "./lean-text";
import { TwitterBadge } from "./twitter-badge";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from 'react';
import { ZulipBadge } from "./zulip-badge";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MessageItem = memo(
  ({
    item,
    editMessageIdSharedValue,
    permissions,
  }: MessageItemProps & {
    edition?: any;
    isUserAdmin?: boolean;
    permissions?: ChannelById["permissions"];
    listRef: RefObject<FlashList<any>>;
    channelOwnerProfileId?: number;
    editMessageIdSharedValue: SharedValue<number | undefined>;
    editMessageItemDimension: SharedValue<{
      height: number;
      pageY: number;
    }>;
  }) => {
    const { channel_message } = item;

    const isDark = useIsDarkMode();
    const user = useContext(UserContext);
    const animatedViewRef = useAnimatedRef<any>();
    const router = useRouter();

    const { i18n } = useTranslation();

    const selectedLanguage = i18n.language || 'default';

    const [name, setName] = useState<any>('');
    const [location, setLocation] = useState<any>('');
    const [bio, setBio] = useState<any>('');

    useEffect(() => {
      if (channel_message) {
        const item_ = item.channel_message?.sent_by?.profile;
        const nameObj = item_?.metadata_with_translations?.name || {};
        const bioObj = item_?.metadata_with_translations?.bio || {};
        const name = nameObj[selectedLanguage] || nameObj?.english;
        const bio = bioObj[selectedLanguage] || bioObj?.english;

        const location_code = item_?.location_code || '';
        setLocation(location_code);
        setName(name);
        setBio(bio);
      }
    }, [selectedLanguage, item]);

    useEffect(() => {

    }, [selectedLanguage, item]);

    const style = useAnimatedStyle(() => {
      if (editMessageIdSharedValue?.value === channel_message?.id) {
        return {
          backgroundColor: isDark ? colors.gray[800] : colors.gray[100],
          borderRadius: 8,
        };
      }
      return {
        backgroundColor: "transparent",
        borderRadius: 0,
      };
    }, [isDark, editMessageIdSharedValue, channel_message?.id]);

    const isFromTwitter = channel_message?.source == 'TWITTER';
    const isFromZulip = channel_message?.source == 'ZULIP';

    const imgUrl = item.channel_message?.sent_by?.profile?.img_url;
    const image_url = imgUrl && imgUrl.length > 0 ? imgUrl[0] : null;

    const [messageContent, setMessageContent] = useState<any>('');

    useEffect(() => {
      const translatedContent = item.translated_content || {};
      const selectedLanguageContent = translatedContent[selectedLanguage] || translatedContent['default'];

      let content = selectedLanguageContent || item?.content;

      const ret = content
        ? linkifyDescription(
          limitLineBreaks(
            cleanUserTextInput(removeTags(content)),
            10
          ),
          "!text-indigo-600 dark:!text-blue-400"
        )
        : "";

      setMessageContent(ret);
    }, [selectedLanguage, item]);

    return (
      <>
        <AnimatedView tw="my-2 px-3" style={style} ref={animatedViewRef}>
          <LeanView tw="flex-row" style={{ columnGap: 8 }}>
            <Link
              href={`/@${item.channel_message?.sent_by?.profile?.username}`}
            >
              <LeanView tw="h-6 w-6">
                <Avatar
                  size={24}
                  url={image_url}
                />
                <View tw="absolute h-full w-full rounded-full border-[1.4px] border-white/60 dark:border-black/60" />
              </LeanView>
            </Link>
            <LeanView tw="flex-1" style={{ rowGap: 8 }}>
              <LeanView tw="flex-row items-center" style={{ columnGap: 8 }}>
                <Link
                  href={`/@${item.channel_message?.sent_by?.profile?.username
                    }`}
                >
                  <LeanText
                    tw={"text-sm font-bold text-gray-900 dark:text-gray-100"}
                  >
                    {item?.username}
                  </LeanText>
                </Link>

                <LeanView tw="flex-row items-center">
                  <LeanText tw={"text-xs text-gray-700 dark:text-gray-200"}>
                    {formatDateRelativeWithIntl(channel_message?.last_updated || channel_message?.created_at)}
                  </LeanText>
                  {isFromZulip ? (
                    <View tw="ml-2">
                      <ZulipBadge />
                    </View>
                  ) : null}

                  {isFromTwitter ? (
                    <View tw="ml-2">
                      <TwitterBadge />
                    </View>
                  ) : null}
                </LeanView>

                <LeanView
                  tw="mr-2 flex-1 flex-row items-center justify-end"
                  style={{
                    gap: 12,
                  }}
                >
                  <DropdownMenuRoot>
                    <DropdownMenuTrigger
                      // @ts-expect-error - RNW
                      style={Platform.select({
                        web: {
                          cursor: "pointer",
                        },
                      })}
                    >
                      <MoreHorizontal
                        color={isDark ? colors.gray[400] : colors.gray[700]}
                        width={20}
                        height={20}
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent loop sideOffset={8}>

                      {item.channel_message?.sent_by?.profile?.profile_id !==
                        user?.user?.data.profile?.profile_id ? (
                        <DropdownMenuItem
                          onSelect={() => {
                            router.push(
                              {
                                pathname:
                                  Platform.OS === "web"
                                    ? router.pathname
                                    : "/report",
                                query: {
                                  ...router.query,
                                  reportModal: true,
                                  channelMessageId: item.channel_message?.id,
                                },
                              },
                              Platform.OS === "web" ? router.asPath : undefined
                            );
                          }}
                          key="report"
                        >
                          <MenuItemIcon
                            Icon={Flag}
                            ios={{
                              name: "flag",
                            }}
                          />
                          <DropdownMenuItemTitle tw="font-semibold text-gray-700 dark:text-gray-400">
                            Report
                          </DropdownMenuItemTitle>
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenuRoot>
                </LeanView>
              </LeanView>

              {item.channel_message?.body_text_length > 0 ? (
                <LeanText
                  tw={"text-sm text-gray-900 dark:text-gray-100"}
                  style={
                    Platform.OS === "web"
                      ? {
                        // @ts-ignore
                        wordBreak: "break-word",
                      }
                      : {}
                  }
                >
                  {messageContent}
                </LeanText>
              ) : null}

              {item.channel_message?.attachments?.length > 0 &&
                item.channel_message?.attachments[0].mime.includes("image") ? (
                <ImagePreview
                  attachment={item.channel_message?.attachments[0]}
                  isViewable={permissions?.can_view_creator_messages}
                />
              ) : null}

            </LeanView>
          </LeanView>
        </AnimatedView>

      </>
    );
  }
);

MessageItem.displayName = "MessageItem";