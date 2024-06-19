import { memo, useCallback } from "react";
import { Linking } from "react-native";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  Twitter,
} from "@showtime-xyz/universal.icon";
import { PressableScale } from "@showtime-xyz/universal.pressable-scale";
import { colors } from "@showtime-xyz/universal.tailwind";
import { View } from "@showtime-xyz/universal.view";


export const ProfileSocialTop = memo(({ profile }: any) => {
  const isDark = useIsDarkMode();
  const twitter = profile?.twitter_username;
  const onPressLink = useCallback(async (link: string) => {
    return Linking.openURL(link);
  }, []);
  if (!profile) return null;
  return (
    <View>
      <View tw="flex-row items-center">
        <View tw="flex-row items-center">

          {twitter && (
            <PressableScale
              onPress={() => onPressLink(`https://twitter.com/${twitter}`)}
              aria-label="Twitter"
              role="link"
              tw="mr-1"
            >
              <Twitter
                width={22}
                height={22}
                color={isDark ? "#FFF" : colors.gray[900]}
              />
            </PressableScale>
          )}

        </View>
      </View>
    </View>
  );
});

export default ProfileSocialTop;