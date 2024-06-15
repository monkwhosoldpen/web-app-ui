import {
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";

import type { ParsedUrlQuery } from "querystring";

import { useRouter } from "@showtime-xyz/universal.router";
import { View } from "@showtime-xyz/universal.view";

import { TopPartCreatorTokens } from "app/components/home/top-part-creator-tokens";
import { DESKTOP_PROFILE_WIDTH } from "app/constants/layout";
import { ProfileTabsNFTProvider } from "app/context/profile-tabs-nft-context";
import {
  useUserProfile,
} from "app/hooks/api-hooks";
import { useBlock } from "app/hooks/use-block";
import { useContentWidth } from "app/hooks/use-content-width";
import { useCurrentUserId } from "app/hooks/use-current-user-id";
import { Sticky } from "app/lib/stickynode";
import { createParam } from "app/navigation/use-param";
import {
  formatProfileRoutes,
} from "app/utilities";


import { CreatorTokensPanel } from "./creator-tokens-panel";
import { ProfileTabBar } from "./profile-tab-bar";
import { ProfileTop } from "./profile-top";
import {
  TokensTabHeader,
} from "./tokens-tab";
import ProfileSocial from "./profile-social";
import { useTranslation } from "react-i18next";
import { Text } from "@showtime-xyz/universal.text";
import { ShareDetailed } from "../creator-channels/share-detailed";

export type ProfileScreenProps = {
  username: string;
};

const ProfileScreen = ({ username }: ProfileScreenProps) => {
  return <Profile username={username} />;
};

const { useParam } = createParam();

const Profile = ({ username }: ProfileScreenProps) => {
  const {
    data: profileData,
    isError,
    isLoading: profileIsLoading,
    error,
  } = useUserProfile({ address: username });

  const is_premium: any = profileData?.data?.profile?.is_premium || false;
  const is_service: any = profileData?.data?.profile?.is_secondary_stream || false;
  const profileId = profileData?.data?.profile.profile_id;

  const { getIsBlocked } = useBlock();
  const router = useRouter();
  const userId = useCurrentUserId();
  const isSelf = userId === profileId;
  const isBlocked = getIsBlocked(profileId);
  const { t } = useTranslation(); // Initialize the translation function

  const { data } = {
    data: {
      default_tab_type: "home",
      tabs: is_premium && !is_service ? [
        {
          type: "home",
          name: t('profilePage.home'), // Translate 'All' using the t() function
          displayed_count: 0,
        },
        {
          type: "channels",
          name: t('profilePage.channels'), // Translate 'All' using the t() function
          displayed_count: 0,
        },
        {
          type: "read",
          name: t('profilePage.read'), // Translate 'All' using the t() function
          displayed_count: 0,
        },
      ] :
        [
          {
            type: "home",
            name: t('profilePage.home'), // Translate 'All' using the t() function
            displayed_count: 0,
          },
        ]
    }
  }

  const contentWidth = useContentWidth();
  const isProfileMdScreen = contentWidth > DESKTOP_PROFILE_WIDTH - 10;

  const routes = useMemo(() => formatProfileRoutes(data?.tabs), [data?.tabs]);

  const [queryTab] = useParam("type", {
    initial: data?.default_tab_type,
  });
  const [type, setType] = useState(queryTab);
  const index = useMemo(
    () => routes.findIndex((item) => item.key === type),
    [routes, type]
  );

  useEffect(() => {
    if (!data?.default_tab_type || type) return;
    setType(data?.default_tab_type);
  }, [data?.default_tab_type, type]);

  const onChangeTabBar = useCallback(
    (index: number) => {
      const currentType = routes[index].key;
      const newQuery = {
        ...router.query,
        type: currentType,
      } as ParsedUrlQuery;
      const { username = null, ...restQuery } = newQuery;
      router.replace(
        username ? `/@${username}/${currentType}` : ""
      );
      setType(currentType);
    },
    [router, routes, setType]
  );

  return (
    <View tw="w-full items-center  bg-white dark:bg-black">
      <View
        tw="min-h-screen w-full"
      // style={{ maxWidth: DESKTOP_PROFILE_WIDTH }}
      >
        <ProfileTabsNFTProvider tabType={isSelf ? type : undefined}>
          <View tw="w-full flex-row">

            <View tw="flex-1">

              <ProfileTop
                address={username}
                isBlocked={isBlocked}
                profileData={profileData?.data}
                isLoading={profileIsLoading}
                isError={isError}
                isSelf={isSelf}
              />

              <View tw="h-screen w-full ">
                <>
                  <ProfileTabBar
                    onPress={onChangeTabBar}
                    routes={routes}
                    index={index}
                  />

                  {type === "home" ? (
                    <>
                      <TokensTabHeader
                        channelId={username}
                        isSelf={isSelf}
                        isPremium={is_premium}
                        messageCount={10}
                        isService={is_service}
                        channelPermissions={null}
                      />
                      {
                        (!is_service) && <>
                          <View tw="flex-row items-center justify-between mx-4 py-2">
                            <Text tw="text-13 font-semibold text-gray-900 dark:text-gray-50">
                              {t('profilePage.socialProfiles')}
                            </Text>
                          </View>
                          <View tw='px-4'>
                            <View tw="mb-2 mt-1 rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                              <View tw="gap-2">
                                <ProfileSocial profile={profileData?.data?.profile} />
                              </View>
                            </View>
                          </View>
                        </>
                      }
                      {
                        (is_service) && <>
                          <ShareDetailed />
                        </>
                      }

                    </>
                  ) : null}

                </>

              </View>

            </View>

            {isProfileMdScreen ? (
              <View
                style={{
                  width: 335,
                }}
                tw="animate-fade-in-250 ml-10"
              >
                <Sticky enabled>
                  <CreatorTokensPanel username={username} isSelf={true} />
                  <TopPartCreatorTokens />
                </Sticky>
              </View>
            ) : null}

          </View>
        </ProfileTabsNFTProvider>
      </View>
      <>

      </>
    </View>
  );
};

export { ProfileScreen as Profile };
