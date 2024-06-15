import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { PortalProvider } from "@gorhom/portal";

import { useModalScreenContext } from "@showtime-xyz/universal.modal-screen";
import { ScrollView } from "@showtime-xyz/universal.scroll-view";
import { LoginComponent } from "./login";
import { useLogin } from "./use-login";
import { useTranslation } from "react-i18next";

export function Login() {
  const {
    handleSubmitEmail,
    handleSubmitPhoneNumber,
    handleSubmitWallet,
    loading,
  } = useLogin();
  //#endregion
  const modalScreenContext = useModalScreenContext();

  const { i18n, t } = useTranslation();
  const selectedLanguage = i18n.language;

  useEffect(() => {
    const title = t("signInTitle");
    modalScreenContext?.setTitle(title);
  }, [modalScreenContext, t]);

  return (
    <PortalProvider>
      <ScrollView style={styles.container}>
        <LoginComponent
          handleSubmitEmail={handleSubmitEmail}
          handleSubmitPhoneNumber={handleSubmitPhoneNumber}
          handleSubmitWallet={handleSubmitWallet}
          loading={loading}
        />
      </ScrollView>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  tabListItemContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flex: 1,
    paddingTop: 16,
  },
});
