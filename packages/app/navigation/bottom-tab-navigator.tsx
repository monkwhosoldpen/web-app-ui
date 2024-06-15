import { useContext } from "react";
import { useWindowDimensions } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { UserContext } from "app/context/user-context";

import HomeNavigator from "app/pages/home";
import NotificationsNavigator from "app/pages/notifications";
import LoginNavigator from "app/pages/login";
import CreatorChannelsNavigator from "app/pages/creator-channels";

import SettingsNavigator from "app/pages/settings";

import SpaceNavigator from "app/pages/space";

import { BottomTabbar } from "./bottom-tab-bar";
import {
  CreatorChannelsTabBarIcon,
  HomeTabBarIcon,
  MySpaceTabBarIcon,
  NotificationsTabBarIcon,
  ProfileTabBarIcon,
  SettingsTabBarIcon,
} from "./tab-bar-icons";

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  const { width } = useWindowDimensions();

  return (
    <BottomTab.Navigator
      initialRouteName="homeTab"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabbar {...props} />}
    >

      <BottomTab.Screen
        name="homeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: HomeTabBarIcon,
        }}
      />

      {width < 768 && (
        <BottomTab.Screen
          name="notificationsTab"
          component={NotificationsNavigator}
          options={{
            tabBarIcon: NotificationsTabBarIcon,
          }}
        />
      )}

      <BottomTab.Screen
        name="channelsTab"
        component={CreatorChannelsNavigator}
        options={{
          tabBarIcon: CreatorChannelsTabBarIcon,
        }}
      />

      {width < 768 && (
        <BottomTab.Screen
          name="settings"
          component={SettingsNavigator}
          options={{
            tabBarIcon: SettingsTabBarIcon,
          }}
        />
      )}
    </BottomTab.Navigator>
  );
}
