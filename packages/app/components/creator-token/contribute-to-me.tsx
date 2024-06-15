import {
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { View } from "@showtime-xyz/universal.view";

import { createParam } from "solito";

import { Avatar } from "@showtime-xyz/universal.avatar";
import { BottomSheetModalProvider } from "@showtime-xyz/universal.bottom-sheet";
import { ModalSheet } from "@showtime-xyz/universal.modal-sheet";
import { Text } from "@showtime-xyz/universal.text";
import { useTranslation } from "react-i18next";
import { CreatorTokensExplanation } from "../profile/tokens-explanation";

type Query = {
  username: string;
  selectedAction: "home" | "manifesto";
};

const { useParam } = createParam<Query>();

export const ContributeToMe = ({ }: any) => {

  const [username] = useParam("username");
  const { data: userProfiles } = useUserProfile({
    address: username,
  });
  const profile: any = useMemo(() => userProfiles?.data?.profile, [userProfiles]);

  const [selectedActionParam] = useParam("selectedAction"); const {
    data: profileData,
  } = useUserProfile({ address: username });

  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  const [name, setName] = useState<any>('');
  const [bio, setBio] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [designation, setDesignation] = useState<any>('');

  const [img_url, setImg_url] = useState<any>('');
  const [cover_url, setCover_url] = useState<any>('');

  const [designationAndLocation, setDesignationAndLocation] = useState<any>('');

  const item = profileData?.data?.profile;
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const uploadedImageUrl = profile?.img_url && profile?.img_url.length > 0 ? profile?.img_url[0] : null;
  const image_url = `${supabaseURL}/storage/v1/object/public/${uploadedImageUrl}`;

  useEffect(() => {
    if (item) {
      const metadataWithTranslations = Array.isArray(item['metadata_with_translations']) ? item['metadata_with_translations'][0] : [];
      const updatedBio = metadataWithTranslations['bio' + '_' + selectedLanguage] || metadataWithTranslations['bio'];
      setBio(updatedBio);

      const updatedLocation = metadataWithTranslations['location_name' + '_' + selectedLanguage] || metadataWithTranslations['location_name'];
      setLocation(updatedLocation);

      const designation = item?.type && item.type.length > 0 ? item.type[0] : 'NA';
      const translatedDesignation = t(`netaType.${designation}`);
      setDesignation(translatedDesignation);

      setDesignationAndLocation(`${translatedDesignation}, ${updatedLocation}`);
      setName(metadataWithTranslations['name' + '_' + selectedLanguage]);
    }
  }, [selectedLanguage, item]);
  // const { data: profileData } = useUserProfile({ address: username });
  const [showExplanation, setShowExplanation] = useState(false);


  return <BottomSheetModalProvider>
    <>

      <View tw="px-4 py-2">

        <View tw="mt-4 rounded-3xl border-[1px] border-gray-300 px-4 py-4 dark:border-gray-800">
          <View tw="flex-row" style={{ columnGap: 16 }}>
            <Avatar size={90} url={image_url} />
            <View tw="flex-1" style={{ rowGap: 2 }}>

              <View tw="mt-4">
                <Text tw="mt-0 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {name}
                </Text>
              </View>
              <View tw="mt-4 flex-row">
                <Text tw="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {location}
                </Text>
                <View
                  tw="relative -right-6 rounded-full"
                  style={{ backgroundColor: "#008F77" }}
                >

                </View>
              </View>
            </View>
          </View>
        </View>

      </View>

      <SelectSuperMenu />



      <ModalSheet
        snapPoints={[400]}
        title=""
        visible={showExplanation}
        close={() => setShowExplanation(false)}
        onClose={() => setShowExplanation(false)}
        tw="sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] "
      >
        <CreatorTokensExplanation />
      </ModalSheet>
    </>
  </BottomSheetModalProvider>;
};


import React, { useContext, useRef } from "react";
import { Platform, TextInput } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { MotiView } from "moti";
import { Controller, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { Button } from "@showtime-xyz/universal.button";
import { Fieldset } from "@showtime-xyz/universal.fieldset";

import { USER_PROFILE_KEY, useMyInfo, useUserProfile } from "app/hooks/api-hooks";
import { useMatchMutate } from "app/hooks/use-match-mutate";
import { useValidateUsername } from "app/hooks/use-validate-username";

import { Spinner } from "design-system/spinner";

import { Edit } from "@showtime-xyz/universal.icon";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "design-system/dropdown-menu";
import { useRouter } from "@showtime-xyz/universal.router";
import { OnboardingStepContext } from "../onboarding";
import { yup } from "app/lib/yup";

const editProfileValidationSchema = yup.object({
  username: yup
    .string()
    .required()
    .typeError("Please enter a valid username")
    .label("Username")
    .min(2)
    .max(30)
    .matches(
      /^([0-9a-zA-Z_]{2,30})$/g,
      "Invalid username. Use only letters, numbers, and underscores (_)."
    ),
},);

export const SelectSuperMenu = () => {
  const usernameRef = useRef<TextInput | null>(null);
  const { user, setStep } = useContext(OnboardingStepContext);
  const { mutate } = useSWRConfig();
  const matchMutate = useMatchMutate();
  const {
    isValid: isValidUsername,
    validate,
    isLoading,
  } = useValidateUsername();

  const defaultValues = useMemo(() => {
    return {
      username: user?.data?.profile.username ?? "",
      location_code: user?.data?.profile.location_code ?? "",
    };
  }, [user?.data?.profile]);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid: isFormValid },
    reset,
  } = useForm<any>({
    resolver: yupResolver(editProfileValidationSchema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const handleSubmitForm = async (values: typeof defaultValues) => {
    if (!isFormValid || !isValidUsername || isLoading || isSubmitting) return;
    const newValues = {
      username: values.username?.trim() || null,
      location_code: selectedLocation?.trim() || 'LOCATION_ERROR_OCCURRED',
    };

    router.pop();
  };

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<any>('');
  const [isValidlocation_code, setIsValidlocation_code] = useState(true);

  const { refetchMyInfo, data: myInfoData } = useMyInfo();

  const [location, setLocation] = useState<any>(myInfoData?.data?.profile?.location_code || 'DEFAULT');

  useEffect(() => {
    setLocation(myInfoData?.data?.profile?.location_code);
  }, [location]);

  useEffect(() => {
    // Update the location in the useChannelsList hook when it changes
    // This will trigger the hook to fetch data for the new location
    if (location) {
      setLocation(location);
    }
  }, [location]);


  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={() => {
        "worklet";
        return {
          opacity: 0,
          scale: 0.9,
        };
      }}
      exitTransition={{
        type: "timing",
        duration: 600,
      }}
      style={{ flex: 1 }}
    >
      <View tw="mt-4 flex-1 px-4 text-center">
        <View tw="">
          <View tw="h-4" />
          <Text tw="text-xl font-bold text-gray-900 dark:text-gray-100">
            Contribute to my causes
          </Text>
          <View tw="h-6" />
          <Text tw="text-sm font-semibold text-gray-500 dark:text-gray-400">
            You can donate to me here
          </Text>
        </View>
        <View tw="mt-8 flex flex-grow-0">
          <Controller
            control={control}
            name="username"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <>
                <Fieldset
                  ref={(innerRef: TextInput) => {
                    usernameRef.current = innerRef;
                    ref(innerRef);
                  }}
                  placeholder=""
                  value={value}
                  textContentType="username"
                  errorText={
                    !isValidUsername && !error
                      ? "Username taken. Please choose another."
                      : error?.message
                  }
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(v) => {
                    onChange(v);
                    validate(v);
                  }}
                  leftElement={
                    <Text
                      onPress={() => usernameRef.current?.focus()}
                      tw="text-gray-600 dark:text-gray-400"
                      style={{
                        fontSize: 16,
                        marginTop: Platform.select({
                          android: -8,
                          default: 0,
                        }),
                        marginRight: 1,
                      }}
                    >
                      {'Amount '}
                      <Text tw="font-bold text-black dark:text-white">{' : '}</Text>
                    </Text>
                  }
                />
              </>
            )}
          />
        </View>
        <Button
          tw={[
            "mt-12 flex",
            !isFormValid || !isValidUsername || !isValidlocation_code || isLoading || isSubmitting
              ? "opacity-50"
              : "opacity-100",
          ]}
          size="regular"
          disabled={
            !isFormValid || !isValidUsername || !isValidlocation_code || isLoading || isSubmitting
          }
          onPress={handleSubmit(handleSubmitForm)}
        >
          Next
          {isLoading || isSubmitting ? (
            <View tw="absolute right-4 scale-75 justify-center">
              <Spinner size="small" color="darkgrey" />
            </View>
          ) : (
            <></>
          )}
        </Button>

      </View>
    </MotiView>
  );
};
