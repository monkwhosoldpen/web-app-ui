import { useCallback } from "react";
import { Platform } from "react-native";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  ArrowLeft,
  Settings,
} from "@showtime-xyz/universal.icon";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useRouter } from "@showtime-xyz/universal.router";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";

import { AvatarHoverCard } from "app/components/card/avatar-hover-card";

import { HeaderProps } from "../types";
// import { View as LeanView } from "./lean-text";
import { LanguageDropDown } from "app/components/header/LanguageDropdown";

import { useWindowDimensions } from "react-native";

import { Button } from "@showtime-xyz/universal.button";
import {
  MoreHorizontal,
  Copy,
  Flag,
} from "@showtime-xyz/universal.icon";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import { Analytics, EVENTS } from "app/lib/analytics";
import type { Profile } from "app/types";
import { useEffect, useState } from 'react';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "design-system/dropdown-menu";
import { View as LeanView } from "@showtime-xyz/universal.view";

export const MessagesHeader = (props: HeaderProps) => {
  const router = useRouter();
  const isDark = useIsDarkMode();
  const [image_url, setImage_url] = useState<any>('');

  useEffect(() => {
    if (props.picture) {
      const image_url = props.picture.url;
      setImage_url(image_url);
    }
  }, [props]);

  return (
    <LeanView
      tw="web:pt-2 web:md:py-5 android:pt-4 flex-row items-center border-gray-200 px-2.5 pb-2 dark:border-gray-800 md:border-b"
      style={{ columnGap: 8 }}
    >
      <LeanView tw="flex-row items-center" style={{ columnGap: 10 }}>
        <Pressable
          onPress={() => {
            router.back();
          }}
          tw="lg:hidden"
          hitSlop={15}
        >
          <ArrowLeft
            height={26}
            width={26}
            color={isDark ? "white" : "black"}
          />
        </Pressable>
        <LeanView>
          <AvatarHoverCard
            username={props.username}
            url={image_url}
            size={34}
            alt="Channels Avatar"
          />
        </LeanView>
      </LeanView>
      {props.channelId ? (
        <>
          <LeanView tw="flex-1" style={{ rowGap: 8 }}>
            <Text
              onPress={() => router.push(`/@${props.username}`)}
              tw="text-sm font-bold text-gray-900 dark:text-gray-100"
            >
              {props.username ?? "Loading..."}
            </Text>
          </LeanView>
          <LeanView tw="flex-row items-center justify-center">
            {/* <Pressable onPress={props.onPressSettings}>
              <Settings
                height={Platform.OS === "web" ? 20 : 24}
                width={Platform.OS === "web" ? 20 : 24}
                color={isDark ? colors.gray["100"] : colors.gray[500]}
              />
            </Pressable> */}
            <ProfileDropdown user={props} propsFromMessages={props} />
            <LanguageDropDown />
          </LeanView>
        </>
      ) : null}
    </LeanView>
  );
};


function ProfileDropdown({ user, tw = "", propsFromMessages }: any) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDark = useIsDarkMode();
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button
          variant="tertiary"
          iconOnly
          size={width < 768 ? "small" : "regular"}
          tw={tw}
        >
          <MoreHorizontal
            width={24}
            height={24}
            color={isDark ? "#FFF" : "#000"}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent loop sideOffset={8}>
        <DropdownMenuItem
          onSelect={async () => {
            propsFromMessages.onPressShare();
            Analytics.track(
              EVENTS.USER_SHARED_PROFILE, undefined
            );
          }}
          key="share"
        >
          <MenuItemIcon
            Icon={Copy}
            ios={{
              name: "square.and.arrow.up",
            }}
          />
          <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
            Share
          </DropdownMenuItemTitle>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={async () => {
            router.push(
              {
                pathname: Platform.OS === "web" ? router.pathname : "/report",
                query: {
                  ...router.query,
                  reportModal: true,
                  userId: user.profile_id,
                },
              },
              Platform.OS === "web" ? router.asPath : undefined
            );
          }}
          key="report"
        >
          <MenuItemIcon Icon={Flag} ios={{ name: "flag" }} />
          <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
            Report
          </DropdownMenuItemTitle>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={async () => {
            propsFromMessages.onPressSettings();
          }}
          key="settings"
        >
          <MenuItemIcon Icon={Settings} ios={{ name: "flag" }} />
          <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
            Settings
          </DropdownMenuItemTitle>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
