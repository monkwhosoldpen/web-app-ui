import { Platform } from "react-native";

import { Showtime, Mail } from "@showtime-xyz/universal.icon";
import { useRouter } from "@showtime-xyz/universal.router";
import { TabScrollView } from "@showtime-xyz/universal.tab-view";
import { View } from "@showtime-xyz/universal.view";

import { useSendFeedback } from "app/hooks/use-send-feedback";

import { SettingClearAppCache } from "./clear-cache-btn";
import { SettingItemSeparator } from "./setting-item-separator";
import {
  AccountSettingItem,
  SettingDeleteAccount,
} from "./settings-account-item";
import { SettingsTitle } from "./settings-title";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

const SettingScrollComponent = Platform.OS === "web" ? View : View;

export type AdvancedTabProps = {
  index?: number;
};

export const AdvancedTab = ({ index = 0 }: AdvancedTabProps) => {
  const router = useRouter();
  const { onSendFeedback } = useSendFeedback();
  const { t, i18n } = useTranslation(); // Include i18n for language change detection

  // State for triggering a re-render
  const [forceUpdate, setForceUpdate] = useState(false);

  // UseEffect to re-render when the language changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [i18n.language]);

  return (
    <SettingScrollComponent>

      <View tw='px-4'>
        <SettingsTitle
          title={t('settings.' + "advanced_title")}
          desc={t('settings.' + "advanced_description")}
          descTw="my-1"
        />
      </View>

      <View tw="mt-6 px-4 lg:px-0">
        <AccountSettingItem
          title={t('settings.' + "privacy_security")}
          onPress={() => router.push(`/settings/privacy-and-security`)}
          buttonText={t('settings.' + "view")}
          Icon={Showtime}
        />

        <AccountSettingItem
          title={t('settings.' + "privacy_about")}
          onPress={() => router.push(`/settings/privacy-and-security`)}
          buttonText={t('settings.' + "view")}
          Icon={Showtime}
        />
        <SettingItemSeparator tw="my-4 md:my-8" />
        <SettingClearAppCache />
        <AccountSettingItem
          title={t('settings.' + "privacy_feedback")}
          onPress={onSendFeedback}
          buttonText={t('settings.' + "contact")}
          Icon={Mail}
        />

        {/* <SettingDeleteAccount /> */}
      </View>
    </SettingScrollComponent>
  );
};
