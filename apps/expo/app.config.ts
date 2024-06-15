import type { ExpoConfig } from "@expo/config-types";
import { ExportedConfigWithProps } from "expo/config-plugins";

const originalLog = console.log;
console.log = () => { };

const STAGE = process.env.NODE_ENV ?? "development";
// @ts-expect-error: invalid type declaration, process is mutable in Node.js environments.
process.env.NODE_ENV = STAGE;

const { withInfoPlist } = require("@expo/config-plugins");

type EnvConfig = {
  [key: string]: {
    scheme: string;
    icon: string;
    foregroundImage: string;
    backgroundImage: string;
  };
};

const url = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

const packageJSON = require("../../package.json");

const semver = require("semver");
require("@expo/env").load(__dirname);

console.log = originalLog;

const SCHEME = process.env.SCHEME ?? "io.netaconnect";

const envConfig: EnvConfig = {
  development: {
    scheme: `${SCHEME}.development`,
    icon: "./assets/icon.development.png",
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundImage: "./assets/adaptive-icon-background.development.png",
  },
  staging: {
    scheme: `${SCHEME}.staging`,
    icon: "./assets/icon.staging.png",
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundImage: "./assets/adaptive-icon-background.staging.png",
  },
  production: {
    scheme: SCHEME,
    icon: "./assets/icon.png",
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundImage: "./assets/adaptive-icon-background.png",
  },
};

const config = envConfig[STAGE];
const version = packageJSON.version;
const majorVersion = semver.major(version);

const expoConfig: ExpoConfig = {
  name: "netaconnect",
  description: "The n verse",
  slug: "nconnect",
  scheme: config.scheme,
  owner: "nconnect",
  icon: config.icon,
  version: version.toString(),
  userInterfaceStyle: "automatic",
  "jsEngine": "hermes",
  ios: {
    bundleIdentifier: config.scheme,
    buildNumber: majorVersion.toString(),
    supportsTablet: false, // TODO:
    jsEngine: "hermes",
    backgroundColor: "#FFFFFF",
    config: {
      usesNonExemptEncryption: false,
    },
    bitcode: false, // or "Debug",
    associatedDomains: [`applinks:${url}`],
    splash: {
      image: "./assets/splash-ios.png",
      resizeMode: "cover",
    },
  },
  android: {
    package: config.scheme,
    versionCode: majorVersion,
    splash: {
      image: "./assets/splash-android.png",
      resizeMode: "cover",
    },
    adaptiveIcon: {
      foregroundImage: config.foregroundImage,
      backgroundImage: config.backgroundImage,
      monochromeImage: "./assets/mono-icon.png",
    },
    jsEngine: "hermes",
    softwareKeyboardLayoutMode: "resize",
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            host: `*.${url}`,
            pathPrefix: "/",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
      {
        action: "VIEW",
        category: ["BROWSABLE", "DEFAULT"],
        data: {
          scheme: config.scheme,
        },
      },
    ],
    googleServicesFile: STAGE === "production" ? "" : "",
  },
  androidNavigationBar: {
    barStyle: "dark-content",
    backgroundColor: "#FFFFFF",
  },
  androidStatusBar: {
    backgroundColor: "#00000000",
    barStyle: "light-content",
  },
  notification: {
    icon: "./assets/notification-icon.png",
    color: "#F1C972",
  },
  assetBundlePatterns: ["**/*"],
  orientation: "portrait",
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/9acd4151-02b4-429b-bec6-79ee16d70314",
  },
  // We use the major version for the runtime version so it's in sync
  // with the native app version and should prevent us from sending an update
  // without the correct native build.
  // Learn more: https://docs.expo.dev/eas-update/runtime-versions
  runtimeVersion: majorVersion.toString(),
  extra: {
    STAGE: STAGE,
    eas: {
      projectId: "9acd4151-02b4-429b-bec6-79ee16d70314",
    },
  },
  plugins: [
    [
      "expo-media-library",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
        savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
        isAccessMediaLocationEnabled: true,
      },
    ],
    "expo-localization",
    [
      "expo-image-picker",
      {
        photosPermission:
          "$(PRODUCT_NAME) needs to access your camera roll so that you can upload photos on Showtime.",
      },
    ],
    [
      "./plugins/with-pick-first.js",
      {
        paths: [
          "lib/**/libreactnativejni.so",
          "lib/**/libreact_nativemodule_core.so",
          "lib/**/libfbjni.so",
          "lib/**/libturbomodulejsijni.so",
          "lib/**/libcrypto.so",
          "lib/**/libssl.so",
        ],
      },
    ],
    "./plugins/with-android-manifest.js",
    "./plugins/with-hermes-ios-m1-workaround.js",
    "sentry-expo",
    "./plugins/with-spotify-sdk.js",
    "./plugins/with-android-splash-screen.js",
    "./plugins/with-disabled-force-dark-mode.js",
    [
      withInfoPlist,
      (config: ExportedConfigWithProps) => {
        if (!config.modResults) {
          config.modResults = {};
        }
        config.modResults = {
          ...config.modResults,
          // Enable 120 FPS animations
          CADisableMinimumFrameDurationOnPhone: true,
          // let RNS handle status bar management
          UIViewControllerBasedStatusBarAppearance: true,
          UISupportedInterfaceOrientations: ["UIInterfaceOrientationPortrait"],
          LSApplicationQueriesSchemes: [
            "mailto",
            "instagram",
            "instagram-stories",
            "fb",
            "facebook-stories",
            "twitter",
          ],
        };
        return config;
      },
    ],
    [
      "@bacons/link-assets",
      [
        "./assets/fonts/Inter-Bold.otf",
        "./assets/fonts/Inter-Medium.otf",
        "./assets/fonts/Inter-Regular.otf",
        "./assets/fonts/Inter-SemiBold.otf",
      ],
    ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          minSdkVersion: 23,
          buildToolsVersion: "33.0.0",
          kotlinVersion: "1.8.0",
          unstable_networkInspector: true,
        },
        ios: {
          deploymentTarget: "13.0",
          unstable_networkInspector: true,
        },
      },
    ],
  ],
  hooks: {
    postPublish: [
      // {
      //   file: "sentry-expo/upload-sourcemaps",
      //   config: {
      //     organization: "showtime-l3",
      //     project: "showtime-mobile",
      //     authToken: process.env.SENTRY_AUTH_TOKEN,
      //   },
      // },
    ],
  },
};

export default expoConfig;
