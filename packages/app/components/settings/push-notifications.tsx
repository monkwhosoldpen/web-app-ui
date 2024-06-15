import { useMemo } from "react";
import { Platform } from "react-native";

import { Spinner } from "@showtime-xyz/universal.spinner";
import { Switch } from "@showtime-xyz/universal.switch";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import {
  useEditPushNotificationsPreferences,
  usePushNotificationsPreferences,
} from "app/hooks/use-push-notifications-preferences";

import { SettingsTitle } from "./settings-title";
import { useUser } from "app/hooks/use-user";
import { useNavigateToLogin } from "app/navigation/use-navigate-to";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { ShowPermissionsNotifications } from "../serviceWorkerSettings";

export type PushNotificationKey =
  | "location_new_message"
  | "channel_new_message"
  | "location_new_message1"
  | "channel_new_message1"
  | "summary_start_of_day"
  | "summary_end_of_day";

type GroupKey = "Alerts" | "Channels";
type GroupValue = Array<PushNotificationKey>;

type NotificationGroups = Record<GroupKey, GroupValue> &
  Partial<Record<"Others", GroupValue>>;

const notificationMapping = {
  location_new_message: {
    title: "Location Channel Message",
    description:
      "When a message is posted in a location channel you’ve joined.",
  },
  channel_new_message: {
    title: "Following Channel Message",
    description: "When a new message is posted in a channel you are part of.",
  },
  location_new_message1: {
    title: "Location Channel Message",
    description:
      "When a message is posted in a location channel you’ve joined.",
  },
  channel_new_message2: {
    title: "Following Channel Message",
    description: "When a new message is posted in a channel you are part of.",
  },
};

const nGroups: NotificationGroups = {
  "Channels": ["location_new_message", "channel_new_message"],
  "Alerts": ["location_new_message1", "channel_new_message1"],
  // "Alerts": [
  //   "summary_end_of_day",
  //   "summary_start_of_day",
  // ],
};

export type PushNotificationTabProp = {
  index?: number;
};

export const PushNotificationTab = () => {
  const { data, isLoading } = usePushNotificationsPreferences();
  const { trigger } = useEditPushNotificationsPreferences();
  const { isAuthenticated } = useUser();

  const { t, i18n } = useTranslation(); // Include i18n for language change detection

  // State for triggering a re-render
  const [forceUpdate, setForceUpdate] = useState(false);

  // UseEffect to re-render when the language changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [i18n.language]);

  const validatedData = useMemo(() => {
    if (!data) return {};

    return Object.keys(data).reduce((result, key) => {
      if (
        (Object.keys(notificationMapping) as PushNotificationKey[]).includes(
          key as PushNotificationKey
        )
      ) {
        result[key as PushNotificationKey] = data[key];
      }
      return result;
    }, {} as Record<PushNotificationKey, boolean>);
  }, [data]);

  const allGroupKeys = useMemo(() => Object.values(nGroups).flat(), []);
  const otherKeys = useMemo(() => {
    return (Object.keys(validatedData) as PushNotificationKey[]).filter(
      (key) => !allGroupKeys.includes(key)
    );
  }, [validatedData, allGroupKeys]);

  // Only update the groups if data has changed

  if (isLoading || !data) {
    return (
      <View tw="animate-fade-in-250 h-28 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  return (
    <>
      <View tw="pb-20">

        {/* <SettingItemSeparator tw="my-4 md:my-8" /> */}

        <View tw='px-4'>

          <SettingsTitle
            title={t('settings.' + "push_notifications_title")}
            desc={t('settings.' + "push_notifications_description")}
            descTw="my-1"
          />
        </View>

        <View tw="mt-0 px-4 md:mt-0 md:px-0">

        </View>

        <ShowPermissionsNotifications />

      </View>
    </>
  );
};

export const PushNotificationTabWrapper = () => {
  const { data, isLoading } = usePushNotificationsPreferences();
  const { trigger } = useEditPushNotificationsPreferences();
  const { isAuthenticated } = useUser();
  const navigateToLogin = useNavigateToLogin();

  const { t, i18n } = useTranslation(); // Include i18n for language change detection

  // State for triggering a re-render
  const [forceUpdate, setForceUpdate] = useState(false);

  // UseEffect to re-render when the language changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [i18n.language]);

  const validatedData = useMemo(() => {
    if (!data) return {};

    return Object.keys(data).reduce((result, key) => {
      if (
        (Object.keys(notificationMapping) as PushNotificationKey[]).includes(
          key as PushNotificationKey
        )
      ) {
        result[key as PushNotificationKey] = data[key];
      }
      return result;
    }, {} as Record<PushNotificationKey, boolean>);
  }, [data]);

  const allGroupKeys = useMemo(() => Object.values(nGroups).flat(), []);
  const otherKeys = useMemo(() => {
    return (Object.keys(validatedData) as PushNotificationKey[]).filter(
      (key) => !allGroupKeys.includes(key)
    );
  }, [validatedData, allGroupKeys]);

  // Only update the groups if data has changed
  const notificationGroups = useMemo(
    () => ({ ...nGroups }),
    [otherKeys]
  );

  if (isLoading || !data) {
    return (
      <View tw="animate-fade-in-250 h-28 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  return (
    <>
      <View tw="mt-4 px-2 md:mt-4 md:px-0">
        {Object.entries(notificationGroups).map(([group, keys], index) => (
          <View key={group}>
            <View tw={index === 0 ? "mb-4 mt-2" : "my-4"}>
              <Text tw="text-lg font-bold dark:text-white">
                {t('settings.' + group)}
              </Text>
            </View>
            {keys.map((key, index) => {
              const value = data[key];
              const keyAsNotificationKey = key as PushNotificationKey;
              return (
                <View tw="flex-row items-start py-4" key={index.toString()}>
                  <Switch
                    size="small"
                    checked={value as boolean}
                    onChange={async () => {
                      if (!isAuthenticated) {
                        navigateToLogin();
                      } else {
                        trigger(
                          { pushKey: [keyAsNotificationKey], pushValue: !value },
                          {
                            optimisticData: (current: any) => ({
                              ...current,
                              [keyAsNotificationKey]: !value,
                            }),
                            revalidate: false,
                          }
                        );
                      }
                    }}
                  />
                  <View tw="ml-2 flex-1 md:ml-4">
                    <View>
                      <Text tw="text-base font-medium text-gray-900 dark:text-white">
                        {t('settings.' + keyAsNotificationKey)}
                      </Text>
                    </View>
                    <View tw="mt-2.5">
                      <Text tw="text-sm text-gray-500 dark:text-gray-300">
                        {t('settings.' + keyAsNotificationKey + '_description')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </>
  );
};
