import { useUser } from "app/hooks/use-user";
import { CreatorChannels } from "app/components/creator-channels";

import { Suspense } from "react";

import { Spinner } from "@showtime-xyz/universal.spinner";
import { View } from "@showtime-xyz/universal.view";

import { ErrorBoundary } from "app/components/error-boundary";
import { withColorScheme } from "app/components/memo-with-theme";
import { useTrackPageViewed } from "app/lib/analytics";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const CreatorChannelsScreen = withColorScheme(() => {
  const { } = useUser({
    // redirectTo: "/login",
    redirectIfProfileIncomplete: true,
  });
  useTrackPageViewed({ name: "CreatorChannels" });
  return (
    <BottomSheetModalProvider>
      <ErrorBoundary>
        <CreatorChannels username={""} />
      </ErrorBoundary>
    </BottomSheetModalProvider>
  );
});

export { CreatorChannelsScreen };
