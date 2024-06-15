import { StyleSheet } from "react-native";

import { PortalProvider } from "@gorhom/portal";
import { BottomSheetScrollView } from "app/components/bottom-sheet-scroll-view";

import { LoginComponent } from "./login";
import { useLogin } from "./use-login";

export function Login() {
  //#region hooks
  const {
    handleSubmitEmail,
    handleSubmitPhoneNumber,
    handleSubmitWallet,
    loading,
  } = useLogin();

  //#endregion

  //#endregion
  return (
    <PortalProvider>
      <BottomSheetScrollView style={styles.container}>
        <LoginComponent
          handleSubmitEmail={handleSubmitEmail}
          handleSubmitPhoneNumber={handleSubmitPhoneNumber}
          handleSubmitWallet={handleSubmitWallet}
          loading={loading}
        />
      </BottomSheetScrollView>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    minHeight: 400,
  },
  tabListItemContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flex: 1,
    paddingTop: 16,
  },
});
