import { GrowthBookProvider } from "@growthbook/growthbook-react";
import dynamic from "next/dynamic";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@showtime-xyz/universal.bottom-sheet";
import { ColorSchemeProvider } from "@showtime-xyz/universal.color-scheme";
import { LightBoxProvider } from "@showtime-xyz/universal.light-box";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "@showtime-xyz/universal.safe-area";
import { SnackbarProvider } from "@showtime-xyz/universal.snackbar";

import { ReactionProvider } from "app/components/reaction/reaction-provider";
import { growthbook } from "app/lib/growthbook";
import { NavigationProvider } from "app/navigation";
import { AuthProvider } from "app/providers/auth-provider";
import { ClaimProvider } from "app/providers/claim-provider";
import { DropProvider } from "app/providers/drop-provider";
import { FeedProvider } from "app/providers/feed-provider";
import { MagicProvider } from "app/providers/magic-provider.web";
import { MuteProvider } from "app/providers/mute-provider";
import { SWRProvider } from "app/providers/swr-provider";
import { UserProvider } from "app/providers/user-provider";
import { AppStateProvider } from "./app-state-provider";
import { I18nextProvider } from 'react-i18next';
import ii18 from './i18-config';
import { useChannelsList } from "app/components/creator-channels/hooks/use-channels-list";

const AlertProvider = dynamic(() => import("@showtime-xyz/universal.alert"), {
  ssr: false,
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => {

  return (
    <GestureHandlerRootView>
      <ReactionProvider>
        <I18nextProvider i18n={ii18}>
          <>
            <ColorSchemeProvider>
              <SafeAreaProvider>
                <LightBoxProvider>
                  <>
                    <AlertProvider>
                      <SnackbarProvider>
                        <SWRProvider>
                          <>

                            <AuthProvider>
                              <UserProvider>
                                <AppStateProvider>

                                  <BottomSheetModalProvider>
                                    <FeedProvider>
                                      <NavigationProvider>
                                        <MuteProvider>
                                          <>
                                            <>{children}</>
                                          </>
                                        </MuteProvider>
                                      </NavigationProvider>
                                    </FeedProvider>
                                  </BottomSheetModalProvider>
                                </AppStateProvider>
                              </UserProvider>

                            </AuthProvider>

                          </>
                        </SWRProvider>
                      </SnackbarProvider>
                    </AlertProvider>
                  </>
                </LightBoxProvider>
              </SafeAreaProvider>
            </ColorSchemeProvider>
          </>
        </I18nextProvider>
      </ReactionProvider>
    </GestureHandlerRootView>
  );
};
