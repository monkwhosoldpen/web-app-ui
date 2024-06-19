import { useRef } from "react";
import { Platform } from "react-native";

import { View } from "@showtime-xyz/universal.view";

import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { TopPartCreatorTokens } from "./top-part-creator-tokens";

export const EntitiesList = () => {
  const bottomBarHeight = usePlatformBottomHeight();

  return (
    <View
      tw="w-full flex-1 flex-row justify-center bg-white dark:bg-black"
      style={{
        marginBottom: Platform.select({
          native: bottomBarHeight,
        }),
      }}
    >
      <View tw="md:max-w-screen-content w-full">
        <TopPartCreatorTokens />
      </View>
    </View>
  );
};
