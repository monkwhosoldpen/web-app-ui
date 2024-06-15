import "./shim";

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en'; // Import locale data for English

import 'intl-pluralrules';

import { registerRootComponent } from "expo";
import "expo-dev-client";
import "expo-dev-launcher";
// import { activateKeepAwake } from "expo-keep-awake";
import "expo/build/Expo.fx";
import "react-native-gesture-handler";

// import { PlaybackService } from "app/components/audio-player/service";

// import TrackPlayer from "design-system/track-player";

import App from "./App";

// if (__DEV__) {
//   activateKeepAwake();
// }

registerRootComponent(App);

// register audio service
// TrackPlayer.registerPlaybackService(() => PlaybackService);
