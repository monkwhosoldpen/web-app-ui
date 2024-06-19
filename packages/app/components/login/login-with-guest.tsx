
import { useRouter } from "@showtime-xyz/universal.router";

import { useAuth } from "app/hooks/auth/use-auth";


import { Logger } from "app/lib/logger";
import { isProfileIncomplete } from "app/utilities";

import { LoginButtonGuest } from "./login-button-guest";
import { supabase } from "app/providers/utils/supabaseClient";

export const LOGIN_MAGIC_ENDPOINT = "login_magic";

export const LoginWithGuest = () => {
  const { setAuthenticationStatus, login, logout } = useAuth();
  const router = useRouter();
  // const { performMagicAuthWithGoogle } = useMagicSocialAuth();
  // const { setWeb3 } = useWeb3();
  // const { magic } = useMagic();

  return (
    <LoginButtonGuest
      type="guest"
      onPress={async () => {
        try {
          setAuthenticationStatus("AUTHENTICATING");
          // const result = await performMagicAuthWithGoogle();
          // const idToken = result.magic.idToken;

          const { data, error } = await supabase
            .auth
            .signInAnonymously({
              options: {
                data: {
                  captcha_completed_at: null,
                }
              },
            });

          const user = await login(LOGIN_MAGIC_ENDPOINT, {
            did: data?.user?.id,
            provider_access_token: data?.session?.access_token,
            data: data,
            error: error
            // provider_scope: result.oauth.scope,
          });

          // const client = createWalletClient({
          //   chain: mainnet,
          //   transport: custom(magic.rpcProvider),
          // });

          // setWeb3({ ...client, isMagic: true });
          // when profile is incomplete, login will automatically redirect user to /profile/edit. So we don't need to redirect user to decodedURI
          if (!isProfileIncomplete(user.data.profile)) {
            router.pop();
          }
        } catch (e) {
          Logger.error(e);
          logout();
        }
      }}
    />
  );
};
