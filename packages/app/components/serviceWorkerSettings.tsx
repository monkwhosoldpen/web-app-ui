'use client'
import { CONFIG } from 'app/lib/config'
import { Button } from '@showtime-xyz/universal.button'

import React from 'react';
import { useEffect, useState } from 'react';

import { useAuth } from "app/hooks/auth/use-auth";

import { Alert } from "@showtime-xyz/universal.alert";
import { View } from '@showtime-xyz/universal.view';
import { Text } from '@showtime-xyz/universal.text';

const notificationsSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

export function ShowPermissionsNotifications() {

  // Inside your PWANotifications component, before the return statement
  const [isOpenedInPwa, setIsOpenedInPwa] = useState<any>(0);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsOpenedInPwa(1);
      console.log("App is running in standalone mode. Hide download/install prompts.");
    }
  }, []);

  const [permission, setPermission] = useState(
    window?.Notification?.permission || 'default'
  )

  if (!notificationsSupported()) {
    return (
      <Text>Please install this app on your home screen first!</Text>
    );
  }

  const requestPermission = async () => {
    if (!notificationsSupported()) {
      return;
    }
    const receivedPermission = await window?.Notification.requestPermission()
    setPermission(receivedPermission)
    if (receivedPermission === 'granted') {
      subscribe(accessToken);
    }
  }
  const { accessToken } = useAuth();

  return (
    <>
      <View tw="mt-4 px-4 md:mt-4 md:px-0">
        <>
          {
            permission === 'denied' &&
            <>
              <Text>Please reset your notifications using this link. Contact us for help.</Text>
            </>
          }
          {
            permission === 'granted' &&
            <>
              <Text>Success</Text>
            </>
          }
          {
            permission === 'default' &&
            <>
              <View tw="mb-2 mt-0 rounded-xl border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <View tw="items-center gap-2">
                  <Text>You must allow permissions</Text>
                  <Button
                    tw='my-2'
                    onPress={requestPermission}>
                    Allow Permissions
                  </Button>
                </View>
              </View>
            </>
          }
        </>
      </View>
    </>
  )
}
// Assume Service Worker is already registered and swRegistration is available
const subscribe = async (accessToken: any) => {
  // Check if the service worker is ready before attempting to subscribe
  navigator.serviceWorker.ready.then(async (swRegistration) => {
    try {
      const options = {
        applicationServerKey: CONFIG.PUBLIC_KEY,
        userVisibleOnly: true,
      };
      // const subscription = await swRegistration.pushManager.subscribe(options);
      // await saveSubscription(subscription, accessToken); // Save the subscription to your backend
      Alert.alert('Success', 'You are now subscribed to notifications.');
    } catch (error) {
      console.error('Subscription failed:', error);
      Alert.alert('Subscription Error', 'Failed to subscribe for notifications.');
    }
  }).catch((error) => {
    console.error('Service Worker not ready:', error);
    Alert.alert('Service Worker Error', 'The Service Worker is not ready.');
  });
};

const saveSubscription = async (subscription: PushSubscription, accessToken: any) => {
  const ORIGIN = 'https://push.goatsconnect.com';
  const BACKEND_URL = `${ORIGIN}/api/push`;

  const response = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(subscription),
  })
  return response.json();
}