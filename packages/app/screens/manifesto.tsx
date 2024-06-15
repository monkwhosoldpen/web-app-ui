import { withModalScreen } from "@showtime-xyz/universal.modal-screen";
import { ManifestoModal } from "app/components/manifesto-modal";

export const ManifestoScreen = withModalScreen(ManifestoModal, {
  title: "",
  matchingPathname: "/creator-token/:username/manifesto",
  matchingQueryParam: "manifestoModal",
  snapPoints: ["60%"],
  useNativeModal: false,
});
