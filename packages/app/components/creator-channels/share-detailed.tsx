
import { useRef, useMemo, Suspense } from "react";
import {
  useWindowDimensions,
  Platform,
  View as RNView,
} from "react-native";


import { Image } from "@showtime-xyz/universal.image";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { Spinner } from "@showtime-xyz/universal.spinner";
import { View } from "@showtime-xyz/universal.view";

import { ErrorBoundary } from "app/components/error-boundary";
import { useUserProfile } from "app/hooks/api-hooks";
import { createParam } from "app/navigation/use-param";

import { breakpoints } from "design-system/theme";
import { Skeleton } from "@showtime-xyz/universal.skeleton";

import {
  DESKTOP_CONTENT_WIDTH,
  DESKTOP_LEFT_MENU_WIDTH,
} from "app/constants/layout";

import { Carousel } from "app/lib/carousel";
import { useTranslation } from "react-i18next";

type ChannelsPromoteParams = {
  username?: string | undefined;
};
const { useParam } = createParam<ChannelsPromoteParams>();
import { useEffect, useState } from 'react';
import { useShare } from "app/hooks/use-share";

export const ShareDetailed = () => {
  const [username] = useParam("username");
  const { data: userProfiles } = useUserProfile({
    address: username,
  });
  const profile = useMemo(() => userProfiles?.data?.profile, [userProfiles]);

  const viewRef = useRef<RNView | Node>(null);

  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];
  const imageWidth = isMdWidth ? width : width - 32;
  const imageHeight = imageWidth * (435 / 319);

  const item = profile;
  const [banners, setBanners] = useState<any>([]);

  useEffect(() => {
    if (item) {
      // let newBanners = item?.cover_url?.map((ele: any) => {
      //   return {
      //     type: "profile",
      //     username: "JohnDoe",
      //     slug: "",
      //     link: "https://example.com",
      //     image: ele,
      //   };
      // });
      // setBanners(newBanners);
    }
  }, [item]);

  const isLoadingBanner = false;

  // const { data: banners = [], isLoading: isLoadingBanner } = useBanners();
  const pagerWidth = isMdWidth
    ? Math.min(DESKTOP_CONTENT_WIDTH, width - DESKTOP_LEFT_MENU_WIDTH)
    : width - 32;

  const navigateToDetail = () => { };

  const bannerHeight = isMdWidth ? 200 : 200;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <View tw="p-4">
            <Spinner />
          </View>
        }
      >
        <View tw="w-full flex-1">
          <View tw="web:pb-2 web:self-center select-none items-center justify-center pt-0">
            <View collapsable={false} ref={viewRef as any}>
              <View
                style={{
                  width: imageWidth,
                  height: imageHeight - 20,
                }}
                tw="my-0 items-center overflow-hidden rounded-t-3xl"
              >
                <View tw="mt-0 w-full flex-1 px-0">

                  <View tw="mt-4 ">

                    <>
                      <View tw="w-full">
                        <View tw="px-0 md:px-0 my-0">
                          {isLoadingBanner ? (
                            <Skeleton
                              height={bannerHeight}
                              width={pagerWidth}
                              radius={16}
                              tw="web:md:mt-4 web:mt-0"
                            />
                          ) : (
                            banners?.length > 0 && (
                              <Carousel
                                loop
                                width={pagerWidth}
                                height={bannerHeight}
                                autoPlayInterval={5000}
                                data={banners}
                                controller
                                autoPlay
                                tw="web:md:mt-2 web:mt-0 md:rounded-4xl w-full rounded-3xl"
                                pagination={{ variant: "rectangle" }}
                                renderItem={({ item, index }) => (
                                  <Pressable
                                    key={index}
                                    style={{
                                      width: pagerWidth,
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      paddingHorizontal: 60,
                                    }}
                                    onPress={() => navigateToDetail(item)}
                                  >
                                    <Image
                                      source={{
                                        uri: `${item.image}`,
                                      }}
                                      recyclingKey={item.image}
                                      blurhash={item?.blurhash}
                                      resizeMode="cover"
                                      alt={`${item?.username}-banner-${index}`}
                                      transition={200}
                                      {...(Platform.OS === "web"
                                        ? { style: { height: "100%", width: "100%" } }
                                        : { width: pagerWidth, height: bannerHeight })}
                                    />
                                  </Pressable>
                                )}
                              />
                            )
                          )}
                        </View>
                      </View>
                    </>

                  </View>

                </View>
              </View>
            </View>
          </View>
        </View>
      </Suspense>
    </ErrorBoundary>
  );
};
