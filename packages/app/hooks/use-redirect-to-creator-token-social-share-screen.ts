import { Platform } from "react-native";

import { useRouter } from "@showtime-xyz/universal.router";

export const useRedirectToCreatorTokenSocialShare = () => {
  const router = useRouter();

  const redirectToCreatorTokenSocialShare = async (username?: string) => {
    const as = `/creator-token/${username}/manifesto`;

    router.push(
      Platform.select({
        native: as,
        web: {
          pathname: router.pathname,
          query: {
            ...router.query,
            username,
            manifestoModal: true,
          },
        } as any,
      }),
      Platform.select({ native: as, web: router.asPath }),
      {
        shallow: true,
      }
    );
  };

  return redirectToCreatorTokenSocialShare;
};

export const useRedirectToChooseLocation = () => {
  const router = useRouter();

  const redirectToChooseLocation = async () => {
    const as = `/choose-location`;

    router.push(
      Platform.select({
        native: as,
        web: {
          pathname: router.pathname,
          query: {
            ...router.query,
            chooseLocationModal: true,
          },
        } as any,
      }),
      Platform.select({ native: as, web: router.asPath }),
      {
        shallow: true,
      }
    );
  };

  return redirectToChooseLocation;
};


export const useRedirectToSuperMenu = () => {
  const router = useRouter();

  const redirectToSuperMenu = async () => {
    const as = `/supermenu`;
    router.push(as);
  };

  return redirectToSuperMenu;
};
