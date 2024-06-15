import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { View } from "@showtime-xyz/universal.view";
import { HeaderRightSm } from "app/components/header/header-right.sm";
import { HeaderLeft } from "app/components/header";

import { NotificationsSettingIcon } from "app/components/header/notifications-setting-icon";
import { createStackNavigator } from "app/navigation/create-stack-navigator";
import { screenOptions } from "app/navigation/navigator-screen-options";
import { NotificationsStackParams, RootStackNavigatorParams } from "app/navigation/types";
import { NotificationsScreen } from "app/screens/notifications";
import ExploreScreen from "./index.web";

const RootStack = createStackNavigator<RootStackNavigatorParams>();

const HeaderLeftC = () => {
  return <HeaderLeft />;
};

const HeaderRightC = () => {
  return <HeaderRightSm />;
};

const HeaderCentreC = () => {
  return <View />;
};

function ExploreNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const isDark = useIsDarkMode();

  return (
    <RootStack.Navigator
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
      <RootStack.Screen
        name="explore"
        component={ExploreScreen}
      />
    </RootStack.Navigator>
  );
}

export default ExploreNavigator;


