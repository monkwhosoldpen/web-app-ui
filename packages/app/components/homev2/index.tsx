import { useCallback, useEffect, useState } from "react";


import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { EmptyPlaceholder } from "../empty-placeholder";
import { LandingHeader } from "../home/header";
import { useTopCreatorToken } from "app/hooks/creator-token/use-creator-tokens";
import { TopCreatorTokenListItem, TopCreatorTokenListItemSkeleton } from "../creator-token/creator-token-users";

import { useScrollbarSize } from "app/hooks/use-scrollbar-size";
import { breakpoints } from "design-system/theme";
import { useContentWidth } from "app/hooks/use-content-width";
import { useTranslation } from "react-i18next";
import { DESKTOP_PROFILE_WIDTH } from "app/constants/layout";
import { createParam } from "app/navigation/use-param";
import { useRouter } from "@showtime-xyz/universal.router";
import { Sticky } from "app/lib/stickynode";
import { CreatorTokensPanel } from "../profile/creator-tokens-panel";
import { MyCollection } from "../profile/my-collection";
import { TopPartCreatorTokens } from "../home/top-part-creator-tokens";

export const HomeV2 = () => {

  const { data: fullData, isLoading } = useTopCreatorToken(100);
  const data = fullData?.creator_tokens ? fullData?.creator_tokens : [];

  const { width } = useScrollbarSize();
  const contentWidth = useContentWidth();
  const isMdWidth = contentWidth + width > breakpoints["md"];
  const isProfileMdScreen = contentWidth > DESKTOP_PROFILE_WIDTH - 10;

  const availableStates = [
    { locale: 'ALL', name: 'All' },
    { locale: 'MH', name: 'Maharashtra' },
    { locale: 'GJ', name: 'Gujarat' },
    { locale: 'TG', name: 'Telangana' },
    { locale: 'AP', name: 'Andhra Pradesh' },
    { locale: 'TN', name: 'Tamil Nadu' },
    { locale: 'KL', name: 'Kerala' },
    { locale: 'KA', name: 'Karnataka' },
    { locale: 'UP', name: 'Uttar Pradesh' },
    { locale: 'DL', name: 'Delhi' },
    { locale: 'WB', name: 'West Bengal' },
  ];

  const { t } = useTranslation();

  const ListEmptyComponent = useCallback(() => {
    return (
      <EmptyPlaceholder
        title={t('Home.EmptyProfiles')}
        tw="h-[50vh]"
      />
    )
  }, []);

  return (
    <>
      <View tw="w-full items-center border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:border-l">
        <View
          tw="min-h-screen w-full">
          <View tw="px-0 md:pl-2 md:pr-4 lg:px-0">
            <View tw="w-full flex-row">
              <View tw="flex-1">

                <LandingHeader />

                <View tw='px-4 mb-2'>
                  <View tw="flex-row items-center justify-between">
                    <View tw="flex-row items-center mt-2">
                      <FilterDropDown availableLanguages={availableStates} unselected={'All'} />
                    </View>

                    <View tw="flex-row items-center">
                      <HeaderSearch />
                    </View>
                  </View>

                </View>

                {isLoading ? (
                  <View>
                    {new Array(20).fill(0).map((_, index) => {
                      return (
                        <TopCreatorTokenListItemSkeleton
                          tw="px-4 md:px-0"
                          key={index}
                          isMdWidth={isMdWidth}
                        />
                      );
                    })}
                  </View>
                ) : null}

                {!isLoading && <>

                  {
                    data.length ? (
                      <View tw="flex-row flex-wrap">
                        <View tw="flex-1">
                          {data?.map((item, index) => {
                            return (
                              <TopCreatorTokenListItem
                                item={item}
                                index={index}
                                key={index}
                                isSimplified={false}
                                isMdWidth={isMdWidth}
                                tw="px-0 md:px-0"
                              />
                            );
                          })}
                        </View>
                      </View>
                    ) : (
                      <ListEmptyComponent />
                    )}
                </>
                }

              </View>

              {isProfileMdScreen ? (
                <View
                  style={{
                    width: 335,
                  }}
                  tw="animate-fade-in-250 ml-10"
                >
                  <Sticky enabled>
                    <CreatorTokensPanel username={'username'} isSelf={true} />
                    {true && <MyCollection />}
                    <TopPartCreatorTokens />
                  </Sticky>
                </View>
              ) : null}
            </View>
          </View>

        </View>
      </View>
    </>
  );
};

import { Button } from "@showtime-xyz/universal.button";
import { Edit } from "@showtime-xyz/universal.icon";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "design-system/dropdown-menu";

import { HeaderSearch } from "../header/header-search";

const FilterDropDown = ({ availableLanguages, unselected }: any) => {

  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const handleLanguageOptionSelected = async (language: any) => {
    setSelectedLanguage(language);
  };

  useEffect(() => {

  }, []);

  return (
    <View tw="ml-2">

      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Button variant="primary" tw={[
            "h-[25px] items-center justify-center rounded-full border border-gray-300 px-3.5 dark:border-gray-600",
          ]}
            style={{ backgroundColor: "", }}>
            <>
              <Text tw="text-xs font-bold dark:text-gray-900 text-white">
                {availableLanguages.find((lang) => lang?.locale === selectedLanguage)?.name || unselected}
              </Text>
            </>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent loop sideOffset={8}>
          {availableLanguages.map((lang, i) => (
            <React.Fragment key={i}>
              <DropdownMenuItem key={lang?.locale}
                onSelect={() => handleLanguageOptionSelected(lang?.locale)}
              >
                <MenuItemIcon Icon={Edit} ios={{ name: "highlighter" }} />
                <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
                  {lang?.name}
                </DropdownMenuItemTitle>
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </View>
  );
};