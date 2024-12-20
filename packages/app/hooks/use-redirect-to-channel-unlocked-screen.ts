import { useCallback } from "react";
import { Platform } from "react-native";

import { useRouter } from "@showtime-xyz/universal.router";

export const useRedirectToChannelUnlocked = () => {
  const router = useRouter();
  const redirectToChannelUnlocked = useCallback(
    async (contractAddress?: string) => {
      const as = `/groups/${contractAddress}/unlocked`;
      router.push(
        Platform.select({
          native: as,
          web: {
            pathname: router.pathname,
            query: {
              ...router.query,
              contractAddress,
              unlockedChannelModal: true,
            },
          } as any,
        }),
        Platform.select({ native: as, web: router.asPath }),
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  return redirectToChannelUnlocked;
};
