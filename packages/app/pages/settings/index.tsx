import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { View } from "@showtime-xyz/universal.view";
import { HeaderLeft, HeaderRight, } from "app/components/header";
import HeaderCenter from "app/components/header/header-center";
import { HeaderRightSm } from "app/components/header/header-right.sm";

import { NotificationsSettingIcon } from "app/components/header/notifications-setting-icon";
import { createStackNavigator } from "app/navigation/create-stack-navigator";
import { screenOptions } from "app/navigation/navigator-screen-options";
import { NotificationsStackParams } from "app/navigation/types";
import { SettingsScreen } from "app/screens/settings";

const NotificationsStack = createStackNavigator<NotificationsStackParams>();

const HeaderLeftC = () => {
  return <HeaderLeft />;
};

const HeaderRightC = () => {
  return <HeaderRightSm />;
};

const HeaderCentreC = () => {
  return <View />;
};

function SettingssNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const isDark = useIsDarkMode();

  return (
    <NotificationsStack.Navigator
      // @ts-ignore
      screenOptions={screenOptions({
        safeAreaTop,
        isDark,
        headerCenter: HeaderCentreC,
        headerLeft: HeaderLeftC,
        headerRight: HeaderRightC,
      })}
    // screenOptions={{
    //   headerTitleStyle: {  },
    // }}
    >
      <NotificationsStack.Screen
        name="notifications"
        component={SettingsScreen}
      />
    </NotificationsStack.Navigator>
  );
}

export default SettingssNavigator;
