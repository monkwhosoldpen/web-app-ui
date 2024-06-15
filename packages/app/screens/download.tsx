import { Suspense } from "react";

import { Spinner } from "@showtime-xyz/universal.spinner";
import { View } from "@showtime-xyz/universal.view";

import { ErrorBoundary } from "app/components/error-boundary";
import { withColorScheme } from "app/components/memo-with-theme";
import { useTrackPageViewed } from "app/lib/analytics";

const DownloadScreen = withColorScheme(() => {
  useTrackPageViewed({ name: "Download" });
  return (
    <View tw="w-full flex-1 bg-white dark:bg-black">
      <View tw="md:max-w-screen-content mx-auto w-full flex-1 bg-white dark:bg-black md:px-6">
        <ErrorBoundary>
          <Suspense
            fallback={
              <View tw="mt-10 items-center justify-center">
                <Spinner size="small" />
              </View>
            }
          >
            {/* <Download /> */}
          </Suspense>
        </ErrorBoundary>
      </View>
    </View>
  );
});

export { DownloadScreen };
