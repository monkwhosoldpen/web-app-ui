import { withModalScreen } from "@showtime-xyz/universal.modal-screen";

import { SetPreferences } from "app/components/set-preferences";
import { useTrackPageViewed } from "app/lib/analytics";

function EditPreferencesModal() {
  useTrackPageViewed({ name: "Edit Preferences" });
  return (
    <>
      <SetPreferences />
    </>
  );
}

export const EditPreferencesScreen = withModalScreen(EditPreferencesModal, {
  title: "Set Location",
  matchingPathname: "/editPreferences",
  matchingQueryParam: "editPreferencesModal",
  snapPoints: ["50%"],
  tw: "w-full",
  disableBackdropPress: true,
});
