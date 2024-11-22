import { memo, RefObject, useContext } from "react";
import { Platform } from "react-native";

import Animated, {
  useAnimatedStyle,
  useAnimatedRef,
  SharedValue,
} from "react-native-reanimated";

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

import { Text } from "@showtime-xyz/universal.text";
import { AvatarHoverCard } from "app/components/card/avatar-hover-card";
import { ClampText } from "@showtime-xyz/universal.clamp-text";
import { Button } from "@showtime-xyz/universal.button";
import { BlurView } from "@react-native-community/blur";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MessageItem = memo(
  ({
    item,
    editMessageIdSharedValue,
    permissions,
    statusUser,
    isPremium,
    handleOnboard,
  }: MessageItemProps & {
    edition?: any;
    isUserAdmin?: boolean;
    permissions?: ChannelById["permissions"];
    listRef: RefObject<FlashList<any>>;
    channelOwnerProfileId?: number;
    statusUser: string;
    isPremium: boolean;
    editMessageIdSharedValue: SharedValue<number | undefined>;
    editMessageItemDimension: SharedValue<{
      height: number;
      pageY: number;
    }>;
    handleOnboard: () => void;
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

    const getBorderColor = (status: string) => {
      if (isPremium) {
        switch (status) {
          case 'IN_PROGRESS':
            return 'border-orange-500';
          case 'APPROVED':
            return 'border-green-500';
          default:
            return 'border-red-500';
        }
      }
      return ''; // No border for non-premium messages
    };

    const style = useAnimatedStyle(() => {
      if (true) {
        return {
          backgroundColor: isDark ? colors.gray[800] : colors.gray[100],
          borderRadius: 8,
          border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`
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

    const [image_url, setImage_url] = useState<any>('');

    useEffect(() => {
      if (imgUrl) {
        const image_url = imgUrl;
        setImage_url(image_url);
      }
    }, [item]);

    const [messageContent, setMessageContent] = useState<any>('');

    useEffect(() => {
      const translatedContent = item.translated_content || {};
      const selectedLanguageContent = translatedContent[selectedLanguage] || translatedContent['default'];
      let content = item.channel_message.body || 'NA';
      const ret = content
        ? linkifyDescription(
          limitLineBreaks(
            cleanUserTextInput(removeTags(content)),
            2
          ),
          "!text-indigo-600 dark:!text-blue-400"
        )
        : "";
      setMessageContent(ret);
    }, [selectedLanguage, item]);

    const isApproved = statusUser === 'APPROVED';
    const blurStyle = !isApproved ? { filter: 'blur(4px)' } : {};

    // Add debug logging
    useEffect(() => {
    }, [statusUser, isPremium, item]);

    // Add a function to determine if message should be blurred
    const shouldBlurMessage = () => {
      const shouldBlur = isPremium && statusUser !== 'APPROVED';
      return shouldBlur;
    };

    // Add message blur styles
    const messageBlurStyle = shouldBlurMessage() ? { filter: 'blur(4px)' } : {};

    // Log when component mounts/updates with key props
    useEffect(() => {
    }, [item, isPremium, statusUser]);

    // Log blur state changes
    useEffect(() => {
      const isBlurred = shouldBlurMessage();
    }, [isPremium, statusUser, item.channel_message?.id, item.channel_message?.body_text_length]);

    // Log when onboard button is pressed
    const handleOnboardPress = () => {
      if (handleOnboard) {
        handleOnboard();
      } else {
        console.warn('handleOnboard function not provided');
      }
    };

    // Log translated content processing
    useEffect(() => {
    }, [
      selectedLanguage,
      item.channel_message?.id,
      item.channel_message?.body?.length,
      item.translated_content,
      messageContent
    ]);

    const blurStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 8,
      overflow: 'hidden',
    } as const;

    return (
      <>
        <AnimatedView tw="my-2 px-3" style={style} ref={animatedViewRef}>
          <View tw="mb-2 mt-2 px-2 md:px-0">

            <LeanView tw="flex-row items-center py-2">
              <View tw="mt-0">
                <AvatarHoverCard
                  tw="rounded-2xl"
                  username="johndoe"
                  url={image_url}
                  size={40}
                />
              </View>
              <View tw="ml-2 justify-center">
                <Link
                  href={`/@${item.channel_message?.sent_by?.profile?.username
                    }`}

                  tw="flex-row items-center"
                >
                  {/* <LeanText
                    tw={"text-sm font-bold text-gray-900 dark:text-gray-100"}
                  >
                    {item.channel_message?.sent_by?.profile?.username}
                  </LeanText> */}
                  <LeanView tw="flex-row items-center">
                    <LeanText
                      tw="text-sm font-bold text-gray-900 dark:text-gray-100"
                    >
                      {item.channel_message?.sent_by?.profile?.username}
                    </LeanText>
                    {true ? (
                      <View tw="ml-2">
                        <TwitterBadge />
                      </View>
                    ) : null}
                  </LeanView>

                </Link>

                <View tw="h-2" />
                <Text tw="text-xs text-gray-600 dark:text-gray-400">
                  {formatDateRelativeWithIntl(channel_message?.last_updated || channel_message?.created_at)}
                </Text>
              </View>
              <View tw="ml-auto flex-row items-center">
                <LeanView
                  tw="mr-0 flex-1 flex-row items-center justify-end"
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
                        color={isDark ? colors.gray[100] : colors.gray[900]}
                        width={20}
                        height={20}
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent loop sideOffset={8}>

                      {true ? (
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
                          <DropdownMenuItemTitle tw="text-gray-700 dark:text-gray-300">
                            Report
                          </DropdownMenuItemTitle>
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenuRoot>
                </LeanView>
              </View>
            </LeanView>

            <View
              tw="my-2 mb-4"
              style={{ position: 'relative' }}
            >
              <View style={isPremium && statusUser !== 'APPROVED' ? { filter: 'blur(8px)' } : {}}>
                <Text tw="text-15 font-bold text-gray-900 dark:text-white">
                  {"Amazing NFT"}
                </Text>

                <View tw="h-3" />

                <View tw="mt-2 items-baseline">
                  <ClampText
                    text={messageContent}
                    maxLines={3}
                    tw="text-sm text-gray-900 dark:text-gray-100"
                  />
                </View>

                {item.channel_message?.attachments?.length > 0 &&
                  item.channel_message?.attachments[0].mime.includes("image") ? (
                  <ImagePreview
                    attachment={item.channel_message?.attachments[0]}
                    isViewable={permissions?.can_view_creator_messages}
                  />
                ) : null}
              </View>

              {isPremium && statusUser !== 'APPROVED' && (
                <View tw="absolute inset-0 bg-gray-100/10 dark:bg-gray-900/10 backdrop-blur-md">
                  <View tw="absolute inset-0 items-center justify-center">
                    <Button
                      onPress={handleOnboardPress}
                      variant="primary"
                      size="small"
                      labelTW="font-semibold"
                    >
                      Unlock Premium Content
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        </AnimatedView>
      </>
    );
  },
  // Update comparison function to include relevant props
  (prevProps, nextProps) => {
    return prevProps.statusUser === nextProps.statusUser &&
      prevProps.isPremium === nextProps.isPremium &&
      prevProps.item.channel_message?.id === nextProps.item.channel_message?.id;
  }
);

MessageItem.displayName = "MessageItem";
