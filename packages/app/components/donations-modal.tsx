import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import React from 'react';
import { Onboarding } from "./onboarding";

export const DonationsModal = () => {
  return (
    <BottomSheetModalProvider>
      <Onboarding />
    </BottomSheetModalProvider>
  );
};
