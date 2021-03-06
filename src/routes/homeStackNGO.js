import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../screens/Profile';
import Header from '../components/Header';
import MapOverlay from '../screens/MapOverlay';
import ActiveRequests from '../screens/ActiveRequests';

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
    profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'Profile', false, false)
      })
    },
    mapOverlay: {
      screen: MapOverlay,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'Donors on map', true, true)
      })
    },
    activeRequests: {
      screen: ActiveRequests,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'Active Requests', false, false)
      })
    }
  },
  {
    initialRouteName: 'mapOverlay'
  }
);
