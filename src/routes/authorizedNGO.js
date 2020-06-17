/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';

import homeStackNGO from './homeStackNGO';
import DrawerNGO from '../screens/DrawerNGO';
import colors from '../styles/color';

const screenWidth = Dimensions.get('window').width;

const authorized = createDrawerNavigator(
  {
    homeStackNGO
  },
  {
    drawerWidth: screenWidth * 0.6,
    initialRouteName: 'homeStackNGO',
    drawerPosition: 'right',
    useNativeAnimations: true,
    drawerLockMode: 'locked-closed',
    statusBarAnimation: 'slide',
    hideStatusBar: true,
    drawerBackgroundColor: colors.colorsecondary20,
    contentComponent: (props) => <DrawerNGO {...props} />
  }
);

export default authorized;
