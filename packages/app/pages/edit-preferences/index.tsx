import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { View } from "@showtime-xyz/universal.view";
import { HeaderLeft } from "app/components/header";
import { HeaderRightSm } from "app/components/header/header-right.sm";

import { createStackNavigator } from "app/navigation/create-stack-navigator";
import { screenOptions } from "app/navigation/navigator-screen-options";
import { EditPreferencesStackParams } from "app/navigation/types";
import EditPreferencesScreen from "./index.web";

const EditPreferencesStack = createStackNavigator<EditPreferencesStackParams>();

const HeaderLeftC = () => {
  return <HeaderLeft />;
};

const HeaderRightC = () => {
  return <HeaderRightSm />;
};

const HeaderCentreC = () => {
  return <View />;
};

function EditPreferencesNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const isDark = useIsDarkMode();

  return (
    <EditPreferencesStack.Navigator
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
      <EditPreferencesStack.Screen
        name="preferences"
        component={EditPreferencesScreen}
      />
    </EditPreferencesStack.Navigator>
  );
}

export default EditPreferencesNavigator;
