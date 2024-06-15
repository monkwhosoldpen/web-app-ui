import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Platform, useWindowDimensions } from "react-native";

import * as Popover from "@radix-ui/react-popover";
import { SvgProps } from "react-native-svg";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { Button } from "@showtime-xyz/universal.button";
import { useColorScheme } from "@showtime-xyz/universal.color-scheme";
import { Divider } from "@showtime-xyz/universal.divider";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  Bell,
  BellFilled,
  Home,
  Search as SearchIcon,
  ShowtimeBrand,
  Hot,
  User,
  Plus,
  PhonePortraitOutline,
  CreatorChannel,
  Settings,
  Menu,
  Edit,
  Moon,
  Sun,
  DarkMode,
  LogOut,
  ChevronRight,
  SearchFilled,
  Download3,
  AccessTicket,
  Smile,
  Showtime,
} from "@showtime-xyz/universal.icon";
import { Image } from "@showtime-xyz/universal.image";
import { useRouter } from "@showtime-xyz/universal.router";
import { Spinner } from "@showtime-xyz/universal.spinner";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import { ErrorBoundary } from "app/components/error-boundary";
import { Notifications } from "app/components/notifications";
import { Search } from "app/components/search";
import { useAuth } from "app/hooks/auth/use-auth";
import { downloadCollectorList } from "app/hooks/use-download-collector-list";
import { useFooter } from "app/hooks/use-footer";
import { useNotifications } from "app/hooks/use-notifications";
import { useRedirectToCreateDrop } from "app/hooks/use-redirect-to-create-drop";
import { useUser } from "app/hooks/use-user";
import { Link, TextLink } from "app/navigation/link";
import { useNavigateToLogin } from "app/navigation/use-navigate-to";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "design-system/dropdown-menu";

import { useChannelsUnreadMessages } from "../creator-channels/hooks/use-channels-unread-messages";
import { withColorScheme } from "../memo-with-theme";
import { useTranslation } from "react-i18next";
import { LanguageDropDown } from "./LanguageDropdown";
import { ShowtimeBrandLogo } from "../showtime-brand";
import { useRedirectToSuperMenu } from "app/hooks/use-redirect-to-creator-token-social-share-screen";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { Alert } from "@showtime-xyz/universal.alert";

const NotificationsInHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasUnreadNotification } = useNotifications();

  const router = useRouter();
  const isDark = useIsDarkMode();
  const prevPath = useRef(router.pathname);
  const prevQuery = useRef(router.query);

  useEffect(() => {
    if (
      Platform.OS === "web" &&
      isOpen &&
      (prevPath.current !== router.pathname ||
        prevQuery.current !== router.query)
    ) {
      setIsOpen(false);
    }
    prevPath.current = router.pathname;
    prevQuery.current = router.query;
  }, [router.pathname, isOpen, router.query]);
  const Icon = isOpen ? BellFilled : Bell;
  return (
    <Popover.Root modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <View tw="mt-2 h-12 flex-row items-center rounded-2xl pl-4 transition-all hover:bg-gray-50 hover:dark:bg-gray-900">
          <View>
            <Icon color={isDark ? "#fff" : "#000"} width={24} height={24} />
            <View
              tw="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-500 "
              style={{ opacity: hasUnreadNotification ? 1 : 0 }}
            />
          </View>
          <Text tw={["ml-4 text-lg text-black dark:text-white"]}>
            Notifications
          </Text>
        </View>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={36} side="right" align="center">
          <View
            tw="h-screen w-[332px] overflow-hidden border-l border-gray-200 bg-white dark:border-r dark:border-gray-800 dark:bg-black"
            style={{
              // @ts-ignore
              boxShadow: "rgb(0 0 0 / 10%) 5px 15px 15px",
            }}
          >
            <ErrorBoundary>
              <Suspense
                fallback={
                  <View tw="p-4">
                    <Spinner />
                  </View>
                }
              >
                <Notifications useWindowScroll={false} />
              </Suspense>
            </ErrorBoundary>
          </View>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const SearchInHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isDark = useIsDarkMode();
  const prevPath = useRef(router.pathname);
  const prevQuery = useRef(router.query);
  const { t } = useTranslation();
  useEffect(() => {
    if (
      Platform.OS === "web" &&
      isOpen &&
      (prevPath.current !== router.pathname ||
        prevQuery.current !== router.query)
    ) {
      setIsOpen(false);
    }
    prevPath.current = router.pathname;
    prevQuery.current = router.query;
  }, [router.pathname, isOpen, router.query]);

  const Icon = isOpen ? SearchFilled : SearchIcon;
  return (
    <Popover.Root modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <View tw="mt-2 h-12 flex-row items-center rounded-2xl pl-4 transition-all hover:bg-gray-50 hover:dark:bg-gray-900">
          <Icon color={isDark ? "#fff" : "#000"} width={24} height={24} />
          <Text tw={["ml-4 text-lg text-black dark:text-white"]}> {t('menu.search')}</Text>
        </View>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={36} side="right" align="center">
          <View
            tw="h-screen w-[332px] overflow-hidden border-l border-gray-200 bg-white dark:border-r dark:border-gray-800 dark:bg-black"
            style={{
              // @ts-ignore
              boxShadow: "rgb(0 0 0 / 10%) 5px 15px 15px",
            }}
          >
            <ErrorBoundary>
              <Suspense
                fallback={
                  <View tw="p-4">
                    <Spinner />
                  </View>
                }
              >
                <Search />
              </Suspense>
            </ErrorBoundary>
          </View>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
const MenuItem = ({
  focused,
  href,
  icon,
  title,
}: {
  focused?: boolean;
  href: string;
  icon: any;
  title: string;
}) => {
  return (
    <Link
      tw={[
        "mt-2 h-[50px] flex-row items-center rounded-2xl pl-4 transition-all hover:bg-gray-100 hover:dark:bg-gray-900",
        focused && "bg-gray-100 dark:bg-gray-800",
      ].join(" ")}
      href={href}
    >
      {icon()}
      <Text
        tw={[
          "ml-4 text-lg text-black dark:text-white",
          focused ? "font-bold" : "font-normal",
        ]}
      >
        {title}
      </Text>
    </Link>
  );
};

const ChannelsUnreadMessages = () => {
  const { data } = useChannelsUnreadMessages();

  if (!data || data.unread <= 0) return null;

  return (
    <View tw="absolute right-2 items-center justify-center rounded-full bg-indigo-500 px-2.5 py-1.5 text-center">
      <Text tw="text-center text-sm text-white" style={{ lineHeight: 12 }}>
        {data.unread > 99 ? "99+" : data.unread}
      </Text>
    </View>
  );
};

export const HeaderMd = withColorScheme(() => {
  const { user, isAuthenticated } = useUser();

  const redirectToSuperMenu = useRedirectToSuperMenu();
  const navigateToLogin = useNavigateToLogin();
  const { links, social } = useFooter();
  const isDark = useIsDarkMode();
  const router = useRouter();
  const iconColor = isDark ? "#fff" : "#000";
  const { setColorScheme } = useColorScheme();
  const { logout } = useAuth();
  const { height: screenHeight } = useWindowDimensions();

  const { t } = useTranslation();

  const HOME_ROUTES = useMemo(
    () => [
      {
        title: t("menu.home"),
        key: "Home",
        icon: Home,
        pathname: "/",
        focused: router.pathname.includes("/"),
        visible: true,
      },
      {
        title: t("menu.channels"),
        key: "Channels",
        icon: CreatorChannel,
        pathname: "/groups",
        focused: router.pathname.includes("groups"),
        visible: true,
      },
      // {
      //   title: t("Trending"),
      //   key: "Trending",
      //   icon: Hot,
      //   pathname: "/trending",
      //   focused: router.pathname === "/trending",
      //   visible: true,
      // },
      {
        title: t("menu.search"),
        key: "Search",
        icon: SearchIcon,
        pathname: "/search",
        focused: router.pathname.includes("/search"),
        visible: true,
      },
      {
        title: t("menu.alerts"),
        key: "Alerts",
        icon: Bell,
        pathname: "/notifications",
        focused: router.pathname.includes("/notifications"),
        visible: true,
      },
      {
        title: t("menu.settings"),
        key: "Settings",
        icon: Settings,
        pathname: "/settings",
        focused: router.pathname.includes("/settings"),
        visible: true,
      },
      // {
      //   title: t("Profile"),
      //   key: "Profile",
      //   icon: (props: SvgProps) =>
      //     isAuthenticated ? (
      //       <Avatar
      //         url={user?.data?.profile?.img_url}
      //         size={28}
      //         alt={"Profile Avatar"}
      //       />
      //     ) : (
      //       <User {...props} />
      //     ),
      //   pathname: `/@${user?.data?.profile.username}`,
      //   focused: router.asPath === `/@${user?.data?.profile.username}`,
      //   visible: isAuthenticated,
      // },
    ].filter((item) => !!item?.visible),
    []
  );
  return (
    <View tw="fixed top-0 h-full bg-white pl-2 dark:bg-black">
      <View tw="h-full min-h-screen w-60 overflow-y-auto pl-4">
        <Link
          href="/"
          tw="flex-row items-center"
          style={{
            paddingTop: screenHeight > 860 ? 40 : 24,
          }}
        >
          <ShowtimeBrandLogo color={iconColor} width={19 * (84 / 16)} height={19} />
        </Link>

        <View tw="-ml-4 mt-5 w-48 justify-center">

          {HOME_ROUTES.map((item) => {
            if (item.key === "Notifications") {
              return <NotificationsInHeader key={item.key} />;
            }
            if (item.key === "Search") {
              return <SearchInHeader key={item.key} />;
            }
            return (
              <MenuItem
                focused={item.focused}
                href={item.pathname}
                icon={() => {
                  return (
                    <>
                      {item.icon({
                        color: iconColor,
                        width: 24,
                        height: 24,
                      })}
                      {item.key === "Channels" ? (
                        <ChannelsUnreadMessages />
                      ) : null}
                    </>
                  );
                }}
                title={item.title}
                key={item.pathname}
              />
            );
          })}

          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <View
                tw={[
                  "mt-2 h-12 cursor-pointer flex-row items-center rounded-2xl pl-4 transition-all hover:bg-gray-50 hover:dark:bg-gray-900",
                ]}
              >
                <Menu width={24} height={24} color={iconColor} />
                <Text tw={["ml-4 text-lg text-black dark:text-white"]}>
                  {t('menu.more')}
                </Text>
              </View>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              style={{ minWidth: 150 }}
              disableBlurEffect
              side="bottom"
              sideOffset={0}
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger key="nested-group-trigger">
                  <MenuItemIcon
                    Icon={isDark ? Moon : Sun}
                    ios={{
                      name: isDark ? "moon" : "sun.max",
                    }}
                  />

                  <DropdownMenuItemTitle tw="w-full text-gray-700 dark:text-neutral-100">
                    {t('menu.theme')}
                  </DropdownMenuItemTitle>

                  <View tw="absolute right-0">
                    <ChevronRight
                      width={20}
                      height={20}
                      color={isDark ? "#fff" : colors.gray[900]}
                    />
                  </View>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  disableBlurEffect
                  alignOffset={-8}
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onSelect={() => setColorScheme("light")}
                    key="nested-group-1"
                  >
                    <MenuItemIcon Icon={Sun} ios={{ name: "sun.max" }} />
                    <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-100">
                      {t('menu.light')}
                    </DropdownMenuItemTitle>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setColorScheme("dark")}
                    key="nested-group-2"
                  >
                    <MenuItemIcon Icon={Moon} ios={{ name: "moon" }} />
                    <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-100">
                      {t('menu.dark')}
                    </DropdownMenuItemTitle>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setColorScheme(null)}
                    key="nested-group-3"
                  >
                    <MenuItemIcon
                      Icon={DarkMode}
                      ios={{
                        name: "circle.righthalf.filled",
                      }}
                    />
                    <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-100">
                      {t('menu.system')}
                    </DropdownMenuItemTitle>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {isAuthenticated && (
                <DropdownMenuItem destructive onSelect={logout} key="sign-out">
                  <MenuItemIcon
                    Icon={LogOut}
                    ios={{ name: "rectangle.portrait.and.arrow.right" }}
                  />
                  <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-100">
                    {t('menu.signout')}
                  </DropdownMenuItemTitle>
                </DropdownMenuItem>
              )}

              {!isAuthenticated && (
                <DropdownMenuItem destructive onSelect={navigateToLogin} key="sign-in">
                  <MenuItemIcon
                    Icon={LogOut}
                    ios={{ name: "rectangle.portrait.and.arrow.right" }}
                  />
                  <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-100">
                    {t('menu.signin')}
                  </DropdownMenuItemTitle>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenuRoot>

        </View>

        <View tw="w-40">

          <View tw="mt-4">
            <LanguageDropDown />
          </View>

          {true && (
            <Button size="regular" tw="mt-4" onPress={redirectToSuperMenu}>
              <>
                <Showtime width={20} height={20} color={isDark ? "#000" : "#fff"} />
                <Text tw="ml-2 text-base font-bold text-white dark:text-gray-900">
                  {t('Download.Start')}
                </Text>
              </>
            </Button>
          )}

          <Divider tw="my-5" />

          <View tw="rounded-2xl border  border-gray-200 pb-2 pt-4 dark:border-gray-600">
            <View tw="flex-row items-center justify-center">
              <PhonePortraitOutline color={iconColor} width={18} height={18} />
              <Text tw="text-15 ml-1 font-bold dark:text-white">{t('menu.getApp')}</Text>
            </View>
            <Pressable onPress={() => {
              Alert.alert("🚧 Coming soon");
            }}>
              <View tw="flex items-center justify-between px-2 pt-4">
                {/* <Link
                  href=""
                  target="_blank"
                  tw="duration-150 hover:scale-105"
                > */}
                <Image
                  source={{
                    uri: "/assets/AppStoreDownload.png",
                  }}
                  width={120}
                  height={40}
                  alt="App Store"
                />
                {/* </Link> */}
                {/* <Link
                href=""
                target="_blank"
                tw="mt-2 duration-150 hover:scale-105"
              > */}
                <Image
                  source={{
                    uri: "/assets/GooglePlayDownload.png",
                  }}
                  width={120}
                  height={40}
                  alt="Google Play"
                />
                {/* </Link> */}
              </View>
            </Pressable>
          </View>
        </View>
        <View
          tw={[
            "bottom-0 mt-4 inline-block",
            screenHeight > 840 ? "absolute" : "relative",
          ]}
          style={{}}
        >
          <View tw="inline-block">
            {links.map((item) => (
              <TextLink
                href={item.link}
                target="_blank"
                tw="text-xs text-gray-500 dark:text-gray-300"
                key={item.title}
              >
                {item.title}
                {` · `}
              </TextLink>
            ))}
          </View>
          <Text tw="text-xs text-gray-500 dark:text-gray-300">
            © 2023 goatsconnect, Inc.
          </Text>
          <View tw="mt-2 inline-block w-full">
            {social.map((item) => (
              <Link
                href={item.link}
                hrefAttrs={{
                  target: "_blank",
                  rel: "noreferrer",
                }}
                key={item.title}
                tw="inline-block w-1/4"
              >
                {item?.icon({
                  color: colors.gray[400],
                  width: 20,
                  height: 20,
                })}
              </Link>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});
