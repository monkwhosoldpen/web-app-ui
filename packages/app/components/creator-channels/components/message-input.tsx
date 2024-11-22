import {
  useEffect,
  useRef,
  useMemo,
  RefObject,
  memo,
} from "react";
import { Platform } from "react-native";

import Animated, {
  useAnimatedStyle,
} from "react-native-reanimated";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { ChevronDown } from "@showtime-xyz/universal.icon";
import { FlashList } from "@showtime-xyz/universal.infinite-scroll-list";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";

import { MessageBox } from "app/components/messages";
import { CreatorEditionResponse } from "app/hooks/use-creator-collection-detail";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { Profile } from "app/types";

import { ChannelById } from "../types";
import { View } from "@showtime-xyz/universal.view";
import { FollowButtonSmall } from "app/components/follow-button-small";
import { useMyInfo } from "app/hooks/api-hooks";

export const ScrollToBottomButton = ({ onPress }: { onPress: any }) => {
  return (
    <Pressable
      onPress={onPress}
      tw="items-center justify-center rounded-full bg-black/40 p-1 dark:bg-white/40"
    >
      <ChevronDown height={32} width={32} color="white" />
    </Pressable>
  );
};

import { useCallback, useState } from "react";
import { Text } from "@showtime-xyz/universal.text";
import { OnboardButtonSmall } from "app/components/onboard-button-small";


export const MessageBoxUnavailable = ({ channelId, channelOwnerProfile }: any) => {
  const { refetchMyInfo, data: myInfoData } = useMyInfo();

  const [statusUser, setStatusUser] = useState<any>(null);

  useEffect(() => {
    const statusUser_ = myInfoData
      ? myInfoData?.data?.profile?.is_anonymous
        ? "Anonymous"
        : "Non Anonymous"
      : "NOT Logged In";
    setStatusUser(statusUser_);
  }, [myInfoData]);
  return (
    <>
      <View tw="p-0">
        <View tw="mb-0 mt-0">
          <View tw="flex-row items-center justify-between">
            <View tw="flex-1">
              <MessageBox
                placeholder="Coming soon..."
                tw="bg-white text-center dark:bg-black mr-0"
                textInputProps={{
                  editable: false,
                }}
                submitButton={<></>}
              />
            </View>

            {/* <View tw="ml-0 pr-4">
              <View style={{ width: 100, height: 26, paddingTop: 4 }}>
                <Text>{statusUser}</Text>
                <OnboardButtonSmall
                  size={"small"}
                  tw={["",]}
                  style={{ backgroundColor: "#08F6CC", height: 26 }}
                  name={channelId} username={channelId}
                />
              </View>
            </View> */}
          </View>
        </View>
      </View>
    </>
  );
};

export const MessageInput = memo(
  ({
    channelId,
    editMessage,
    keyboard,
    channelOwnerProfile
  }: {
    listRef: RefObject<FlashList<any>>;
    channelId: string;
    keyboard: any;
    sendMessageCallback?: () => void;
    editMessage?: undefined | { id: number; text: string };
    setEditMessage: (v: undefined | { id: number; text: string }) => void;
    isUserAdmin?: boolean;
    edition?: any;
    hasUnlockedMessages?: boolean;
    permissions?: ChannelById["permissions"];
    channelOwnerProfile?: Profile;
  }) => {
    const insets = useSafeAreaInsets();
    const bottomHeight = usePlatformBottomHeight();

    const inputRef = useRef<any>(null);
    const isDark = useIsDarkMode();

    const bottom = useMemo(
      () =>
        Platform.select({
          web: bottomHeight,
          ios: insets.bottom / 2,
          android: 0,
        }),
      [bottomHeight, insets.bottom]
    );

    /*
    useEffect(() => {
      // autofocus with ref is more stable than autoFocus prop
      setTimeout(() => {
        // prevent some UI jank on android
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }, 600);
    }, []);
    */

    const style = useAnimatedStyle(() => {
      return {
        paddingBottom: bottom,
        backgroundColor: isDark ? "black" : "white",
        transform: [
          {
            translateY:
              keyboard.height.value -
              (keyboard.height.value ? -(insets.bottom / 2) : 0),
          },
        ],
      };
    }, [keyboard, bottom]);

    useEffect(() => {
      if (editMessage) {
        inputRef.current?.setValue(editMessage.text);
        inputRef.current?.focus();
      } else {
        inputRef.current?.setValue("");
      }
    }, [editMessage]);

    return (
      <>
        <Animated.View style={style}>
          <MessageBoxUnavailable channelId={channelId} channelOwnerProfile={channelOwnerProfile} />
        </Animated.View>
      </>
    );
  }
);

MessageInput.displayName = "MessageInput";
