import { useState, useEffect } from "react";
import { Platform } from "react-native";

import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { useTabState } from "app/hooks/use-tab-state";

import { TabBarVertical } from "design-system/tab-view";
import { WalletsTab } from "./wallets";
import { PushNotificationTab } from "./push-notifications";
import { AdvancedTab } from "./advanced";
import { useTranslation } from "react-i18next";

//const LEFT_SLIDE_WIDTH = 264;
export const SettingsMd = () => {

  const { t, i18n } = useTranslation();

  const SETTINGS_ROUTE: any = [
    // {
    //   title: t('settingsPage.Profile'),
    //   key: "profile",
    //   index: 0,
    // },
    {
      title: t('settingsPage.Notifications'),
      key: "notifications",
      index: 0,
    },
    {
      title: t('settingsPage.Advanced'),
      key: "advanced",
      index: 1,
    },
  ];

  const { index, setIndex, routes } = useTabState(SETTINGS_ROUTE);

  useEffect(() => {
    if (Platform.OS === "web") {
      window.scrollTo(0, 0);
    }
  }, [index]);

  return (
    <View tw="h-screen w-full flex-1 bg-white dark:bg-black">
      <View tw="h-screen w-full flex-row">
        <View tw="w-72 border-l border-r border-gray-200 dark:border-gray-800">
          <View tw="bg-white pt-8 dark:bg-black">
            <Text tw="px-4 text-xl font-bold text-gray-900 dark:text-white md:px-8">
              {t('settingsPage.Title')}
            </Text>
            <TabBarVertical
              onPress={(i) => {
                setIndex(i);
              }}
              routes={routes}
              index={index}
              tw="px-2"
            />
          </View>
        </View>

        <View tw="w-full flex-1 overflow-hidden overflow-y-auto rounded-2xl bg-white px-6 pb-2 pt-5 dark:bg-black">
          <View>
            <View tw="">
              <View tw="pl-0">

                {/* {index === 0 ? (
                  <>
                    <WalletsTab index={0} />
                  </>
                ) : null} */}

                {index === 0 ? (
                  <>
                    <PushNotificationTab index={1} />
                  </>
                ) : null}

                {index === 1 ? (
                  <>
                    <AdvancedTab index={2} />
                  </>
                ) : null}

              </View>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
};
