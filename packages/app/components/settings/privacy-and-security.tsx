import { Linking, Platform } from "react-native";

import { ScrollView } from "@showtime-xyz/universal.scroll-view";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { useHeaderHeight } from "app/lib/react-navigation/elements";

import { AccountSettingItem } from "./settings-account-item";
import { useRouter } from "@showtime-xyz/universal.router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export const PrivacyAndSecuritySettings = () => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  const { t, i18n } = useTranslation(); // Include i18n for language change detection

  // State for triggering a re-render
  const [forceUpdate, setForceUpdate] = useState(false);

  // UseEffect to re-render when the language changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [i18n.language]);

  return (
    <ScrollView tw="w-full bg-white dark:bg-black md:bg-transparent">
      {Platform.OS !== "android" && <View style={{ height: headerHeight }} />}
      <View tw="mx-auto mt-4 w-full max-w-screen-lg px-4 md:mt-8">
        <Text tw="text-2xl font-extrabold text-gray-900 dark:text-white">
          {t('settings.' + "privacy_security")}
        </Text>
        <View tw="h-8" />
        <View tw="rounded-2xl bg-white px-0 dark:bg-black md:px-4">
          {/* <AccountSettingItem
            title="Blocked Accounts"
            buttonText={t('settings.' + "view")}
            onPress={() => {
              Alert.alert("🚧 Coming soon");
            }}
          /> */}
          <AccountSettingItem
            title={t('settings.' + "code_of_conduct")}
            buttonText={t('settings.' + "view")}
            onPress={() => {
              Linking.openURL(
                "https://www.notion.so/Code-of-Conduct-f5827872ed774afb99505c8eb23ea0e4"
              );
            }}
          />
          <AccountSettingItem
            title={t('settings.' + "privacy_policy")}
            buttonText={t('settings.' + "view")}
            onPress={() => {
              Linking.openURL(
                "https://www.notion.so/Privacy-Policy-87b2a33c866b4631ab052f02fbeb0d1f"
              );
            }}
          />
          <AccountSettingItem
            title={t('settings.' + "terms_of_service")}
            buttonText={t('settings.' + "view")}
            onPress={() => {
              Linking.openURL(
                "https://www.notion.so/Terms-of-Service-5be0ab74931b4729a31923743e400296"
              );
            }}
          />
          <AccountSettingItem
            title={t('settings.' + "about")}
            buttonText={t('settings.' + "view")}
            onPress={() => {
              Linking.openURL(
                "https://notch-bun-6cc.notion.site/Product-Launch-Brief-e8b8cb778cb94ed7b1fbe6cc3acf39a7?pvs=4"
              );
              // router.push(`/@${user?.username ?? userAddress}`);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
