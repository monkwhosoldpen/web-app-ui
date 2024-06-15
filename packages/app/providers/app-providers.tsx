import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AlertProvider } from "@showtime-xyz/universal.alert";
import { BottomSheetModalProvider } from "@showtime-xyz/universal.bottom-sheet";
import { ColorSchemeProvider } from "@showtime-xyz/universal.color-scheme";
import { LightBoxProvider } from "@showtime-xyz/universal.light-box";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "@showtime-xyz/universal.safe-area";
import { SnackbarProvider } from "@showtime-xyz/universal.snackbar";

import { ReactionProvider } from "app/components/reaction/reaction-provider";
import { KeyboardProvider } from "app/lib/keyboard-controller";
import { NavigationProvider } from "app/navigation";
import { AuthProvider } from "app/providers/auth-provider";
import { ClaimProvider } from "app/providers/claim-provider";
import { DropProvider } from "app/providers/drop-provider";
import { FeedProvider } from "app/providers/feed-provider";
import { MuteProvider } from "app/providers/mute-provider";
import { SWRProvider } from "app/providers/swr-provider";
import { UserProvider } from "app/providers/user-provider";
import { I18nextProvider } from 'react-i18next';
import ii18 from './i18-config';
import { AppStateProvider } from "./app-state-provider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nextProvider i18n={ii18}>
      <GestureHandlerRootView style={{ flexGrow: 1 }}>
        <KeyboardProvider statusBarTranslucent>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ColorSchemeProvider>
              <ReactionProvider>
                {/* <WalletMobileSDKProvider> */}
                {/* <Web3Provider> */}
                {/* <WalletProvider> */}
                <AlertProvider>
                  <LightBoxProvider>
                    <SnackbarProvider>
                      <NavigationProvider>
                        <SWRProvider>
                          <AuthProvider>
                            <AppStateProvider>
                              <UserProvider>
                                <BottomSheetModalProvider>
                                  {/* @ts-ignore */}
                                  <FeedProvider>
                                    <MuteProvider>
                                      <>
                                        <>
                                          {children}
                                        </>
                                      </>
                                    </MuteProvider>
                                  </FeedProvider>
                                </BottomSheetModalProvider>
                              </UserProvider>
                            </AppStateProvider>
                          </AuthProvider>
                        </SWRProvider>
                      </NavigationProvider>
                    </SnackbarProvider>
                  </LightBoxProvider>
                </AlertProvider>
                {/* </WalletProvider> */}
                {/* </Web3Provider> */}
                {/* </WalletMobileSDKProvider> */}
              </ReactionProvider>
            </ColorSchemeProvider>
          </SafeAreaProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
};
