import { useEffect } from "react";
import { AppState, LogBox } from "react-native";

import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { enableFreeze, enableScreens } from "react-native-screens";

import { useExpoUpdate } from "app/hooks/use-expo-update";
import { Logger } from "app/lib/logger";
import { RootStackNavigator } from "app/navigation/root-stack-navigator";
import { AppProviders } from "app/providers/app-providers";

enableScreens(true);
enableFreeze(true);

SplashScreen.preventAutoHideAsync().catch(() => {
  // in very rare cases, preventAutoHideAsync can reject, this is a best effort
});

LogBox.ignoreLogs([
  "Constants.deviceYearClass",
  "No native splash screen",
  "The provided value 'ms-stream' is not a valid 'responseType'.",
  "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property.",
  "ExponentGLView",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components",
  "Sending `onAnimatedValueUpdate` with no listeners registered.", // `react-native-tab-view` waring issue.
  "Did not receive response to shouldStartLoad in time", // warning from @magic-sdk/react-native's react-native-webview dependency. https://github.com/react-native-webview/react-native-webview/issues/124,
  "Looks like you're trying",
]);

function App() {
  // check for updates as early as possible
  useExpoUpdate();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const scheduleGC = () => {
      timeoutId = setInterval(() => {
        setImmediate(() => {
          globalThis?.gc?.();
        });
      }, 60_000);
    };

    scheduleGC();

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  // Handle push notifications
  useEffect(() => {
    // a memory warning listener for free up FastImage Cache
    const memoryWarningSubscription = AppState.addEventListener(
      "memoryWarning",
      () => {
        async function clearFastImageMemory() {
          try {
            await Image.clearMemoryCache();
            Logger.log("did receive memory warning and cleared");
          } catch {
            // ignore
          }
        }
        clearFastImageMemory();
      }
    );
    return () => {
      memoryWarningSubscription.remove();
    };
  }, []);

  useEffect(() => {
    AvoidSoftInput.setEnabled(true);

    return () => {
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  return (
    <AppProviders>
      <></>
      {/* <View>
      <Text>
        Hello world 1234
      </Text>
    </View> */}
      <RootStackNavigator />
    </AppProviders>
  );
}

export default App;
