import React, { useState } from "react";
import { MotiView } from "moti";
import {
  ShowtimeRounded,
  ChevronDown,
  Play,
  Hot,
  Settings,
  CreatorChannel,
  User,
  Plus,
  Home,
  Instagram,
} from "@showtime-xyz/universal.icon";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";
import { TextInput } from "@showtime-xyz/universal.text-input";
import { Button } from "@showtime-xyz/universal.button";
import { Switch } from "@showtime-xyz/universal.switch";
import { Challenge as SkipButton } from "./hcaptcha";
import { colors } from "@showtime-xyz/universal.tailwind";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useTranslation } from "react-i18next";
import { MOCK_INTERESTS, STATES, DISTRICTS, InterestType } from "./onboarding-types";
import { Linking } from "react-native";
import Spinner from "@showtime-xyz/universal.spinner";

const IconMap: { [key: string]: any } = {
  Play,
  Hot,
  Settings,
  CreatorChannel,
  User,
  Plus,
  Home,
  Instagram,
};

type Gender = "male" | "female";

interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  age: string;
  state: string;
  district: string;
  pinCode: string;
  interests: string[];
  email: string;
  phone: string;
  termsAccepted: boolean;
}

export const SelectSocial = ({ channelId }: { channelId: string }) => {
  const isDark = useIsDarkMode();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    firstName: "John",
    middleName: "Jane",
    lastName: "Doe",
    gender: "male",
    age: "25",
    state: "California",
    district: "Los Angeles",
    pinCode: "123456",
    interests: ["sports", "music"],
    email: "test@example.com",
    phone: "1234567890",
    termsAccepted: true,
  });

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const pinCodeRegex = /^\d{6}$/;

    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!userData.age || isNaN(Number(userData.age)) || Number(userData.age) < 13) {
      newErrors.age = 'Please enter a valid age (13 or older)';
    }

    if (!userData.state) {
      newErrors.state = 'State is required';
    }

    if (!userData.district) {
      newErrors.district = 'District is required';
    }

    if (!pinCodeRegex.test(userData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit pin code';
    }

    if (userData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    if (!emailRegex.test(userData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!phoneRegex.test(userData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!userData.termsAccepted) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestToggle = (interest: InterestType) => {
    setUserData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest.id)
        ? prev.interests.filter(i => i !== interest.id)
        : [...prev.interests, interest.id].slice(0, 10)
    }));
  };

  const { user } = useContext(OnboardingStepContext);
  const { validate } = useValidateFanWithServer(channelId);
  const finishOnboarding = useFinishOnboarding();
  const { mutate } = useSWRConfig();
  const matchMutate = useMatchMutate();
  const [hCaptchaLoaded, setHCaptchaLoaded] = useState(
    typeof window.hcaptcha !== "undefined"
  );
  const [challengeRunning, setChallengeIsRunning] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

  // this is the callback function that is called when the
  // hcaptcha library is loaded

  const showCaptcha = async () => {

    if (!validateForm()) return;
    console.log('Form Data:', userData);

    // has_social_login is true if user has logged in with google, apple, spotify, twitter, instagram
    // the value is false if user has logged in with email or phone number
    const hasSocialHandle = user?.data?.profile?.has_social_login;

    // we skip if the user has already completed the captcha or has a social handle
    // if (user?.data?.profile?.captcha_completed_at || hasSocialHandle) {
    //   finishOnboarding();
    //   return;
    // }

    // open the captcha if the condition above is not met

    setChallengeIsRunning(true);

    try {
      // const token = await captchaRef.current?.execute({ async: true });

      // send the response to the server and validate it
      const status = await validate('token?.response').catch((err) => {
        const error = err as AxiosError;
        if (axios.isAxiosError(error)) {
          Logger.log(error.response?.data.error.message);
          toast.error(error.response?.data?.error?.message);
        } else {
          Logger.log(err?.message);
        }

        return "failed";
      });

      // if the captcha was validated successfully, we can
      // move on to the next step
      if (status !== "failed") {
        await mutate(MY_INFO_ENDPOINT);
        await matchMutate(
          (key) => typeof key === "string" && key.includes(USER_PROFILE_KEY)
        );

        // finish onboarding
        finishOnboarding();
      }
    } catch (err) {
      toast.error(t('Onboarding.CaptchaError'));
    } finally {
      // this has to be called to reset the captcha once validated with the server
      captchaRef.current?.resetCaptcha();
      setChallengeIsRunning(false);
    }
  };



  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      exitTransition={{ type: "timing", duration: 600 }}
      style={{ flex: 1 }}
    >
      <View tw="flex-1 px-4">
        <View tw="items-center mb-6">
          <Text tw="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('Onboarding.Title')}
          </Text>
          <View tw="h-4" />
          <Text tw="text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            {t('Onboarding.SubTitle')}
          </Text>
        </View>

        <View tw="flex-row gap-2 mb-4">
          <TextInput
            placeholder="First Name *"
            value={userData.firstName}
            onChangeText={(text) => setUserData(prev => ({ ...prev, firstName: text }))}
            tw="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded"
          />
          <TextInput
            placeholder="Middle Name"
            value={userData.middleName}
            onChangeText={(text) => setUserData(prev => ({ ...prev, middleName: text }))}
            tw="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded"
          />
          <TextInput
            placeholder="Last Name *"
            value={userData.lastName}
            onChangeText={(text) => setUserData(prev => ({ ...prev, lastName: text }))}
            tw="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded"
          />
        </View>

        <View tw="flex-row items-center justify-between mb-4">
          <View tw="flex-row items-center">
            <Text tw="mr-2">Gender:</Text>
            <Switch
              checked={userData.gender === 'male'}
              onChange={(val) => setUserData(prev => ({
                ...prev,
                gender: val ? 'male' : 'female'
              } as UserData))}
            />
            <Text tw="ml-2">{userData.gender}</Text>
          </View>
          <TextInput
            placeholder="Age *"
            value={userData.age}
            onChangeText={(text) => setUserData(prev => ({ ...prev, age: text }))}
            tw="w-20 p-3 border border-gray-300 dark:border-gray-700 rounded"
            keyboardType="numeric"
          />
        </View>

        <View tw="mb-4">
          <Button
            onPress={() => setShowStateDropdown(!showStateDropdown)}
            tw="flex-row items-center justify-between p-3 border border-gray-300 dark:border-gray-700 rounded mb-2"
          >
            <Text>{userData.state || "Select State *"}</Text>
            <ChevronDown width={20} height={20} />
          </Button>

          {showStateDropdown && (
            <View tw="border border-gray-300 dark:border-gray-700 rounded mb-2">
              {STATES.map((state) => (
                <Button
                  key={state}
                  onPress={() => {
                    setUserData(prev => ({ ...prev, state, district: '' }));
                    setShowStateDropdown(false);
                  }}
                  tw="p-3 border-b border-gray-200 dark:border-gray-700"
                >
                  <Text>{state}</Text>
                </Button>
              ))}
            </View>
          )}

          {userData.state && (
            <Button
              onPress={() => setShowDistrictDropdown(!showDistrictDropdown)}
              tw="flex-row items-center justify-between p-3 border border-gray-300 dark:border-gray-700 rounded mb-2"
            >
              <Text>{userData.district || "Select District *"}</Text>
              <ChevronDown width={20} height={20} />
            </Button>
          )}

          {showDistrictDropdown && userData.state && (
            <View tw="border border-gray-300 dark:border-gray-700 rounded mb-2">
              {DISTRICTS[userData.state].map((district) => (
                <Button
                  key={district}
                  onPress={() => {
                    setUserData(prev => ({ ...prev, district }));
                    setShowDistrictDropdown(false);
                  }}
                  tw="p-3 border-b border-gray-200 dark:border-gray-700"
                >
                  <Text>{district}</Text>
                </Button>
              ))}
            </View>
          )}

          <TextInput
            placeholder="Pin Code *"
            value={userData.pinCode}
            onChangeText={(text) => setUserData(prev => ({ ...prev, pinCode: text }))}
            tw="p-3 border border-gray-300 dark:border-gray-700 rounded"
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <View tw="mt-8 mb-6">
          <Text tw="mb-4 font-semibold">Select your interests (max 10)</Text>
          <View tw="flex-row flex-wrap gap-2">
            {MOCK_INTERESTS.map((interest) => {
              const IconComponent = IconMap[interest.icon];
              const isSelected = userData.interests.includes(interest.id);
              return (
                <Button
                  key={interest.id}
                  onPress={() => handleInterestToggle(interest)}
                  tw={`flex-row items-center px-3 py-2 rounded-full ${isSelected
                    ? "bg-blue-500"
                    : "bg-gray-200 dark:bg-gray-700"
                    }`}
                >
                  {IconComponent && (
                    <View tw="mr-2">
                      <IconComponent
                        width={16}
                        height={16}
                        color={isSelected ? "#fff" : "#666"}
                      />
                    </View>
                  )}
                  <Text
                    tw={`${isSelected
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {interest.label}
                  </Text>
                </Button>
              );
            })}
          </View>
        </View>

        <View tw="mb-6">
          <TextInput
            placeholder="Email *"
            value={userData.email}
            onChangeText={(text) => setUserData(prev => ({ ...prev, email: text }))}
            tw="mb-4 p-3 border border-gray-300 dark:border-gray-700 rounded"
          />

          <TextInput
            placeholder="Phone *"
            value={userData.phone}
            onChangeText={(text) => setUserData(prev => ({ ...prev, phone: text }))}
            tw="p-3 border border-gray-300 dark:border-gray-700 rounded"
          />
        </View>

        <View tw="mb-6">
          <View tw="flex-row items-center">
            <Switch
              checked={userData.termsAccepted}
              onChange={(val) => setUserData(prev => ({ ...prev, termsAccepted: val }))}
            />
            <Text tw="ml-2">I agree to the </Text>
            <Button
              onPress={() => Linking.openURL('https://example.com/terms')}
              tw="p-0"
            >
              <Text tw="text-blue-500">Terms and Conditions</Text>
            </Button>
          </View>
        </View>

        <View tw="mb-4">
          {Object.entries(errors).map(([key, error]) => (
            <Text key={key} tw="text-red-500 mb-2">{error}</Text>
          ))}
        </View>

        {/* <Button
          onPress={handleSubmit}
          disabled={isLoading || Object.keys(errors).length > 0 || !userData.termsAccepted}
          tw={`bg-blue-500 p-4 rounded-lg items-center ${(Object.keys(errors).length > 0 || !userData.termsAccepted)
            ? 'opacity-50'
            : ''
            }`}
        >
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <Text tw="text-white font-bold">Finish</Text>
          )}
        </Button> */}
        <View tw="h-4" />
        {/* <SkipButton channelId={channelId} /> */}
        {/* <Button
          size="regular"
          onPress={handleSubmit}
        >
          {true ? (
            t('Onboarding.Finish')
          ) : (
            <Spinner size="small" color={isDark ? "white" : "black"} />
          )}
        </Button> */}

        <Button
          size="regular"
          variant="text"
          disabled={isLoading || Object.keys(errors).length > 0 || !userData.termsAccepted}
          onPress={showCaptcha}
        >
          {true ? (
            t('Onboarding.Finish')
          ) : (
            <Spinner size="small" color={isDark ? "white" : "black"} />
          )}
        </Button>
      </View>
    </MotiView>
  );
};



import { useRef } from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import * as Portal from "@radix-ui/react-portal";
import axios, { AxiosError } from "axios";
import { useSWRConfig } from "swr";


import { USER_PROFILE_KEY } from "app/hooks/api-hooks";
import { useMatchMutate } from "app/hooks/use-match-mutate";
import { Logger } from "app/lib/logger";
import { MY_INFO_ENDPOINT } from "app/providers/user-provider";

import { toast } from "design-system/toast";
import { OnboardingStepContext } from "./onboarding-context";
import { useFinishOnboarding, useValidateFanWithServer } from "./hcaptcha/hcaptcha-utils";




