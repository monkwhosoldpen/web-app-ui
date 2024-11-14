import { useMemo } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";

import { BlurView } from "expo-blur";

import { Chip } from "@showtime-xyz/universal.chip";
import { ClampText } from "@showtime-xyz/universal.clamp-text";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { Image } from "@showtime-xyz/universal.image";
import { LightBox } from "@showtime-xyz/universal.light-box";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { VerificationBadge } from "@showtime-xyz/universal.verification-badge";
import { View, ViewProps } from "@showtime-xyz/universal.view";

import { useContentWidth } from "app/hooks/use-content-width";
import { linkifyDescription } from "app/lib/linkify";
import {
  getProfileImage,
  getProfileName,
} from "app/utilities";


import { ProfileSocial } from "./profile-social";

import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

import { Button, GradientButton } from "@showtime-xyz/universal.button";
import { useRouter } from "@showtime-xyz/universal.router";

import { useJoinChannel } from "app/components/creator-channels/hooks/use-join-channel";
import { NotificationsFollowButton } from "app/components/notifications-follow-button";
import { ProfileDropdown } from "app/components/profile-dropdown";
import { UserProfile, useUserProfile } from "app/hooks/api-hooks";
import { useBlock } from "app/hooks/use-block";

import { useCurrentUserId } from "app/hooks/use-current-user-id";
import { useFollow } from "app/hooks/use-follow";
import { useRedirectToCreateDrop } from "app/hooks/use-redirect-to-create-drop";
import { useUser } from "app/hooks/use-user";

import { breakpoints } from "design-system/theme";

import { FollowButton } from "../follow-button";
import { ProfileFollows } from "./profile-follows";
import { useTranslation } from "react-i18next";

type ProfileTopProps = {
  address: string;
  isBlocked: boolean;
  animationHeaderPosition?: Animated.SharedValue<number>;
  animationHeaderHeight?: Animated.SharedValue<number>;
  profileData: UserProfile | undefined | any;
  isError: boolean;
  isLoading: boolean;
  savedSongs?: number;
  isSelf: boolean;
};

const AVATAR_BORDER_SIZE_SMALL = 4;
const AVATAR_BORDER_SIZE_LARGE = 8;

const AVATAR_SIZE_SMALL = 82;
const AVATAR_SIZE_LARGE = 144;

export const ProfileCover = ({
  uri,
  style,
  ...rest
}: { uri?: string } & ViewProps) => {
  const coverWidth = useContentWidth();
  const { top } = useSafeAreaInsets();

  // for iPhone 14+
  const additionalCoverheight = top > 55 ? 20 : 0;
  // banner ratio: w:h=3:1
  const coverHeight =
    (coverWidth < 768 ? coverWidth / 4 : coverWidth / 5) +
    additionalCoverheight;

  return (
    <View
      style={[
        {
          height: coverHeight,
        },
        style,
      ]}
      {...rest}
    >
      <Image
        source={{
          uri,
        }}
        alt="Cover image"
        resizeMode="cover"
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <BlurView
        tint="dark"
        intensity={35}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      />
    </View>
  );
};

import { useEffect, useState } from 'react';
import ProfileSocialTop from "./profile-social-top";

