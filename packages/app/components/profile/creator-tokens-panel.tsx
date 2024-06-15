import { Platform } from "react-native";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { InformationCircle, LockRounded } from "@showtime-xyz/universal.icon";
import { PressableScale } from "@showtime-xyz/universal.pressable-scale";
import { useRouter } from "@showtime-xyz/universal.router";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { useUserProfile } from "app/hooks/api-hooks";

import { getCurrencyPrice } from "app/utilities";

import { TextTooltip } from "../tooltips/text-tooltip";
import { PlatformBuyButton, PlatformSellButton } from "./buy-and-sell-buttons";

type CreatorTokensPanelProps = { isSelf?: boolean; username?: string };

const DataPanel = ({ username }: CreatorTokensPanelProps) => {
  const isDark = useIsDarkMode();
  const router = useRouter();
  const { data: userProfileData } = useUserProfile({ address: username });

  const totalCollectors = 100;
  const priceToBuyNext = 200;
  const wallet: any = null;
  const balanceOfToken = 300;
  const priceToSellNext = 400;

  // only show the panel card if the profile is onboarded
  if (
    userProfileData?.data?.profile?.creator_token_onboarding_status !==
    "onboarded"
  )
    return null;

  return (
    <View tw="rounded-4xl mb-2 mt-4 overflow-hidden border border-gray-200 dark:border-gray-700">
      <View tw="px-8 py-4">
        <View tw="flex-row items-center justify-between gap-4">
          <View tw="flex-1">
            <View tw="items-center">
              <Text tw="text-xs text-gray-500 dark:text-gray-400">TOKEN</Text>
              <View tw="mt-3 h-4 items-center justify-center">
                {priceToBuyNext?.isLoading ? (
                  <Skeleton width={30} height={16} />
                ) : (
                  <Text tw="text-base font-bold text-gray-900 dark:text-white">
                    {getCurrencyPrice("USD", priceToBuyNext.data?.displayPrice)}
                  </Text>
                )}
              </View>
            </View>
            <PlatformBuyButton username={username} />
          </View>
          <View tw="flex-1">
            <View tw="items-center">
              <Text tw="text-xs text-gray-500 dark:text-gray-400">
                COLLECTED
              </Text>
              <View tw="mt-3 h-4 items-center justify-center">
                {totalCollectors?.isLoading ? (
                  <Skeleton width={30} height={16} />
                ) : (
                  <Text tw="text-base font-bold text-gray-900 dark:text-white">
                    {totalCollectors.data?.toString() || "0"}
                  </Text>
                )}
              </View>
            </View>
            <PlatformSellButton username={username} />
          </View>
          <PressableScale
            tw="web:top-14 absolute -right-6 top-2 h-4 w-4"
            onPress={() => {
              router.push(
                Platform.select({
                  native: "/creator-token/explanation",
                  web: {
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      creatorTokensExplanationModal: true,
                    },
                  } as any,
                }),
                Platform.select({
                  native: "/creator-token/explanation",
                  web:
                    router.asPath === "/"
                      ? "/creator-token/explanation"
                      : router.asPath,
                }),
                { shallow: true }
              );
            }}
            hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
          >
            <InformationCircle
              width={16}
              height={16}
              color={colors.gray[500]}
            />
          </PressableScale>
        </View>
        <View tw="mt-4 flex-row items-center self-center">
          <LockRounded
            width={12}
            height={12}
            color={isDark ? colors.gray[400] : colors.gray[500]}
          />
          <Text tw="text-13 web:text-[11px] ml-1 font-medium text-gray-500 dark:text-gray-400">
            Collect at least 1 token to unlock their channel.
          </Text>
        </View>
      </View>
      <View tw="flex-row items-center justify-between bg-blue-50 py-4 dark:bg-gray-800">
        <View tw="flex-1 items-center gap-2 pl-6">
          <Text tw="text-xs text-gray-500 dark:text-gray-400">YOU OWN</Text>
          <Text tw="text-base font-bold text-gray-900 dark:text-white">
            {balanceOfToken.data?.toString() || 0}
          </Text>
        </View>
        <View tw="flex-1 items-center gap-2 pr-6">
          <Text tw="text-xs text-gray-500  dark:text-gray-400">VALUE</Text>
          <Text tw="text-base font-bold text-gray-900 dark:text-white">
            {getCurrencyPrice("USD", priceToSellNext.data?.displayPrice)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const CreatorTokensPanel = ({
  isSelf,
  username,
}: CreatorTokensPanelProps) => {
  const isDark = useIsDarkMode();

  if (true) {
    return (
      <View tw=''>
        <DataPanel username={'username'} />
      </View>
    );
  }
};
