import { Platform } from "react-native";

import Constants from "expo-constants";

import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { Text } from "@showtime-xyz/universal.text";

import { useHandleNotification } from "app/hooks/use-handle-notification";
import { useNetWorkConnection } from "app/hooks/use-network-connection";
import { screenOptions } from "app/navigation/navigator-screen-options";

import { LoginScreen } from "app/screens/login";
import { NotificationSettingsScreen } from "app/screens/notification-settings";
// import { PayoutsSetupScreen } from "app/screens/payouts/setup";
import { PrivacySecuritySettingsScreen } from "app/screens/privacy-and-security-settings";
import { ProfileScreen } from "app/screens/profile";
import { ReportScreen } from "app/screens/report";
import { EditPreferencesScreen } from "app/screens/edit-preferences";
import { SearchScreen } from "app/screens/search";
import { SettingsScreen } from "app/screens/settings";

import packageJson from "../../../package.json";
import { OnboardingScreen } from "../screens/onboarding";
import { BottomTabNavigator } from "./bottom-tab-navigator";
import { createStackNavigator } from "./create-stack-navigator";
import { RootStackNavigatorParams } from "./types";
import { Messages } from "app/components/creator-channels/messages";
import { CreatorChannelsSettingsScreen } from "app/screens/creator-channels-settings";
import { CreatorTokensExplanationScreen } from "app/screens/creator-tokens-explanation";
import { DonationsScreen } from "app/screens/donations";
import { ManifestoScreen } from "app/screens/manifesto";
import { ExploreScreen } from "app/screens/explore";
import { HeaderLeft } from "app/components/header";
import { HeaderRightSm } from "app/components/header/header-right.sm";
import { View } from "@showtime-xyz/universal.view";

const Stack = createStackNavigator<RootStackNavigatorParams>();

const HeaderLeftC = () => {
  return <HeaderLeft />;
};

const HeaderRightC = () => {
  return <HeaderRightSm />;
};

const HeaderCentreC = () => {
  return <View />;
};

export function RootStackNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  useNetWorkConnection();
  useHandleNotification();
  const isDark = useIsDarkMode();

  return (
    <Stack.Navigator>
      {/* Bottom tab navigator */}
      <Stack.Screen
        name="bottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {/* Screens without default header */}
      <Stack.Group
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true,
          animationDuration: Platform.OS === "ios" ? 400 : undefined,
          animation: Platform.OS === "android" ? "fade_from_bottom" : "default",
          statusBarStyle: isDark ? "light" : "dark",
        }}
      >
        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{
            animation: Platform.OS === "android" ? "fade_from_bottom" : "fade",
            animationDuration: 200,
          }}
        />

        <Stack.Screen name="channelsMessage" component={Messages} />

        {/* <Stack.Screen
          name="creatorTokensShare"
          component={CreatorTokensShareModalScreen}
          options={{
            animation:
              Platform.OS === "android"
                ? "fade_from_bottom"
                : "slide_from_bottom",
            animationDuration: 200,
          }}
        /> */}
      </Stack.Group>

      {/* Screens accessible in most of the navigators */}
      <Stack.Group screenOptions={screenOptions({ safeAreaTop, isDark, headerRight: HeaderRightC, headerLeft: HeaderLeftC })}>

        <Stack.Screen
          name="profile"
          component={ProfileScreen}
          getId={({ params }) => params?.username}
          options={{
            animation: Platform.OS === "android" ? "fade_from_bottom" : "fade",
            animationDuration: 200,
          }}
        />

        <Stack.Screen
          name="settings"
          component={SettingsScreen}
        />

        <Stack.Screen name="creatorTokensView" component={ExploreScreen} />

        <Stack.Screen
          name="privacySecuritySettings"
          component={PrivacySecuritySettingsScreen}
        />

        <Stack.Screen
          name="notificationSettings"
          component={NotificationSettingsScreen}
        />

        {/* <Stack.Screen
          name="channelsMessageReactions"
          component={CreatorChannelsMessageReactionsScreen}
        /> */}
        {/* <Stack.Screen
          name="trending"
          options={{ headerTitle: "Leaderboard" }}
          component={TrendingScreen}
        /> */}
        {/* <Stack.Screen
          name="creatorTokenCollected"
          options={{ headerTitle: "Creator Tokens Collected" }}
          component={CreatorTokenCollectedScreen}
        />
        <Stack.Screen
          name="creatorTokenCollectors"
          options={{ headerTitle: "Creator Tokens Collectors" }}
          component={CreatorTokenCollectorsScreen}
        /> */}
      </Stack.Group>

      {/* Modals */}
      <Stack.Group
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "default" : "none",
          presentation: Platform.OS === "ios" ? "modal" : "transparentModal",
        }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="onboarding" component={OnboardingScreen} />
        <Stack.Screen name="manifesto" component={ManifestoScreen} />
        <Stack.Screen name="donate" component={DonationsScreen} />
        {/* <Stack.Screen name="editProfile" component={EditProfileScreen} /> */}
        {/* <Stack.Screen name="addEmail" component={AddEmailScreen} />
        <Stack.Screen
          name="verifyPhoneNumber"
          component={VerifyPhoneNumberScreen}
        /> */}
        {/* <Stack.Screen name="payoutsSetup" component={PayoutsSetupScreen} /> */}
        {/* <Stack.Screen name="qrCodeShare" component={QRCodeShareScreen} /> */}

        {/* <Stack.Screen
          name="channelsIntro"
          options={{ gestureEnabled: false }}
          component={CreatorChannelsIntroScreen}
        />
        <Stack.Screen
          name="channelsCongrats"
          component={CreatorChannelsCongratsScreen}
        /> */}
        {/* <Stack.Screen
          name="channelsShare"
          component={CreatorChannelsShareScreen}
        /> */}
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          animation: "none",
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen name="report" component={ReportScreen} />
        <Stack.Screen name="editPreferences" component={EditPreferencesScreen} />
        <Stack.Screen
          name="channelsSettings"
          component={CreatorChannelsSettingsScreen}
        />
        <Stack.Screen
          name="creatorTokensExplanation"
          component={CreatorTokensExplanationScreen}
        />
        {/* <Stack.Screen
          name="enterInviteCode"
          component={EnterInviteCodeModalScreen}
        />
        <Stack.Screen
          name="creatorTokenInviteSignIn"
          component={CreatorTokenInviteSignInScreen}
        />
        <Stack.Screen
          name="creatorTokensImportAllowlist"
          component={CreatorTokensImportAllowlistScreen}
        />
        <Stack.Screen
          name="creatorTokenSocialShare"
          component={CreatorTokenSocialShareScreen}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
}
