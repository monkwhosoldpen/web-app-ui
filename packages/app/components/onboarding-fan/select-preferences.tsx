import React, { useEffect, useMemo, useContext, useRef, useState } from "react";
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
import { supabase } from "app/providers/utils/supabaseClient";
import { useAuth } from "app/hooks/auth/use-auth";
import { UserContext } from "app/context/user-context";

const emailValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .label("Email"),
  otp: yup
    .string()
    .when("isOtpSent", {
      is: true,
      then: (schema) => schema.required("OTP is required").length(6, "OTP must be 6 digits"),
      otherwise: (schema) => schema,
    }),
});

export const SelectPreferences = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { user, setStep } = useContext(OnboardingStepContext);
  const { setAuthenticationStatus, login } = useAuth();
  const userContext = useContext(UserContext);

  const isGuest = useMemo(() => {
    return userContext?.user?.isGuest || user?.isGuest;
  }, [userContext?.user?.isGuest, user?.isGuest]);

  const currentEmail = useMemo(() => {
    return userContext?.user?.data?.profile?.email || user?.data?.profile?.email;
  }, [userContext?.user?.data?.profile?.email, user?.data?.profile?.email]);

  const isEmailVerified = useMemo(() => {
    return userContext?.user?.data?.profile?.email_confirmed_at || user?.data?.profile?.email_confirmed_at;
  }, [userContext?.user?.data?.profile?.email_confirmed_at, user?.data?.profile?.email_confirmed_at]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid: isFormValid },
    watch,
  } = useForm({
    resolver: yupResolver(emailValidationSchema),
    mode: "onChange",
    defaultValues: {
      email: currentEmail,
      otp: "",
      isOtpSent,
    },
  });

  const email = watch("email");
  const otp = watch("otp");

  const handleSendOTP = async () => {
    try {
      setIsVerifying(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: undefined,
          data: {
            email_confirm: true,
          },
        },
      });

      if (error) throw error;
      setIsOtpSent(true);
    } catch (error) {
      Logger.error(error);
      setError("email", { 
        message: error.message || "Failed to send OTP" 
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOTP = async (formData: any) => {
    try {
      setIsVerifying(true);
      setAuthenticationStatus("AUTHENTICATING");

      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: 'email',
        options: {
          shouldCreateUser: true
        }
      });

      if (verifyError) throw verifyError;

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;

      if (!session) throw new Error("No session found after verification");

      const updatedUser = await login("login_magic", {
        did: session.user.id,
        provider_access_token: session.access_token,
        data: {
          user: {
            id: session.user.id,
            email: formData.email,
            email_confirmed_at: new Date().toISOString(),
          },
          session: {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          }
        }
      });

      setAuthenticationStatus("AUTHENTICATED");
      userContext.setUser(updatedUser);
      setStep(OnboardingStep.Social);
    } catch (error) {
      Logger.error(error);
      setAuthenticationStatus("UNAUTHENTICATED");
      setError("otp", { 
        message: error.message || "Invalid OTP" 
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Add a function to handle direct navigation
  const handleNext = () => {
    setStep(OnboardingStep.Social);
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      exitTransition={{ type: "timing", duration: 600 }}
      style={{ flex: 1 }}
    >
      <View tw="flex-1 px-4 text-center">
        <View tw="items-center">
          <Text tw="text-xl font-bold text-gray-900 dark:text-gray-100">
            Verify your Email
          </Text>
          <View tw="h-4" />
          
          <View tw="flex-row items-center space-x-2">
            {isGuest && (
              <Text tw="text-sm font-medium text-amber-500">
                Guest Account
              </Text>
            )}
            {currentEmail && (
              <>
                <Text tw="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {currentEmail}
                </Text>
                {isEmailVerified ? (
                  <Text tw="text-sm font-medium text-green-500">
                    (Verified)
                  </Text>
                ) : (
                  <Text tw="text-sm font-medium text-amber-500">
                    (Unverified)
                  </Text>
                )}
              </>
            )}
          </View>
          
          <View tw="h-4" />
          <Text tw="text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            {isEmailVerified 
              ? "Your email is verified" 
              : "We'll send you a verification code"}
          </Text>
        </View>

        <View tw="h-8" />

        {/* Show email field only if not verified */}
        {!isEmailVerified && (
          <>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Fieldset
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />

            {isOtpSent && (
              <>
                <View tw="h-4" />
                <Controller
                  control={control}
                  name="otp"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Fieldset
                      label="Verification Code"
                      placeholder="Enter 6-digit code"
                      value={value}
                      onChangeText={onChange}
                      error={error?.message}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  )}
                />
              </>
            )}
          </>
        )}

        <Button
          tw="mt-8"
          size="regular"
          disabled={!isEmailVerified && (isVerifying || !email)}
          onPress={
            isEmailVerified 
              ? handleNext 
              : (isOtpSent ? handleSubmit(handleVerifyOTP) : handleSendOTP)
          }
        >
          {isVerifying ? (
            <Spinner size="small" />
          ) : (
            <Text>
              {isEmailVerified 
                ? "Continue" 
                : (isOtpSent ? "Verify Code" : "Send Code")}
            </Text>
          )}
        </Button>

        {/* Add skip button if email is verified */}
        {isEmailVerified && (
          <View tw="mt-4">
            <Text tw="text-center text-sm text-gray-500 dark:text-gray-400">
              Your email is already verified. You can continue to the next step.
            </Text>
          </View>
        )}
      </View>
    </MotiView>
  );
};
