import React from "react";
import { useWindowDimensions } from "react-native";

import { Button } from "@showtime-xyz/universal.button";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { useUser } from "app/hooks/use-user";
import { useNavigateToLogin } from "app/navigation/use-navigate-to";

import { breakpoints } from "design-system/theme";
import { useTranslation } from "react-i18next";

type EmptyPlaceholderProps = {
  title?: string | JSX.Element;
  text?: string | JSX.Element;
  hideLoginBtn?: boolean;
  titleTw?: string;
  tw?: string;
};

const NotAuthenticatedPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  title = "",
  text = "",
  tw = "",
  titleTw = "",
  hideLoginBtn = false,
}) => {
  const { isAuthenticated } = useUser();
  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];
  const navigateToLogin = useNavigateToLogin();

  const { i18n, t } = useTranslation();

  return (
    <View tw={["items-center justify-center pt-4", tw]}>
      {!isAuthenticated && (
        <>
          <Text
            tw={`text-lg font-extrabold leading-6 text-gray-900 dark:text-gray-100 ${titleTw}`}
          >
            {title}
          </Text>
          {Boolean(text) && (
            <>
              <View tw="h-4" />
              <Text tw="text-sm text-gray-600 dark:text-gray-400">{text}</Text>
              <View tw="h-1" />
            </>
          )}
          <View tw="h-4" />
          <Button
            onPress={() => {
              navigateToLogin();
            }}
            variant="primary"
            size={isMdWidth ? "regular" : "small"}
            labelTW="font-semibold"
          >
            {t("emptyplaceholdersignin")}
          </Button>
        </>
      )}
      {isAuthenticated && (
        <>
          {/* <Text
            tw={`text-lg font-extrabold leading-6 text-gray-900 dark:text-gray-100 ${titleTw}`}
          >
            {title}
          </Text>
          {Boolean(text) && (
            <>
              <View tw="h-4" />
              <Text tw="text-sm text-gray-600 dark:text-gray-400">{text}</Text>
              <View tw="h-1" />
            </>
          )} */}
        </>
      )}
    </View>
  );
};

export { NotAuthenticatedPlaceholder };
