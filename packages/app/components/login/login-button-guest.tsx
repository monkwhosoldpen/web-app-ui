import React, { useMemo } from "react";

import { Button } from "@showtime-xyz/universal.button";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import {
  Apple,
  GoogleOriginal,
  Twitter,
  Facebook,
  Mail,
  Ethereum,
  ShowtimeRounded,
} from "@showtime-xyz/universal.icon";
import { PressableProps } from "@showtime-xyz/universal.pressable";
import { colors } from "@showtime-xyz/universal.tailwind";
import { View } from "@showtime-xyz/universal.view";

type LoginType =
  | "apple"
  | "google"
  | "guest"
  | "facebook"
  | "twitter"
  | "email"
  | "wallet"
  | "social";
type LoginButtonProps = PressableProps & {
  type: LoginType;
};

const BUTTON_TEXT = {
  apple: "Continue with Apple",
  google: "Continue with Google",
  guest: "Continue as Guest",
  facebook: "Continue with Facebook",
  twitter: "Continue with Twitter",
  email: "Continue with Email",
  wallet: "Connect",
  social: "Back to social login",
};

const BUTTON_ICON = {
  apple: Apple,
  google: GoogleOriginal,
  facebook: Facebook,
  twitter: Twitter,
  email: Mail,
  wallet: Ethereum,
  guest: ShowtimeRounded,
  social: () => <></>,
};

import { useTranslation } from "react-i18next";

export const LoginButtonGuest = ({ type, ...rest }: LoginButtonProps) => {
  const isDark = useIsDarkMode();

  const { i18n, t } = useTranslation();
  const selectedLanguage = i18n.language;

  const Icon = useMemo(
    () => (BUTTON_ICON[type] ? BUTTON_ICON[type] : null),
    [type]
  );

  const iconColorProps = useMemo(() => {
    switch (type) {
      default:
        return { color: isDark ? colors.black : colors.white };
    }
  }, [isDark, type]);

  const variant = useMemo(() => {
    switch (type) {
      default:
        return "primary";
    }
  }, [type]);

  const labelTW = useMemo(() => {
    switch (type) {
      default:
        return "";
    }
  }, [type]);

  const BUTTON_TEXT_KEYS = {
    apple: "button.apple",
    google: "button.google",
    guest: "button.guest",
    facebook: "button.facebook",
    twitter: "button.twitter",
    email: "button.email",
    wallet: "button.wallet",
    social: "button.social",
  };

  const buttonText = t(BUTTON_TEXT_KEYS[type]);

  return (
    <Button
      variant={variant}
      size="regular"
      tw="my-1"
      labelTW={labelTW}
      {...rest}
    >
      {Icon && (
        <View tw="absolute left-4 top-3">
          <Icon width={24} height={24} {...iconColorProps} />
        </View>
      )}
      {buttonText}
    </Button>
  );
};
