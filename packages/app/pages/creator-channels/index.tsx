import { Button } from "@showtime-xyz/universal.button";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useRouter } from "@showtime-xyz/universal.router";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { View } from "@showtime-xyz/universal.view";
import { HeaderLeft } from "app/components/header";
import { HeaderRightSm } from "app/components/header/header-right.sm";

import { useUser } from "app/hooks/use-user";
import { createStackNavigator } from "app/navigation/create-stack-navigator";
import { screenOptions } from "app/navigation/navigator-screen-options";
import { CreatorChannelsStackParams } from "app/navigation/types";
import { CreatorChannelsScreen } from "app/screens/creator-channels";

const CreatorChannelsStack = createStackNavigator<CreatorChannelsStackParams>();

const HeaderLeftC = () => {
  return <HeaderLeft />;
};

const HeaderRightC = () => {
  return <HeaderRightSm />;
};

const HeaderCentreC = () => {
  return <View />;
};

function CreatorChannelsNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const isDark = useIsDarkMode();

  return (
    <CreatorChannelsStack.Navigator
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
      <CreatorChannelsStack.Screen
        name="channels"
        component={CreatorChannelsScreen}
      />
    </CreatorChannelsStack.Navigator>
  );
}

export default CreatorChannelsNavigator;
