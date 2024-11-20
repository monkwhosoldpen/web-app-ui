import { withModalScreen } from "@showtime-xyz/universal.modal-screen";

import { OnboardingFan } from "app/components/onboarding-fan";
import { useTrackPageViewed } from "app/lib/analytics";
import { createParam } from "app/navigation/use-param";

type Query = {
  username: string;
  type: any;
};

const { useParam } = createParam<Query>();

export const OnboardingPage = () => {
  const [channelId] = useParam("channelId");
  useTrackPageViewed({ name: "Onboarding Fan" });
  return <OnboardingFan channelId={channelId} />;
};
export const OnboardingFanScreen = withModalScreen(OnboardingPage, {
  title: "Onboarding Fan",
  matchingPathname: "/profile/onboarding-fan",
  matchingQueryParam: "onboardingFanModal",
  enableContentPanningGesture: true,
  enableHandlePanningGesture: true,
  headerShown: true,
  snapPoints: ["100%"],
  disableBackdropPress: false,
  backPressHandlerEnabled: true,
});
