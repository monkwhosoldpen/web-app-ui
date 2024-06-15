import { memo, useMemo, useCallback } from "react";
import { Linking } from "react-native";

import {
  Twitter,
  Instagram,
  SpotifyPure,
  AppleMusic,
  Facebook,
  File,
} from "@showtime-xyz/universal.icon";
import { View } from "@showtime-xyz/universal.view";

import { getDomainName } from "app/utilities";
import { AccountSettingItem } from "../settings/settings-account-item";
import SvgInformationCircle from "design-system/icon/InformationCircle";
import { useTranslation } from "react-i18next";

export const ProfileSocial = memo(({ profile }) => {
  const { t, i18n } = useTranslation();
  const socialLinks = useMemo(() => [
    {
      id: 'spotify',
      url: profile?.spotify_artist_id ? `https://open.spotify.com/artist/${profile.spotify_artist_id}` : null,
      label: t('profilePage.Spotify'),
      Icon: SpotifyPure, // Assuming SpotifyPure is a component
    },
    {
      id: 'appleMusic',
      url: profile?.apple_music_artist_id ? `https://music.apple.com/artist/${profile.apple_music_artist_id}` : null,
      label: t('profilePage.AppleMusic'),
      Icon: AppleMusic,
    },
    {
      id: 'twitter',
      url: profile?.twitter_username ? `https://twitter.com/${profile.twitter_username}` : null,
      label: t('profilePage.Twitter'),
      Icon: Twitter,
    },
    {
      id: 'instagram',
      url: profile?.instagram_username ? `https://instagram.com/${profile.instagram_username}` : null,
      label: t('profilePage.Instagram'),
      Icon: Instagram,
    },
    {
      id: 'wikipedia',
      url: profile?.wikipedia_url ? `${profile.wikipedia_url}` : null,
      label: t('profilePage.Wikipedia'),
      Icon: SvgInformationCircle,
    },
    {
      id: 'facebook',
      url: profile?.facebook_username ? `https://facebook.com/${profile.facebook_username}` : null,
      label: t('profilePage.Facebook'),
      Icon: Facebook,
    },
  ].filter(link => link.url !== null), [profile]);

  const onPressLink = useCallback(async (url) => {
    if (url) {
      await Linking.openURL(url);
    }
  }, []);

  if (!profile) return null;

  return (
    <View>
      <View tw="">
        {socialLinks.map(({ id, url, label, Icon }) => (
          <AccountSettingItem
            title={label}
            key={id}
            onPress={() => onPressLink(url)}
            buttonText={t('profilePage.visit')}
            Icon={Icon}
          />
        ))}
      </View>
      {profile?.website_url && (
        <AccountSettingItem
          title={'Website'}
          onPress={() => onPressLink(profile.website_url)}
          buttonText={getDomainName(profile.website_url)}
          Icon={File}
        />

      )}
    </View>
  );
});

export default ProfileSocial;


// <PressableScale onPress={() => onPressLink(profile.website_url)} aria-label="Profile website" role="link" tw="mr-2 my-1">
// <Text numberOfLines={1} tw="text-13 max-w-[100px] font-bold text-gray-900 dark:text-white">
//   {getDomainName(profile.website_url)}
// </Text>
// </PressableScale>