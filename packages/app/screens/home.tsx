import { ErrorBoundary } from "app/components/error-boundary";
import { withColorScheme } from "app/components/memo-with-theme";
import { useTrackPageViewed } from "app/lib/analytics";
import { HomeV2 } from "app/components/homev2";

const HomeScreen = withColorScheme(() => {
  useTrackPageViewed({ name: "HomeV2" });
  return (
    <>
      <ErrorBoundary>
        <HomeV2 />
      </ErrorBoundary>
    </>
  );
});

export { HomeScreen };
