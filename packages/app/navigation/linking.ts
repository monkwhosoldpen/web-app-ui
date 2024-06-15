import * as Linking from "expo-linking";

import type { LinkingOptions } from "app/lib/react-navigation/native";
import { getStateFromPath } from "app/lib/react-navigation/native";

const url = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

const withRewrites = (unparsedPath: string): string => {
  if (unparsedPath.startsWith("/@")) {
    const username = unparsedPath.replace("/@", "").split("?")[0].split("/")[0];
    const rest = unparsedPath.replace(`/@${username}`, "");

    return `/profile/${username}${rest}`;
  }

  if (unparsedPath.startsWith("/t/")) {
    return unparsedPath.replace("/t/", "/nft/");
  }

  if (unparsedPath.startsWith("/token/")) {
    return unparsedPath.replace("/token/", "/nft/");
  }

  return unparsedPath;
};

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [
    Linking.createURL("/"),
    `https://${url}/`,
    `https://*.${url}/`,
    // http, including subdomains like www.
    `http://${url}/`,
    `http://*.${url}/`,
  ],
  config: {
    //@ts-ignore
    initialRouteName: "bottomTabs",
    screens: {
      login: "login",
      dropImageShare: "/drop-image-share/:contractAddress",
      search: "search",
      profile: "profile/:username",
      report: "report",
      manifesto: "creator-token/:username/manifesto",
      donate: "creator-token/:username/donate",
      onboarding: "profile/onboarding",
      settings: "settings",
      creatorTokensExplanation: "creator-token/explanation",
      creatorTokenSocialShare: "creator-token/:username/social-share",
      ChooseLocation: "/choose-location",
      creatorTokensSelfServeExplainer: "creator-token/self-serve-explainer",
      privacySecuritySettings: "settings/privacy-and-security",
      notificationSettings: "settings/notifications",
      channelsMessage: "creator-channels/:channelId",
      channelsSettings: "creator-channels/:channelId/settings",
      channelsShare: "creator-channels/:channelId/share",
      channelsMessageReactions:
        "creator-channels/:channelId/messages/:messageId/reactions",
      creatorTokensShare: "creator-token/:username/share",
      creatorTokensView: "profile/:username/:view",
      bottomTabs: {
        initialRouteName: "homeTab",
        screens: {
          // Bottom Tab Navigator
          homeTab: "",
          channelsTab: "creator-channels",
          notificationsTab: "notifications",
          profileTab: "profile",
        },
      },
    },
  },
  getStateFromPath(path, config) {
    const finalPath = withRewrites(path);

    return getStateFromPath(finalPath, config);
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    const initialURL = url ? new URL(url) : null;
    if (initialURL && false) {
      // URL handled by Wallet Mobile SDK
      return null;
    } else {
      if (url) {
        let urlObj = new URL(url);
        urlObj.pathname = withRewrites(urlObj.pathname);
        return urlObj.href;
      }

      return url;
    }
  },
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      // const handledByMobileSDK = handleResponse(new URL(url));
      // if (!handledByMobileSDK) {
      //   if (url) {
      //     let urlObj = new URL(url);
      //     urlObj.pathname = withRewrites(urlObj.pathname);
      //     listener(urlObj.href);
      //   } else {
      //     listener(url);
      //   }
      // }
    });

    return function cleanup() {
      linkingSubscription.remove();
    };
  },
};