export const ProfileTop = ({
  address,
  animationHeaderPosition,
  animationHeaderHeight,
  profileData,
  isError,
  isLoading,
}: ProfileTopProps) => {

  const { mutate: mutateUserProfile } = useUserProfile({ address });
  const isDark = useIsDarkMode();
  const userId = useCurrentUserId();

  const [img_url, setImg_url] = useState<any>('');
  const [cover_url, setCover_url] = useState<any>('');


  // const name = profileData?.profile['name' + '_' + selectedLanguage];
  const username = profileData?.profile.username;
  const description = profileData?.profile.description;
  const full_name = profileData?.profile.full_name;
  // const bio: any = profileData?.profile['bio' + '_' + selectedLanguage];
  const { isIncompletedProfile } = useUser();
  const { width, height: screenHeight } = useWindowDimensions();
  const coverWidth = useContentWidth();
  const isMdWidth = width >= breakpoints["md"];
  const profileId = profileData?.profile.profile_id;
  const { unblock } = useBlock();
  const { onToggleFollow } = useFollow({
    username,
  });

  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  const item = profileData?.profile;

  const [name, setName] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [bio, setBio] = useState<any>('');
  const [designation, setDesignation] = useState<any>('');

  useEffect(() => {
    if (item) {
      const nameObj = item?.metadata_with_translations?.name || {};
      const bioObj = item?.metadata_with_translations?.bio || {};
      const name = nameObj[selectedLanguage] || nameObj?.english;
      const bio = bioObj[selectedLanguage] || bioObj?.english;

      const location_code = item?.location_code || '';
      const designation = item?.type && item.type.length > 0 ? item.type[0] : '';
      const translatedDesignation = t(`netaType.${designation}`);
      setDesignation(translatedDesignation);
      setLocation(location_code);
      setName(name);
      setBio(bio);
    }
  }, [selectedLanguage, item]);

  useEffect(() => {
  }, [selectedLanguage, item]);


  useEffect(() => {
    if (item) {

      // const metadataWithTranslations = Array.isArray(item['metadata_with_translations']) ? item['metadata_with_translations'][0] : [];
      // // const updatedBio = metadataWithTranslations['bio' + '_' + selectedLanguage] || metadataWithTranslations['bio'];
      // // setBio(updatedBio);

      // // const updatedLocation = metadataWithTranslations['location_name' + '_' + selectedLanguage] || metadataWithTranslations['location_name'];
      // // setLocation(updatedLocation);

      // const designation = item?.type && item.type.length > 0 ? item.type[0] : 'Not Available';
      // // const translatedDesignation = t(`netaType.${designation}`);
      // // setDesignation(translatedDesignation);

      // // setDesignationAndLocation(`${translatedDesignation}, ${updatedLocation}`);
      // setName(metadataWithTranslations['name' + '_' + selectedLanguage]);
    }
  }, [selectedLanguage, item]);

  useEffect(() => {
    // setName(item['name' + '_' + selectedLanguage]);
  }, [selectedLanguage, item]);

  useEffect(() => {

    if (item) {
      const image_url = profileData.profile.img_url;
      const coverUrl = profileData.profile.cover_url;
      setImg_url(image_url);
      setCover_url(coverUrl);
    }
  }, [item]);


  const { top } = useSafeAreaInsets();
  const bioWithMentions = useMemo(() => linkifyDescription(bio), [bio]);
  // for iPhone 14+
  const additionalCoverheight = top > 55 ? 20 : 20;
  // banner ratio: w:h=3:1
  const coverHeight =
    (coverWidth < 768 ? 120 : 180) + additionalCoverheight;
  const avatarBorder = isMdWidth
    ? AVATAR_BORDER_SIZE_LARGE
    : AVATAR_BORDER_SIZE_SMALL;
  const avatarSize = isMdWidth ? AVATAR_SIZE_LARGE : AVATAR_SIZE_SMALL;
  const avatarStyle = useAnimatedStyle(() => {
    if (!animationHeaderHeight || !animationHeaderPosition) {
      return {};
    }
    return {
      transform: [
        {
          scale: interpolate(
            Math.min(animationHeaderPosition.value, 0),
            [0, animationHeaderHeight.value],
            [1, 1.5]
          ),
        },
        {
          translateY: interpolate(
            Math.min(animationHeaderPosition.value, 0),
            [0, animationHeaderHeight.value],
            [0, -40]
          ),
        },
        {
          translateX: interpolate(
            Math.min(animationHeaderPosition.value, 0),
            [0, animationHeaderHeight.value],
            [0, 16]
          ),
        },
      ],
    };
  }, []);

  return (
    <>
      <View tw="web:bg-gray-100 overflow-hidden bg-gray-400 dark:bg-gray-800 xl:rounded-b-[32px] 2xl:-mx-20">
        <Skeleton height={coverHeight} width="100%" show={isLoading} radius={0}>
          <>
            {cover_url && (
              <LightBox
                width={"100%"}
                height={coverHeight}
                imgLayout={{ width: "100%", height: coverHeight }}
                tapToClose
                containerStyle={{ width: coverWidth, height: coverHeight }}
              >
                <Image
                  source={{
                    uri: cover_url//profileData?.profile.cover_url,
                  }}
                  alt="Cover image"
                  resizeMode="cover"
                  style={{ ...StyleSheet.absoluteFillObject }}
                />
              </LightBox>
            )}
            <BlurView
              tint="dark"
              intensity={0}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                overflow: "hidden",
              }}
            />
            <View
              tw="absolute inset-0 bg-black/10 dark:bg-black/30"
              pointerEvents="none"
            />
          </>
        </Skeleton>
      </View>
      <View tw="mx-2 md:mx-4">
        <View tw="flex-row justify-between">
          <View
            tw="flex-row items-end"
            style={{
              marginTop: -avatarSize / 2,
            }}
          >
            <Animated.View
              style={[
                {
                  width: avatarSize + avatarBorder * 2,
                  height: avatarSize + avatarBorder * 2,
                  borderRadius: 9999,
                  overflow: "hidden",
                  borderWidth: avatarBorder,
                  borderColor: isDark ? "#000" : "#FFF",
                  backgroundColor: isDark ? colors.gray[900] : colors.gray[200],
                  margin: -avatarBorder,
                },
                avatarStyle,
              ]}
            >
              <Skeleton
                height={avatarSize}
                width={avatarSize}
                show={isLoading}
                radius={0}
              >
                {profileData && (
                  <LightBox
                    width={avatarSize}
                    height={avatarSize}
                    imgLayout={{ width: coverWidth, height: width }}
                    borderRadius={999}
                    tapToClose
                  >
                    <Image
                      source={{
                        uri: img_url //getProfileImage(profileData?.profile),
                      }}
                      width={Platform.select({
                        web: screenHeight * 0.82,
                        default: undefined,
                      })}
                      height={Platform.select({
                        web: screenHeight * 0.82,
                        default: undefined,
                      })}
                      style={Platform.select({
                        web: {},
                        default: { ...StyleSheet.absoluteFillObject },
                      })}
                      alt={profileData?.profile.name ?? ""}
                    />
                  </LightBox>
                )}
              </Skeleton>
            </Animated.View>
          </View>

          {address && !isError ? (
            <View tw="flex-row items-center">
              {profileId ? (
                <>
                  <ProfileDropdown user={profileData?.profile} />
                  <View tw="w-2" />
                  <NotificationsFollowButton
                    username={username}
                    profileId={profileId}
                  />
                  <View tw="w-2" />
                  <FollowButton
                    size={width < 768 ? "small" : "regular"}
                    name={username}
                    username={username}
                    onToggleFollow={onToggleFollow}
                  />
                  <View tw="w-2" />
                </>
              ) : null}
            </View>
          ) : null}
        </View>

        <View tw="px-2 py-3">
          {isLoading ? (
            <>
              <Skeleton height={24} width={150} show={true} />
              <View tw="h-2" />
              <Skeleton height={12} width={100} show={true} />
            </>
          ) : (
            <View tw="flex-row items-start justify-between">
              <View tw="flex-1">
                <Text
                  tw="max-w-45 text-2xl font-extrabold text-gray-900 dark:text-white"
                  numberOfLines={2}
                >
                  {name}
                </Text>
                <View tw="h-2 md:h-3" />
                <View tw="flex-row items-center">
                  {Boolean(full_name) && (
                    <>
                      <Text tw="text-base text-gray-600 dark:text-gray-400 md:text-lg">
                        {`${full_name}`}
                      </Text>
                    </>
                  )}

                  {item?.verified ? (
                    <View tw="ml-1">
                      <VerificationBadge size={16} bgColor={item?.is_premium ? "green" : isDark ? "white" : "black"} />
                    </View>
                  ) : null}
                </View>
                <View tw="h-2 md:h-3" />
                <View tw="flex-row items-center">
                  {Boolean(description) && (
                    <>
                      <Text tw="text-base text-gray-600 dark:text-gray-400 md:text-lg">
                        {/* {designation},  {location} */}
                        {description}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <ProfileSocialTop profile={profileData?.profile} />
            </View>
          )}

          {bio ? (
            <View tw="mt-4 items-baseline">
              <ClampText
                text={bioWithMentions}
                maxLines={3}
                tw="text-sm text-gray-900 dark:text-white"
              />
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};
