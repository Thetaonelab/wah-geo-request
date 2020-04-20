import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import Header from '../components/Header';
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
    chooseCategory: {
      screen: ChooseCategory,
      navigationOptions: ({ navigation }) => ({
        header: header(navigation, 'My giveaway list', false, false)
      })
    }
  },
  {
    initialRouteName: 'chooseCategory'
  }
);
