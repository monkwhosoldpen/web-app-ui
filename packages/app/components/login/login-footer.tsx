import { Linking } from "react-native";

import { PressableScale } from "@showtime-xyz/universal.pressable-scale";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { useTranslation } from "react-i18next";

export function LoginFooter({ tw = "" }: { tw?: string }) {
  const { i18n, t } = useTranslation();
  const selectedLanguage = i18n.language;
  return (
    <View tw={["flex-row justify-center", tw]}>
      <Text tw="text-center text-xs text-gray-600 dark:text-gray-400">
        {t("termsAndConditionsHeader")} {" "}
      </Text>
      <PressableScale
        onPress={() => {
          Linking.openURL(
            "https://www.notion.so/Terms-of-Service-5be0ab74931b4729a31923743e400296"
          );
        }}
      >
        <Text tw="text-center text-xs font-bold text-black dark:text-white">
          {t("termsAndConditionsLink")}
        </Text>
      </PressableScale>
      <Text tw="text-center text-xs text-gray-600 dark:text-gray-400">.</Text>
    </View>
  );
}
