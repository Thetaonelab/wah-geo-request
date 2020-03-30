import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Header from '../components/Header';

const Stack = createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header isDashboard={true} pageName="WAH!" navigation={navigation} />
        )
      })
    },
    profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: <Header pageName="Profile" navigation={navigation} />
      })
    },

    about: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        header: <Header pageName="About" navigation={navigation} />
      })
    }
  },
  {
    initialRouteName: 'home'
  }
);

/* Stack.navigationOptions = ({ navigation }) => {
  const { index, routes } = navigation.state;
  let tabBarVisible = true;
  if (
    routes[index].routeName === "profileCamera" ||
    routes[index].routeName === "barCode"
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
}; */

export default Stack;
