import { Suspense, useState } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";

import type { ContentProps } from "universal-tooltip";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  Bell,
  BellFilled,
  CreatorChannel,
  CreatorChannelFilled,
  Home,
  HomeFilled,
  Hot,
  HotFilled,
  Plus,
  Showtime,
  User,
  Play,
  Heart,
  Instagram,
  Settings
} from "@showtime-xyz/universal.icon";
import { PressableHover } from "@showtime-xyz/universal.pressable-hover";
import { TW } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { useChannelsUnreadMessages } from "app/components/creator-channels/hooks/use-channels-unread-messages";
import { ErrorBoundary } from "app/components/error-boundary";
import { useNotifications } from "app/hooks/use-notifications";
import { useRedirectToCreateDrop } from "app/hooks/use-redirect-to-create-drop";
import { useRedirectToScreen } from "app/hooks/use-redirect-to-screen";
import { useUser } from "app/hooks/use-user";
import { Link } from "app/navigation/link";
import { useTranslation } from "react-i18next";
import { useMyInfo } from "app/hooks/api-hooks";
import { useEffect } from 'react';
import { useRedirectToSuperMenu } from "app/hooks/use-redirect-to-creator-token-social-share-screen";
import SvgEye from "design-system/icon/Eye";

// import SvgSmile from "design-system/icon/X";

