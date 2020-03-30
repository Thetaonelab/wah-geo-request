import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Header from '../components/Header';
import MapOverlay from '../screens/MapOverlay';

const header = (navigation, title) => (
  <Header isDashboard={true} pageName={title} navigation={navigation} />
);
export default createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'WAH!')
      })
    },
    profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'Profile')
      })
    },

    about: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'About')
      })
    },
    mapOverlay: {
      screen: MapOverlay,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'MapOverlay')
      })
    }
  },
  {
    initialRouteName: 'mapOverlay'
  }
);
