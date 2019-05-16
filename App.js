/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  NavigationActions,
  StackActions
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import DrawerContainer from "./src/screens/Drawer/DrawerContainer";

import AuthScreen from "./src/screens/Auth/Auth";
import DetailScreen from "./src/screens/Details/Details";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";

import { TouchableOpacity, View } from "react-native";

const store = configureStore();

const menuIcon = navigation => (
  <View style={{ marginRight: 10 }}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Icon size={30} name="bars" style={{ color: "orange" }} />
    </TouchableOpacity>
  </View>
);

const PlaceStack = createMaterialBottomTabNavigator(
  {
    FindPlace: {
      screen: FindPlaceScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={20} name="search" style={{ color: tintColor }} />
        ),
        tabBarColor: "#29aaf4"
      }
    },
    SharePlace: {
      screen: SharePlaceScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={20} name="share" style={{ color: tintColor }} />
        ),
        tabBarColor: "orange"
      }
    }
  },
  {
    initialRouteName: "FindPlace",
    shifting: true,
    activeColor: "#fff",
    inactiveColor: "#fff",
    barStyle: {
      backgroundColor: "#29aaf4",
      fontWeight: "bold",
      fontSize: 20,
      paddingBottom: 0
    }
  }
);
const AppStack = createStackNavigator(
  {
    PlaceStack: {
      screen: PlaceStack,
      navigationOptions: ({ navigation }) => ({
        title: "Places",
        headerRight: menuIcon(navigation)
      })
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.selectedPlace.name,
        headerRight: menuIcon(navigation)
      })
    }
  },
  {
    headerLayoutPreset: "center",
    initialRouteName: "PlaceStack"
  }
);
const DetailStack = createStackNavigator({
  Details: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: menuIcon(navigation)
    })
  }
});

const DrawerStack = createDrawerNavigator(
  {
    App: {
      screen: AppStack,
      navigationOptions: {
        drawerLabel: "Places",
        drawerIcon: ({ tintColor }) => <Icon name="map" size={17} />
      }
    },
    DetailStack: {
      screen: DetailStack,
      navigationOptions: {
        drawerLabel: "Details",
        drawerIcon: ({ tintColor }) => <Icon name="info" size={17} />
      }
    },
    LogOut: {
      screen: AuthScreen,
      navigationOptions: {
        drawerLabel: "Log Out",
        drawerIcon: ({ tintColor }) => <Icon name="sign-out" size={17} />
      }
    }
  },
  {
    drawerPosition: "right",
    contentComponent: DrawerContainer
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: {
      screen: AuthScreen
    },
    MainApp: {
      screen: DrawerStack
    }
  })
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
