import { Platform, useWindowDimensions } from "react-native";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { useColorScheme } from "@showtime-xyz/universal.color-scheme";
import {
  Edit,
  Moon,
  Sun,
  LogOut,
  DarkMode,
  UserCircle,
  Eye,
  LockV2,
  Flash,
} from "@showtime-xyz/universal.icon";
import { useRouter } from "@showtime-xyz/universal.router";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import { useAuth } from "app/hooks/auth/use-auth";
import { useUser } from "app/hooks/use-user";
import { Profile } from "app/types";

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
import { breakpoints } from "design-system/theme";
import { useNavigateToLogin } from "app/navigation/use-navigate-to";

type HeaderDropdownProps = {
  type: "profile" | "settings";
  withBackground?: boolean;
  user?: Profile;
};
function HeaderDropdown({
  type,
  withBackground = false,
  user,
}: HeaderDropdownProps) {

  const { logout } = useAuth();
  const navigateToLogin = useNavigateToLogin();
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { user: currentUser, isAuthenticated } = useUser();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isMdWidth = width >= breakpoints["md"];
  const isDark = colorScheme === "dark";

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        {type === "profile" ? (
          <View tw="flex h-8 cursor-pointer flex-row items-center justify-center rounded-full bg-gray-100 px-0 dark:bg-gray-900">
            <Flash
              width={24}
              height={24}
              color={withBackground ? "#FFF" : isDark ? "#FFF" : "#000"}
            />
            {isWeb && isMdWidth && user?.username ? (
              <Text tw="ml-2 mr-1 font-semibold dark:text-white ">
                {`@${user.username}`}
              </Text>
            ) : null}
          </View>
        ) : (
          <View
            tw={[
              "h-8 w-8 items-center justify-center rounded-full",
              withBackground ? "bg-black/60" : "",
            ]}
          >
            <Flash
              width={24}
              height={24}
              color={withBackground ? "#FFF" : isDark ? "#FFF" : "#000"}
            />
          </View>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent loop sideOffset={12}>
        {
          <DropdownMenuItem
            onSelect={() => {
              router.push(
                Platform.select({
                  native: "/editPreferences",
                  // @ts-ignore
                  web: {
                    pathname: router.pathname,
                    query: { ...router.query, editPreferencesModal: true },
                  },
                }),
                Platform.select({
                  native: "/editPreferences",
                  web: router.asPath === "/" ? "/editPreferences" : router.asPath,
                }),
                { shallow: true }
              );
            }}
            key="edit-location"
          >
            <MenuItemIcon
              Icon={Edit}
              ios={{
                name: "square.and.pencil",
              }}
            />

            <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
              Edit Location
            </DropdownMenuItemTitle>
          </DropdownMenuItem>
        }

        <DropdownMenuSub>
          <DropdownMenuSubTrigger key="nested-group-trigger">
            <MenuItemIcon
              Icon={isDark ? Moon : Sun}
              ios={{
                name: isDark ? "moon" : "sun.max",
              }}
            />

            <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
              Theme
            </DropdownMenuItemTitle>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onSelect={() => setColorScheme("light")}
              key="nested-group-1"
            >
              <MenuItemIcon Icon={Sun} ios={{ name: "sun.max" }} />
              <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
                Light
              </DropdownMenuItemTitle>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setColorScheme("dark")}
              key="nested-group-2"
            >
              <MenuItemIcon Icon={Moon} ios={{ name: "moon" }} />
              <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
                Dark
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
              <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
                System
              </DropdownMenuItemTitle>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {!isAuthenticated && (
          <DropdownMenuItem destructive onSelect={navigateToLogin} key="sign-in">
            <MenuItemIcon
              Icon={LogOut}
              ios={{ name: "rectangle.portrait.and.arrow.right" }}
            />
            <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
              Sign In
            </DropdownMenuItemTitle>
          </DropdownMenuItem>
        )}

        {isAuthenticated && (
          <DropdownMenuItem destructive onSelect={logout} key="sign-out">
            <MenuItemIcon
              Icon={LogOut}
              ios={{ name: "rectangle.portrait.and.arrow.right" }}
            />
            <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
              Sign Out
            </DropdownMenuItemTitle>
          </DropdownMenuItem>
        )}

      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export { HeaderDropdown };
