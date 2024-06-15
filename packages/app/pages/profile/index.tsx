import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { View } from "@showtime-xyz/universal.view";

import { NotificationsSettingIcon } from "app/components/header/notifications-setting-icon";
import { createStackNavigator } from "app/navigation/create-stack-navigator";
import { screenOptions } from "app/navigation/navigator-screen-options";
import { ProfileStackParams } from "app/navigation/types";
import { NotificationsScreen } from "app/screens/notifications";
import { useUser } from "app/hooks/use-user";
import { ProfileScreen } from "app/screens/profile";
import { HeaderLeft, HeaderRight } from "app/components/header";
import HeaderCenter from "app/components/header/header-center";
import { HeaderRightSm } from "app/components/header/header-right.sm";

const ProfileStack = createStackNavigator<ProfileStackParams>();

const HeaderLeftC = () => {
  return <HeaderLeft />;
};

const HeaderRightC = () => {
  return <HeaderRightSm />;
};


const HeaderCentreC = () => {
  return <View />;
};


function ProfileNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const isDark = useIsDarkMode();
  const { user } = useUser();

  return (
    <ProfileStack.Navigator
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
      <ProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        initialParams={{
          // username: user?.data?.profile?.username,
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;