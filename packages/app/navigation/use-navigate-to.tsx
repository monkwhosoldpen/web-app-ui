import { Platform } from "react-native";

import { useRouter } from "@showtime-xyz/universal.router";

import { NFT } from "app/types";

export const useNavigateToLogin = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push(
      Platform.select({
        native: "/login",
        // @ts-ignore
        web: {
          pathname: router.pathname,
          query: { ...router.query, loginModal: true },
        },
      }),
      Platform.select({
        native: "/login",
        web: router.asPath === "/" ? "/login" : router.asPath,
      }),
      { shallow: true }
    );
  };

  return navigateToLogin;
};

type NavigateToOnboardingParams = {
  replace?: boolean;
};

export const useNavigateToOnboarding = () => {
  const router = useRouter();
  const navigateToOnboarding = (params?: NavigateToOnboardingParams) => {
    if (params?.replace) {
      router.replace("/profile/onboarding");
    } else {
      // TODO: rewrite the way we handle modals, if we don't remove the below param, login modal will stay mounted
      delete router.query.loginModal;
      router.push(
        Platform.select({
          native: "/profile/onboarding",
          web: {
            pathname: router.pathname,
            query: {
              ...router.query,
              onboardingModal: true,
            },
          } as any,
        }),
        Platform.select({
          native: "/profile/onboarding",
          web: router.asPath,
        })
      );
    }
  };

  return navigateToOnboarding;
};