type TabBarIconProps = {
  color?: string;
  focused?: boolean;
  tw?: TW;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

type TabBarButtonProps = {
  tab?: string;
  children: React.ReactNode;
  tw?: TW;
  onPress?: () => void;
};

function TabBarIcon({ tab, children, tw, onPress }: TabBarButtonProps) {
  if (Platform.OS === "web") {
    if (onPress) {
      return (
        <PressableHover
          onPress={onPress}
          tw={[
            "h-12 w-12 items-center justify-center rounded-full md:bg-gray-100 md:dark:bg-gray-900",
            tw ?? "",
          ]}
        >
          {children}
        </PressableHover>
      );
    }
    if (!tab) return null;
    return (
      <Link href={tab}>
        <View
          tw={[
            "h-12 w-12 items-center justify-center rounded-full md:bg-gray-100 md:dark:bg-gray-900",
            tw ?? "",
          ]}
        >
          {children}
        </View>
      </Link>
    );
  }

  return <View tw="h-12 w-14 items-center justify-center">{children}</View>;
}

export const HomeTabBarIcon = ({ color, focused }: TabBarIconProps) => {
  const { t } = useTranslation();
  return (
    <TabBarIcon tab="/">
      {focused ? (
        <HomeFilled
          style={{ zIndex: 1 }}
          width={24}
          height={24}
          color={color}
        />
      ) : (
        <Home style={{ zIndex: 1 }} width={24} height={24} color={color} />
      )}
      <Text style={{ marginVertical: 1, color: color, fontSize: 12 }} tw={`text-xs tracking-widest ${focused ? "text-shadow-md" : ""}`}>
        {t("menu.home")}
      </Text>
    </TabBarIcon>
  );
};

export const ShowtimeTabBarIcon = ({ tw }: TabBarIconProps) => {
  const isDark = useIsDarkMode();
  return (
    <TabBarIcon tab="/supermenu" tw={tw}>
      <Showtime
        style={{ borderRadius: 8, overflow: "hidden", width: 24, height: 24 }}
        color={isDark ? "#FFF" : "#000"}
        width={24}
        height={24}
      />
    </TabBarIcon>
  );
};

export const CreateTabBarIcon = ({
  color,
  tw = "",
  style,
}: TabBarIconProps) => {

  const redirectToSuperMenu = useRedirectToSuperMenu();
  return (
    <TabBarIcon onPress={redirectToSuperMenu}>
      <View
        tw={[
          "web:h-10 web:w-10 h-12 w-12 items-center justify-center rounded-full",
          "bg-black dark:bg-white",
          tw,
        ]}
        style={style}
      >
        <Plus width={24} height={24} color={color} />
      </View>
    </TabBarIcon>
  );
};

export const CreatorChannelsTabBarIcon = ({
  color,
  focused,
}: TabBarIconProps & {
  tooltipSide?: ContentProps["side"];
}) => {
  const { t } = useTranslation();
  const myInfo = useMyInfo();
  const [unreadData, setUnreadData] = useState<any>('');

  useEffect(() => {
    const unread = (myInfo?.data?.data?.profile?.follows || []).length;
    setUnreadData(unread);
  }, [myInfo]);

  return (
    <TabBarIcon tab="/groups">
      {focused ? (
        <CreatorChannelFilled width={24} height={24} color={color} />
      ) : (
        <CreatorChannel width={24} height={24} color={color} />
      )}
      {unreadData > 0 && (
        <View tw="web:-right-1 absolute right-1 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-indigo-700">
          <Text tw="text-[8px] text-white" style={{ lineHeight: 12 }}>
            {unreadData > 99 ? "99" : unreadData}
          </Text>
        </View>
      )}
      <Text style={{ marginVertical: 1, color: color, fontSize: 12 }} tw={`text-xs tracking-widest ${focused ? "text-shadow-md" : ""}`}>
        {t("menu.channels")}
      </Text>
    </TabBarIcon>
  );
};

export const TrendingTabBarIcon = ({ color, focused }: TabBarIconProps) => {
  return (
    <TabBarIcon tab="/foryou">
      {focused ? (
        <HotFilled style={{ zIndex: 1 }} width={24} height={24} color={color} />
      ) : (
        <Hot style={{ zIndex: 1 }} width={24} height={24} color={color} />
      )}
    </TabBarIcon>
  );
};
// This icon is temporary until we have creator channel feature
export const HotTabBarIconTemp = ({ color, focused }: TabBarIconProps) => {
  return (
    <TabBarIcon tab="/foryou">
      {focused ? (
        <HotFilled style={{ zIndex: 1 }} width={24} height={24} color={color} />
      ) : (
        <Hot style={{ zIndex: 1 }} width={24} height={24} color={color} />
      )}
    </TabBarIcon>
  );
};


export const NotificationsTabBarIcon = ({
  color,
  focused,
  onPress,
}: TabBarIconProps & {
  tooltipSide?: ContentProps["side"];
}) => {
  const { t } = useTranslation();
  // const { data } = useChannelsUnreadMessages();
  // const redirectToScreen = useRedirectToScreen();
  return (
    <TabBarIcon
      tab="/notifications"
    // onPress={() => {
    //   if (onPress) {
    //     onPress();
    //   } else {
    //     redirectToScreen({
    //       pathname: "/notifications",
    //     });
    //   }
    // }}
    >
      {focused ? (
        <BellFilled
          style={{ zIndex: 1 }}
          width={24}
          height={24}
          color={color}
        />
      ) : (
        <Bell style={{ zIndex: 1 }} width={24} height={24} color={color} />
      )}
      <ErrorBoundary renderFallback={() => <></>}>
        <Suspense fallback={null}>
          <UnreadNotificationIndicator />
        </Suspense>
      </ErrorBoundary>
      <Text style={{ marginVertical: 0, color: color, fontSize: 12 }} tw={`text-xs tracking-widest ${focused ? "text-shadow-md" : ""}`}>
        {t("menu.alerts")}
      </Text>
    </TabBarIcon>
  );
};

const UnreadNotificationIndicator = () => {
  const { hasUnreadNotification, data } = useNotifications();
  const notificationsCount = data ? data.length : 0;
  return (
    <>
      {notificationsCount > 0 && (
        <View tw="web:-right-1 absolute right-1 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-indigo-700">
          <Text tw="text-[8px] text-white" style={{ lineHeight: 12 }}>
            {notificationsCount > 99 ? "99" : notificationsCount}
          </Text>
        </View>
      )}
    </>
  );
};

export const ProfileTabBarIcon = ({ color }: TabBarIconProps) => {
  const { user, isAuthenticated } = useUser();
  const redirectToScreen = useRedirectToScreen();
  const { t } = useTranslation();
  return (
    <TabBarIcon
      onPress={() =>
        redirectToScreen({
          pathname: `/@${user?.data?.profile?.username}`,
        })
      }
    >
      {isAuthenticated ? (
        <Avatar
          url={user?.data?.profile?.img_url}
          size={28}
          alt={"Profile Avatar"}
        />
      ) : (
        <User color={color} width={24} height={24} />
      )}
      <Text style={{ marginVertical: 1, color: color, fontSize: 12 }} tw={`text-xs tracking-widest`}>
        {t("menu.profile")}
      </Text>
    </TabBarIcon>
  );
};

export const SettingsTabBarIcon = ({
  color,
  focused,
}: TabBarIconProps & {
  tooltipSide?: ContentProps["side"];
}) => {
  const { user, isAuthenticated } = useUser();
  const { t } = useTranslation();
  return (
    <>
      <TabBarIcon
        tab="/settings"
      >
        {isAuthenticated ? (
          <Settings
            width={24}
            height={24}
            color={'green'}
          />
        ) : (
          <Settings
            width={24}
            height={24}
            color={color}
          />
        )}
        <Text style={{ marginVertical: 1, color: color, fontSize: 12 }} tw={`text-xs tracking-widest ${focused ? "text-shadow-md" : ""}`}>
          {t("menu.settings")}
        </Text>
      </TabBarIcon>

      {/* <TabBarIcon
        tab="/settings"
      >
        {focused ? (
          <Settings
            width={24}
            height={24}
            color={color}
          />
        ) : (
          <Settings
            width={24}
            height={24}
            color={color}
          />
        )}

        <Text style={{ marginVertical: 0, color: color, fontSize: 12 }} tw={`text-xs tracking-widest ${focused ? "text-shadow-md" : ""}`}>
          {t("menu.settings")}
        </Text>
      </TabBarIcon> */}
    </>
  );
};

export const MySpaceTabBarIcon = ({
  color,
  focused,
}: TabBarIconProps & {
  tooltipSide?: ContentProps["side"];
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TabBarIcon tab="/space">
        <>
          {focused ? (
            <HotFilled style={{ zIndex: 1 }} width={24} height={24} color={color} />
          ) : (
            <Hot style={{ zIndex: 1 }} width={24} height={24} color={color} />
          )}
        </>
        <Text style={{ marginVertical: 1, color: color, fontSize: 12 }} tw={`text-xs tracking-widest ${focused ? "text-shadow-md" : ""}`}>
          {/* {t("menu.settings")} */}
          Space
        </Text>
      </TabBarIcon>
    </>
  );
};
