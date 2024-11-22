import React, { useContext, useEffect, useState } from "react";
import { MotiView } from "moti";
import { View } from "@showtime-xyz/universal.view";
import { Text } from "@showtime-xyz/universal.text";
import { Button } from "@showtime-xyz/universal.button";
import { Logger } from "app/lib/logger";

import { OnboardingStepContext } from "./onboarding-context";
import { OnboardingStep } from "./onboarding-types";
import { supabase } from "app/providers/utils/supabaseClient";
import { useAuth } from "app/hooks/auth/use-auth";
import { LoginButtonGuest } from "../login/login-button-guest";
import { LOGIN_MAGIC_ENDPOINT } from "../login/login-with-guest";
import { useUser } from "app/hooks/use-user";

export const SelectPreferences = () => {
  const { setStep } = useContext(OnboardingStepContext);
  const { logout, setAuthenticationStatus, login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    // const checkSession = async () => {
    //   const { data: { session } } = await supabase.auth.getSession();
    //   setIsLoggedIn(!!session);
    // };
    const isAuthenticated = user?.data?.profile?.role === 'authenticated';
    setIsLoggedIn(isAuthenticated);
    // checkSession();
  }, [user]);

  const handleNext = () => {
    setStep(OnboardingStep.Social);
  };

  const handleGuestLogin = async () => {
    try {
      setAuthenticationStatus("AUTHENTICATING");
      const { data, error } = await supabase
        .auth
        .signInAnonymously({
          options: {
            data: {
              captcha_completed_at: null,
              channels: []
            }
          },
        });

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!session) throw new Error("No session found after verification");

      const user = await login(LOGIN_MAGIC_ENDPOINT, {
        did: data?.user?.id,
        provider_access_token: data?.session?.access_token,
        data: data,
        error: error
      });
      handleNext();
    } catch (e) {
      Logger.error(e);
      logout();
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      exitTransition={{ type: "timing", duration: 600 }}
      style={{ flex: 1 }}
    >
      <View tw="flex-1 px-4">
        {isLoggedIn ? (
          <View tw="items-center justify-center flex-1">
            <Text tw="text-lg text-gray-900 dark:text-gray-100 mb-4">
              You are already logged in. Please continue to the next step.
            </Text>
            <Button
              onPress={handleNext}
              tw="w-full max-w-sm my-1 mt-4"
              variant="primary"
              size="regular"
            >
              Continue
            </Button>
          </View>
        ) : (
          <View tw="">
            <View tw="flex-1 items-center justify-center">
              <View tw="w-full max-w-sm">
                <LoginButtonGuest
                  type="guest"
                  onPress={handleGuestLogin}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </MotiView>
  );
};
