import { View } from "@showtime-xyz/universal.view";

import { withColorScheme } from "app/components/memo-with-theme";
import { useEffect } from "react";
import { useState } from 'react';
import React, { } from 'react';
import { OpenedInPWA } from "app/components/openedinpwa";
import { OpenInBrowser } from "app/components/openinbrowser";

const SuperMenuScreen = withColorScheme(() => {

  const [device_type, setdevice_type] = useState<any>(null);
  const [isInBrowser, setIsInBrowser] = useState<any>(false);

  function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if (navigator.standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  }

  useEffect(() => {
    const value = getPWADisplayMode();
    setdevice_type(value);
    if (value == 'browser') {
      setIsInBrowser(true);
    }
  }, []);

  return (
    <>
      {/* <View tw="w-full items-center border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:border-l">
        <View tw="min-h-screen w-full">
          <View tw='px-0'>
            {
              device_type == 'browser' && <><OpenInBrowser /></>
            }
            {
              device_type == 'standalone' && <><OpenedInPWA /></>
            }
          </View>
        </View>
      </View> */}
    </>
  );
});

export { SuperMenuScreen };
