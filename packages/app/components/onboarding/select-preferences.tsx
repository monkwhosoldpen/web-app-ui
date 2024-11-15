import React, { useEffect, useMemo, useContext, useRef } from "react";
import { Platform, TextInput } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { MotiView } from "moti";
import { Controller, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { Button } from "@showtime-xyz/universal.button";
import { Fieldset } from "@showtime-xyz/universal.fieldset";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { USER_PROFILE_KEY, useMyInfo } from "app/hooks/api-hooks";
import { useMatchMutate } from "app/hooks/use-match-mutate";
import { useValidateUsername } from "app/hooks/use-validate-username";
import { axios } from "app/lib/axios";
import { Logger } from "app/lib/logger";
import { yup } from "app/lib/yup";
import { MY_INFO_ENDPOINT } from "app/providers/user-provider";

import { Spinner } from "design-system/spinner";

import { OnboardingStepContext } from "./onboarding-context";
import { OnboardingStep } from "./onboarding-types";

import { Edit } from "@showtime-xyz/universal.icon";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "design-system/dropdown-menu";
import { useState } from "react";

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

export const SelectPreferences = () => {
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

  // const {
  //   control,
  //   handleSubmit,
  //   setError,
  //   formState: { isSubmitting, isValid: isFormValid },
  //   reset,
  // } = useForm<any>({
  //   resolver: yupResolver(editProfileValidationSchema),
  //   mode: "all",
  //   reValidateMode: "onChange",
  //   shouldFocusError: true,
  //   defaultValues,
  // });

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [reset, defaultValues]);

  const handleSubmitForm = async () => {
    // debugger;
    // if (isLoading || isSubmitting) return;
    setStep(OnboardingStep.Social);
  };

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<any>('');
  const [isValidlocation_code, setIsValidlocation_code] = useState(true);

  const handleLanguageOptionSelected = async (location: any) => {
    setSelectedLocation(location.location_code);
    setIsValidlocation_code(true);
  };

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
      <View tw="flex-1 px-4 text-center">
        <View tw="items-center">
          <View tw="h-4" />
          <Text tw="text-xl font-bold text-gray-900 dark:text-gray-100">
            First, Create your Profile
          </Text>
          <View tw="h-10" />
          <Text tw="text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            You can always change your Location Details, later.
          </Text>
        </View>

        <View tw="h-4" />

        <Button
          tw={[
            "mt-12 flex",
          ]}
          size="regular"
          // disabled={
          //   isSubmitting
          // }
          onPress={handleSubmitForm}
        >
          Next
          {isLoading ? (
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
