import { useWindowDimensions } from "react-native";

import { breakpoints } from "design-system/theme";

import { withColorScheme } from "../memo-with-theme";
import { HeaderMd } from "./header.md.web";
import { HeaderSm } from "./header.sm.web";

// import OneSignal from 'react-onesignal'
// const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!
import React, { useEffect, useState } from 'react'
import { useMyInfo } from "app/hooks/api-hooks";

export const Header = withColorScheme(() => {
  const { width } = useWindowDimensions();
  const isMdWidth = width >= breakpoints["md"];

  // const [user, setUser] = useState<any | null>(null)

  // const [oneSignalInitialized, setOneSignalInitialized] =
  //   useState<boolean>(false)

  // /**
  //  * Initializes OneSignal SDK for a given Supabase User ID
  //  * @param uid Supabase User ID
  //  */
  // const initializeOneSignal = async (uid: string) => {
  //   if (oneSignalInitialized) {
  //     return
  //   }
  //   setOneSignalInitialized(true)
  //   await OneSignal.init({
  //     appId: oneSignalAppId,
  //     safari_web_id: "web.onesignal.auto.0dd8fdab-49d8-437b-ac06-36c9d15991be",
  //     notifyButton: {
  //       enable: false,
  //     },
  //     allowLocalhostAsSecureOrigin: true,
  //   })

  //   // await OneSignal.setExternalUserId(uid)
  // }

  // const { data: myInfoData } = useMyInfo();

  // useEffect(() => {
  //   const uid = myInfoData?.data?.profile.uid;
  //   if (uid) {
  //     initializeOneSignal(uid)
  //   }
  // }, [myInfoData]);

  // useEffect(() => {
  //   const uid = myInfoData?.data?.profile.uid;
  //   if (uid) {
  //     initializeOneSignal(uid)
  //   }
  // }, [[]]);


  if (isMdWidth) {
    return <HeaderMd />;
  }
  return <HeaderSm />;
});
