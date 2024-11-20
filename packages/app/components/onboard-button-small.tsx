import { useCallback, memo, useMemo } from "react";

import { Button } from "@showtime-xyz/universal.button";
import type { ButtonProps } from "@showtime-xyz/universal.button";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useRouter } from "@showtime-xyz/universal.router";
import { Text } from "@showtime-xyz/universal.text";

import { OnboardButton } from "./onboard-button";

type ToggleFollowParams = ButtonProps & {
  name?: string;
  username: number;
  onToggleFollow?: () => void;
  channelId?: number;
};

export const OnboardButtonSmall = memo<ToggleFollowParams>(
  function OnboardButtonSmall({ username, name, tw = "", channelId, ...rest }) {
    const router = useRouter();
    return (
      <OnboardButton
        username={username}
        name={name}
        renderButton={({ text, isFollowing, ...rest }) => {
          return (
            <Pressable
              tw={[
                "h-[22px] items-center justify-center rounded-full border border-gray-300 px-3.5 dark:border-gray-600",
                tw,
              ]}
              {...rest}
            >
              <Text tw="text-xs font-bold text-gray-900 dark:text-white">
                {text} Custom
              </Text>
            </Pressable>
          );
        }}
        {...rest}
      />
    );
  }
);

OnboardButton.displayName = "OnboardButton";
