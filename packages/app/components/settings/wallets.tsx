import { Platform, useWindowDimensions } from "react-native";

import { TabScrollView } from "@showtime-xyz/universal.tab-view";
import { View } from "@showtime-xyz/universal.view";

import { useUser } from "app/hooks/use-user";

import { breakpoints } from "design-system/theme";

import { SettingsTitle } from "./settings-title";
import EditProfile from "app/components/edit-profile";
import { useAuth } from "app/hooks/auth/use-auth";
import { NotAuthenticatedPlaceholder } from "app/components/not-authenticated-placeholder";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export type WalletsTabProps = {
  index?: number;
};
const SettingScrollComponent = Platform.OS === "web" ? View : View;

export const WalletsTab = ({
  index = 0,
}: WalletsTabProps) => {

  const { logout } = useAuth();
  const { user: currentUser, isAuthenticated } = useUser();
  const { i18n, t } = useTranslation();

  return (
    <>
      <SettingScrollComponent>
        <View tw='px-4 mb-2'>
          <SettingsTitle
            title={t('settings.' + "profile_title")}
            desc={t('settings.' + "profile_description")}
            descTw="my-1"
            buttonText={isAuthenticated ? t('settings.' + "profile_sign_out") : ''}
            onPress={logout}
          />
        </View>
        {/* {isAuthenticated && <EditProfile />} */}
        {
          !isAuthenticated &&
          <NotAuthenticatedPlaceholder title={t('settings.not_authenticated')} tw="h-[50vh] px-4" />
        }
      </SettingScrollComponent>
    </>
  );
};
