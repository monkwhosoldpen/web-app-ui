
import { Alert } from "@showtime-xyz/universal.alert";
import { useChannelsList } from "app/components/creator-channels/hooks/use-channels-list";
import { AppStateContext, UserContextType } from "app/context/app-state-context";
import { useMyInfo } from "app/hooks/api-hooks";
import { useUser } from "app/hooks/use-user";
import { useCallback, useEffect, useRef, useState, memo } from "react";

import OneSignal from 'react-onesignal';

const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!
const safaraiWebId = process.env.NEXT_PUBLIC_SAFARI_WEB_ID!

export const AppStateProvider = ({ children }: any) => {

  const [slug, setSlug] = useState<any>(null);
  const [eidEnabled, setEidEnabled] = useState<any>(null);

  const { data: fullData, refetchChannels } = useChannelsList({ pageSize: 20 });
  const { refetchMyInfo, data: myInfoData } = useMyInfo();

  useEffect(() => {
    // Initialize OneSignal
    OneSignal.init({
      appId: oneSignalAppId,
      safari_web_id: safaraiWebId,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: { enable: true }
    }).then(() => {
      console.log('OneSignal initialized');
      Alert.alert('Run', 'initialised oneSignal');
      // Check if user information is available and then set the external user ID
      const uid = myInfoData?.data?.profile?.uid;
      if (uid) {
        OneSignal.login(uid).then(() => {
          console.log('External user ID set');
          Alert.alert('Run', 'Set EID');
          // Perform any action after setting the external user ID, if necessary
        }).catch((error) => {
          console.error('Error setting external user ID:', error);
        });
      }
    }).catch((error) => {
      console.error('Error initializing OneSignal:', error);
    });
  }, [myInfoData?.data?.profile?.uid]); // Dependency array ensures this effect runs when user info changes


  useEffect(() => {
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      console.log("Notification incoming!", event);
      console.log(fullData);
      refetchChannels();
      setSlug(new Date());
    });
  }, []);

  // useEffect(() => {
  //   initOneSignal();
  // }, []);

  // useEffect(() => {
  //   const uid = myInfoData?.data?.profile?.uid;
  //   if (uid) {
  //     runOneSignal(uid);
  //   }
  // }, [refetchMyInfo]);

  // async function runOneSignal(uid: any) {
  //   await OneSignal.login(uid).then(() => {
  //     Alert.alert('Run', 'Set EID');
  //     setEidEnabled(true);
  //   });
  // }

  // async function initOneSignal() {
  //   await OneSignal.init({
  //     appId: oneSignalAppId,
  //     safari_web_id: safaraiWebId,
  //     allowLocalhostAsSecureOrigin: true,
  //     notifyButton: { enable: true }
  //   }).then(() => {
  //     Alert.alert('Run', 'initialised oneSignal');
  //   });
  // }

  // Depend on refreshTrigger to refetch channels list

  const userContextValue: UserContextType = {
    slug,
    setSlug: (value: any) => {
    },
  };

  return (
    <AppStateContext.Provider value={userContextValue}>
      {children}
    </AppStateContext.Provider>
  );
};