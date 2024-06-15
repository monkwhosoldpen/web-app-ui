import { useCallback, useEffect, useRef, useState, memo } from "react";
import { Platform, RefreshControl, useWindowDimensions } from "react-native";

import { ListRenderItemInfo } from "@shopify/flash-list";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { InfiniteScrollList } from "@showtime-xyz/universal.infinite-scroll-list";
import { ModalSheet } from "@showtime-xyz/universal.modal-sheet";
import { Spinner } from "@showtime-xyz/universal.spinner";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { NotificationsSettingIcon } from "app/components/header/notifications-setting-icon";
import { NotificationItem } from "app/components/notifications/notification-item";
import { UserList } from "app/components/user-list";
import { useMyInfo } from "app/hooks/api-hooks";
import {
  Actor,
  NotificationType,
  useNotifications,
} from "app/hooks/use-notifications";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { axios } from "app/lib/axios";
import { useHeaderHeight } from "app/lib/react-navigation/elements";
import { useScrollToTop } from "app/lib/react-navigation/native";

import { EmptyPlaceholder } from "../empty-placeholder";
import { useTopCreatorToken } from "app/hooks/creator-token/use-creator-tokens";
import { TopCreatorTokenListItem, TopCreatorTokenListItemSkeleton } from "../creator-token/creator-token-users";

import { useScrollbarSize } from "app/hooks/use-scrollbar-size";
import { breakpoints } from "design-system/theme";
import { useContentWidth } from "app/hooks/use-content-width";
import { useTranslation } from "react-i18next";
import { LockV2 } from "@showtime-xyz/universal.icon";
import { NotAuthenticatedPlaceholder } from "../not-authenticated-placeholder";


type NotificationsProps = {
  hideHeader?: boolean;
  useWindowScroll?: boolean;
};

const keyExtractor = (item: any, index: any) => {
  return item?.id?.toString();
};

/*
const getItemType = (item: NotificationType) => {
  return item.type_name;
};
*/

export const Notifications = memo(
  ({ hideHeader = false, useWindowScroll = true }: NotificationsProps) => {

    const { data, fetchMore, refresh, isRefreshing, isLoadingMore } =
      useNotifications();
    const [filteredData, setFilteredData] = useState<any>([]);

    const { width } = useScrollbarSize();
    const contentWidth = useContentWidth();
    const isMdWidth = contentWidth + width > breakpoints["md"];

    const { t } = useTranslation();

    const ListEmptyComponent = useCallback(() => {
      if (isLoadingMore) {
        return (
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
        );
      }
      return (
        <EmptyPlaceholder
          title={t('EmptyDataNotifications')}
          tw="h-[50vh]"
        />
      );
    }, [isLoadingMore, isMdWidth]);


    const { refetchMyInfo } = useMyInfo();
    const isDark = useIsDarkMode();
    const bottomBarHeight = usePlatformBottomHeight();
    const headerHeight = useHeaderHeight();
    const { height: windowHeight } = useWindowDimensions();
    const listRef = useRef<any>();
    useScrollToTop(listRef);

    const renderItem = useCallback(
      ({ item }: ListRenderItemInfo<NotificationType>) => {
        return <NotificationItem notification={item} />;
      },
      []
    );

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

    return (
      <>
        <InfiniteScrollList
          useWindowScroll={useWindowScroll}
          data={data}
          ListHeaderComponent={NotificationsHeader}
          // for blur header effect on iOS
          style={{
            height: Platform.select({
              default: windowHeight - bottomBarHeight,
              web: useWindowScroll ? windowHeight - bottomBarHeight : undefined,
              ios: windowHeight,
            }),
          }}
          // for blur effect on Native
          contentContainerStyle={Platform.select({
            ios: {
              paddingTop: headerHeight,
              paddingBottom: bottomBarHeight,
            },
            android: {
              paddingBottom: bottomBarHeight,
            },
            default: {},
          })}
          // Todo: unity refresh control same as tab view
          containerTw="pretty-scrollbar"
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ref={listRef}
          estimatedItemSize={53}
          ListEmptyComponent={ListEmptyComponent}
        />

      </>
    );
  }
);

Notifications.displayName = "Notifications";


const NotificationsHeader = memo(function NotificationsHeader() {
  const { t } = useTranslation(); // Initialize the translation function
  const isDark = useIsDarkMode();
  return (
    <View tw="w-full">
      <>
        <View tw="px-4 md:px-4">
          <View tw=" border-b border-gray-200 pb-4 dark:border-gray-700">
            <View tw="flex-row items-center justify-between pb-4 pt-6">
              <Text tw="text-gray-1100 text-lg font-bold dark:text-white">
                {t('Notifications.headerText')} {/* Using translation key for header */}
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
                {t('Notifications.subheaderText')} {/* Using translation key for subheader */}
              </Text>
            </View>
          </View>

        </View>
      </>
    </View>
  );
});
