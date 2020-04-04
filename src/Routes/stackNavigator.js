import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Header from '../components/Header';
import MapOverlay from '../screens/MapOverlay';
import ChooseCategory from '../screens/ChooseCategory';

const header = (navigation, title, drawerMode, isDashboard) => () => (
  <Header
    isDashboard={isDashboard}
    pageName={title}
    navigation={navigation}
    drawerMode={drawerMode}
  />
);
export default createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'WAH!', true, true)
      })
    },
    profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'Profile', false, false)
      })
    },
    chooseCategory: {
      screen: ChooseCategory,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'My giveaway list', false, false)
      })
    },

    about: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'About', false, false)
      })
    },
    mapOverlay: {
      screen: MapOverlay,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'Find on map', true, true)
      })
    }
  },
  {
    initialRouteName: 'chooseCategory'
  }
);
