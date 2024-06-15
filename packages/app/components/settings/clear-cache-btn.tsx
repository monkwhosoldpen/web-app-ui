import { useCallback } from "react";
import { Zap } from "@showtime-xyz/universal.icon";
import { deleteAppCache } from "app/lib/delete-cache";
import { toast } from "design-system/toast";
import { AccountSettingItem } from "./settings-account-item";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export const SettingClearAppCache = () => {
  const clearAppCache = useCallback(() => {
    deleteAppCache();
    toast.success("Cleared!");
  }, []);
  const { t, i18n } = useTranslation(); // Include i18n for language change detection

  // State for triggering a re-render
  const [forceUpdate, setForceUpdate] = useState(false);

  // UseEffect to re-render when the language changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [i18n.language]);

  return (
    <AccountSettingItem
      title={t('settings.' + "privacy_clear_app_cache")}
      onPress={clearAppCache}
      buttonText={t('settings.' + "clear_up")}
      Icon={Zap}
    />
  );
};
