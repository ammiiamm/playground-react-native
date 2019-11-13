import React, { Component } from "react";
import { Image } from "react-native";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";

import {
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import JSONFeedScreen from "./JSONFeedScreen";
import CameraScreen from "./CameraScreen";
import YoutubeScreen from "./YoutubeScreen";

const jsonNavigationOption = {
  tabBarLabel: "Feed",
  tabBarIcon: ({ focused }) => (
    <Image
      style={{
        height: 28,
        width: 28
      }}
      resizeMode="contain"
      source={
        focused
          ? require("./assets/img/ic_profile_select.png")
          : require("./assets/img/ic_profile.png")
      }
    />
  )
}

const cameraNavigationOption = {
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => (
    <Image
      style={{
        height: 28,
        width: 28
      }}
      resizeMode="contain"
      source={
        focused
          ? require("./assets/img/ic_card_select.png")
          : require("./assets/img/ic_card.png")
      }
    />
  )
}

const TabStack = createBottomTabNavigator({
  json: { screen: JSONFeedScreen, navigationOptions: jsonNavigationOption },
  camera: { screen: CameraScreen, navigationOptions: cameraNavigationOption }
}, {
  initialRouteName: "json"
})


TabStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // Ternery condition
  const headerTitle = routeName == 'json' ? "Key Concepts" : "Camera"

  return {
    headerTitle,
    headerStyle: { backgroundColor: '#339CED' },
    headerTitleStyle: { color: "#fff" },

  };
};


const AuthenStack = createStackNavigator({
  home: { screen: HomeScreen },
  register: { screen: RegisterScreen }
}, {
  initialRouteName: "home"
})

const AppStack = createStackNavigator({
  tab: { screen: TabStack},
  youtube: {screen: YoutubeScreen}
}, {
  initialRouteName: "tab"
})

export default createAppContainer(createSwitchNavigator({
  authenScene: AuthenStack,
  appScene: AppStack,
}, {
  initialRouteName: "authenScene"
}),
);