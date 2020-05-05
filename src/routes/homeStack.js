import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Header from '../components/Header';
import Feed from '../screens/Feed';
import EditGiveawayList from '../screens/EditGiveawayList';

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
    feed: {
      screen: Feed,
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
    about: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'About', false, false)
      })
    },
    editGiveawayList: {
      screen: EditGiveawayList,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'My Giveaway List', false, false)
      })
    }
  },
  {
    initialRouteName: 'home'
  }
);
