import { withModalScreen } from "@showtime-xyz/universal.modal-screen";
import { DonationsModal } from "app/components/donations-modal";

export const DonationsScreen = withModalScreen(DonationsModal, {
  title: "Donate",
  matchingPathname: "/creator-token/:username/donate",
  matchingQueryParam: "donationsModal",
  snapPoints: ["90%"],
  useNativeModal: false,
});
