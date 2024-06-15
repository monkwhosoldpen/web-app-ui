import { Suspense, useMemo, useCallback, ReactNode } from "react";
import {
  Platform,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

import { ResizeMode } from "expo-av";
import { Link, LinkProps } from "solito/link";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Pressable, PressableProps } from "@showtime-xyz/universal.pressable";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { Creator } from "app/components/card/rows/elements/creator";
import { ClaimButton } from "app/components/claim/claim-button";
import { ClaimedShareButton } from "app/components/claim/claimed-share-button";
import { ErrorBoundary } from "app/components/error-boundary";
import { ClaimedByReduced } from "app/components/feed-item/claimed-by";
import { ListMedia } from "app/components/media";
import { withMemoAndColorScheme } from "app/components/memo-with-theme";
import { NFTDropdown } from "app/components/nft-dropdown";
import { useCreatorCollectionDetail } from "app/hooks/use-creator-collection-detail";
import { useNFTDetailByTokenId } from "app/hooks/use-nft-detail-by-token-id";
import { linkifyDescription } from "app/lib/linkify";
import { NFT } from "app/types";
import { cleanUserTextInput, limitLineBreaks, removeTags } from "app/utilities";
import { useFollow } from "app/hooks/use-follow";
import { breakpoints } from "design-system/theme";

// import { ContentTypeTooltip } from "../content-type-tooltip";
import { NSFWGate } from "../feed-item/nsfw-gate";
import { ContentTypeTooltip } from "../tooltips";
import { FollowButtonSmall } from "../follow-button-small";

const isWeb = Platform.OS === "web";

const RouteComponent = ({
  children,
  onPress,
  ...rest
}: (LinkProps | PressableProps) & {
  onPress: () => void;
  children: ReactNode;
}) => {
  if (isWeb) {
    return <Link {...(rest as LinkProps)}>{children}</Link>;
  }
  return (
    <Pressable onPress={onPress} {...(rest as PressableProps)}>
      {children}
    </Pressable>
  );
};

const RouteComponentNative = ({
  children,
  onPress,
  ...rest
}: (LinkProps | PressableProps) & {
  onPress: () => void;
  children: ReactNode;
}) => {
  if (isWeb) {
    return <View tw="flex-1">{children}</View>;
  }
  return (
    <Pressable onPress={onPress} {...(rest as PressableProps)}>
      {children}
    </Pressable>
  );
};

type Props = {
  nft: NFT & { loading?: boolean };
  numColumns?: number;
  onPress?: () => void;
  tw?: string;
  variant?: "nft" | "activity" | "market";
  as?: string;
  href?: string;
  showClaimButton?: Boolean;
  sizeStyle?: { width: number; height: number };
  style?: StyleProp<ViewStyle>;
  index: number;
};

function ListCard(props: Props) {
  const { width } = useWindowDimensions();
  const isLgWidth = width >= breakpoints["md"];

  return <ListCardSmallScreen {...props} />;
}

const ListCardSmallScreen = ({
  nft,
  tw = "",
  sizeStyle,
  href = "",
  onPress,
  as,
  index,
}: Props) => {
  const isDark = useIsDarkMode();

  const handleOnPress = useCallback(() => {
    if (isWeb) return null;
    onPress?.();
  }, [onPress]);

  const { data: edition } = useCreatorCollectionDetail(
    nft.creator_airdrop_edition_address
  );
  const { data: detailData } = useNFTDetailByTokenId({
    contractAddress: nft?.contract_address,
    tokenId: nft?.token_id,
    chainName: nft?.chain_name,
  });

  const description = useMemo(
    () =>
      nft?.token_description
        ? linkifyDescription(
          limitLineBreaks(
            cleanUserTextInput(removeTags(nft?.token_description))
          )
        )
        : "",
    [nft?.token_description]
  );

  const { onToggleFollow } = useFollow({
    username: nft.username,
  });

  return (
    <RouteComponentNative href={href} as={as} onPress={handleOnPress}>
      <View
        // @ts-expect-error TODO: add accessibility types for RNW
        dataset={Platform.select({ web: { testId: "nft-card-list" } })}
        style={[sizeStyle]}
        tw={[
          "",
          nft?.loading ? "opacity-50" : "opacity-100",
          "flex-1 overflow-hidden rounded-2xl",
          "bg-gray-50 dark:bg-gray-900 md:dark:bg-black",
          tw,
        ]}
      >
        <View tw="flex-row pb-2 pt-2">

          <View tw="relative ml-2">
            <RouteComponent
              viewProps={{
                style: {
                  width: "100%",
                  height: "100%",
                },
              }}
              as={as}
              href={href}
              onPress={handleOnPress}
            >
              <View tw="h-24 w-24 items-center justify-center bg-gray-300 dark:bg-gray-700 sm:h-36 sm:w-36 rounded-2xl">
                <ListMedia
                  item={nft}
                  resizeMode={ResizeMode.COVER}
                  loading={index > 0 ? "lazy" : "eager"}
                />
                <NSFWGate
                  show={nft.nsfw}
                  nftId={nft.nft_id}
                  variant="thumbnail"
                />
              </View>
            </RouteComponent>
          </View>

          <View tw="flex-1 justify-between px-2">
            <View tw="px-2">
              <View tw="py-2">
                <RouteComponent as={as} href={href} onPress={handleOnPress}>
                  <Text
                    tw="overflow-ellipsis whitespace-nowrap text-base font-bold text-black dark:text-white"
                    numberOfLines={1}
                  >
                    {nft.token_name}
                  </Text>
                </RouteComponent>

                {description ? (
                  <View tw="mt-3">
                    <Text
                      tw="text-xs text-gray-600 dark:text-gray-400"
                      numberOfLines={2}
                    >
                      {description}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            <View tw="h-6 justify-between px-2">
              <FollowButtonSmall
                size={"small"}
                name={nft.token_name}
                profileId={nft.profile_id}
                onToggleFollow={onToggleFollow}
              />
            </View>
          </View>
        </View>

      </View>
    </RouteComponentNative>
  );
};

const MemoizedListCard = withMemoAndColorScheme<typeof ListCard, Props>(
  ListCard
);

export { MemoizedListCard as TrendingListCard };
