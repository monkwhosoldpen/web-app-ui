import { useMemo } from "react";
import { Platform, useWindowDimensions } from "react-native";

import { Button } from "@showtime-xyz/universal.button";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  MoreHorizontal,
  Copy,
  Flag,
  Slash,
  UserMinus,
  UserPlus,
} from "@showtime-xyz/universal.icon";
import { useRouter } from "@showtime-xyz/universal.router";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import { useMyInfo } from "app/hooks/api-hooks";
import { useBlock } from "app/hooks/use-block";
import { useShare } from "app/hooks/use-share";
import { Analytics, EVENTS } from "app/lib/analytics";
import type { Profile } from "app/types";
import { useTranslation } from "react-i18next";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "design-system/dropdown-menu";

import {
  useCallback,
  useState,
  useEffect,
} from "react";

type Props = {
  user: Profile;
  tw?: string;
};

function ProfileDropdown({ user, tw = "" }: Props) {
  const router = useRouter();
  const { share } = useShare();
  const { width } = useWindowDimensions();
  const isDark = useIsDarkMode();
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const [sampleMarkdown, setSampleMarkdown] = useState<any>({});
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
        {/* <DropdownMenuItem
          onSelect={async () => {
            const result = await share({
              url: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/@${user?.username}`,
            });

            if (result.action === "sharedAction") {
              Analytics.track(
                EVENTS.USER_SHARED_PROFILE,
                result.activityType ? { type: result.activityType } : undefined
              );
            }
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
        </DropdownMenuItem> */}

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
            {t('report')}
          </DropdownMenuItemTitle>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export { ProfileDropdown };
