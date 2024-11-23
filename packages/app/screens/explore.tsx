import { Suspense } from "react";

import { Spinner } from "@showtime-xyz/universal.spinner";
import { View } from "@showtime-xyz/universal.view";

import { ErrorBoundary } from "app/components/error-boundary";
import { withColorScheme } from "app/components/memo-with-theme";
import { useTrackPageViewed } from "app/lib/analytics";
import { Text } from "@showtime-xyz/universal.text";

import { createParam } from "app/navigation/use-param";

type Query = {
  view: string;
  username: string;
};

const { useParam } = createParam<Query>();

const ExploreScreen = withColorScheme(() => {
  useTrackPageViewed({ name: "ExploreScreen" });
  const [viewValue] = useParam("view");
  const [username] = useParam("username");
  const cleanedViewValue = viewValue || ''; // Default value 'NA' if viewValue is falsy
  const cleanedUsername =
    username && username !== "" ? username?.replace(/@/g, "") : null;
  return (
    <>
      <ErrorBoundary>
        <Profile
          viewValue={cleanedViewValue}
          username={cleanedUsername || ''}
        // type={cleanedViewValue}
        />
      </ErrorBoundary>
    </>
  );
});

export { ExploreScreen };


import {
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";

import { useRouter } from "@showtime-xyz/universal.router";

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
import { formatProfileRoutes } from "app/utilities";
import { ProfileTop } from "app/components/profile/profile-top";
import { ProfileTabBar } from "app/components/profile/profile-tab-bar";
import { TokensTabHeader } from "app/components/profile/tokens-tab";
import { CreatorTokensPanel } from "app/components/profile/creator-tokens-panel";
import ProfileSocial from "app/components/profile/profile-social";
import type { ParsedUrlQuery } from "querystring";
import { SubChannels } from "app/components/subchannelslist";
import { useTranslation } from "react-i18next";
import { ChannelsPromote } from "app/components/creator-channels";
import { ShareDetailed } from "app/components/creator-channels/share-detailed";

export type ProfileScreenProps = {
  username: string;
  viewValue: any;
};

const Profile = ({ username, viewValue }: ProfileScreenProps) => {
  const {
    data: profileData,
    isError,
    isLoading: profileIsLoading,
    error,
  } = useUserProfile({ address: username });

  const subGroupsGoat: any = profileData?.data?.subGroups || [];
  const is_premium: any = profileData?.data?.profile?.is_premium || false;
  const profileId = profileData?.data?.profile.profile_id;

  const { getIsBlocked } = useBlock();
  const router = useRouter();
  const userId = useCurrentUserId();
  const isSelf = userId === profileId;
  const isBlocked = getIsBlocked(profileId);

  const contentWidth = useContentWidth();
  const isProfileMdScreen = contentWidth > DESKTOP_PROFILE_WIDTH - 10;

  const is_service: any = profileData?.data?.profile?.is_secondary_stream || false;

  // Mock asynchronous function to simulate fetching Markdown
  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;
  const [sampleMarkdown, setSampleMarkdown] = useState<any>('');

  useEffect(() => {
    if (profileData) {
      const sampleMarkdownObj = profileData?.data?.readMarkdown || {};
      const markdown = sampleMarkdownObj[selectedLanguage] || sampleMarkdownObj?.default;
      setSampleMarkdown(markdown);
    }
  }, [selectedLanguage, profileData?.data?.readMarkdown]);

  const { data } = {
    data: {
      default_tab_type: "home",
      tabs: is_service ? [] : [
        {
          type: "home",
          name: t('explorePage.home'), // Translate 'All' using the t() function
          displayed_count: 0,
        },
        {
          type: "channels",
          name: t('explorePage.channels'), // Translate 'All' using the t() function
          displayed_count: 0,
        },
        {
          type: "read",
          name: t('explorePage.read'), // Translate 'All' using the t() function
          displayed_count: 0,
        },
      ]
    }
  };

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

  useEffect(() => {
    if (viewValue) {
      setType(viewValue);
    }
    else {
      console.log("Not found");
    }
  }, [viewValue]);

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
        <ProfileTabsNFTProvider tabType={isSelf ? type : type}>
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

              <View tw="h-screen w-full px-0">
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
                        isPremiumGoat={is_premium}
                        messageCount={10}
                        isService={is_service}
                        channelPermissions={null}
                      />
                      {
                        (!is_service) && <>

                          <View tw='px-4'>
                            <View tw="flex-row items-center justify-between py-2">
                              <Text tw="text-13 font-semibold text-gray-900 dark:text-gray-50">
                                {t('profilePage.socialProfiles')}
                              </Text>
                            </View>
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

                  {
                    (!is_service) && <View >
                      {type === "channels" ? (
                        <>
                          <View tw="">
                            <View tw="px-4 py-2 mb-20">
                              <SubChannels data={subGroupsGoat} />
                            </View>
                          </View>
                        </>
                      ) : null}

                      {
                        type == 'read' && <>

                          <View tw="mb-2 mt-4 mb-20 mx-4 rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                            <View tw="items-center gap-2">
                              <>
                                <div tw='' dangerouslySetInnerHTML={{ __html: sampleMarkdown }} />
                              </>
                            </View>
                          </View>
                        </>
                      }
                    </View>
                  }

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
