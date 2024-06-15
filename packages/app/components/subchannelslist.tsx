
import { View } from "@showtime-xyz/universal.view";
import { Text } from "@showtime-xyz/universal.text";
import { TopCreatorTokenItemOnProfile } from "./creator-token/creator-token-users";
import { useTranslation } from "react-i18next";

export const SubChannels = ({
  profileId,
  data,
  username,
  name,
  ...rest
}: {
  profileId: number | undefined;
  username: string | undefined;
  name: string | undefined;
} & any) => {
  if ((!data?.length || data?.length === 0)) {
    return null;
  }
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  return (
    <View {...rest}>
      <View tw="flex-row items-center justify-between py-2">
        <Text tw="text-13 font-semibold text-gray-900 dark:text-gray-50">
          {t('profilePage.subchannels')}
        </Text>
      </View>
      <View tw="mb-2 mt-2 rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <View tw="flex-row flex-wrap items-center gap-x-0 gap-y-2">
          {data?.map((item, i) => {
            return (
              <TopCreatorTokenItemOnProfile
                item={item}
                index={i}
                key={i}
                style={{ width: "100%" }}
                showName
              />
            );
          })}
        </View>
      </View>
    </View >
  );
};
