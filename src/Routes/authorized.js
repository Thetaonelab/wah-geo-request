/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';

import homeStack from './homeStack';
import Drawer from '../screens/Drawer';
import colors from '../styles/color';

const screenWidth = Dimensions.get('window').width;

const authorized = createDrawerNavigator(
  {
    homeStack
  },
  {
    drawerWidth: screenWidth * 0.6,
    initialRouteName: 'homeStack',
    drawerPosition: 'right',
    useNativeAnimations: true,
    drawerLockMode: 'locked-closed',
    statusBarAnimation: 'slide',
    hideStatusBar: true,
    drawerBackgroundColor: colors.colorsecondary20,
    contentComponent: (props) => <Drawer {...props} />
  }
);

export default authorized;
