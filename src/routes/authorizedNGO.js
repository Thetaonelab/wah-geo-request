/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';

import homeStackNGO from './stackNavigatorNGO';
import Drawer from '../screens/Drawer';
import colors from '../styles/color';

const screenWidth = Dimensions.get('window').width;

const authorized = createDrawerNavigator(
  {
    homeStackNGO
  },
  {
    drawerWidth: screenWidth * 0.6,
    initialRouteName: 'homeStackNGO',
    drawerPosition: 'left',
    useNativeAnimations: true,
    drawerLockMode: 'unlocked',
    drawerBackgroundColor: colors.colorsecondary20,
    contentComponent: (props) => <Drawer {...props} />
  }
);

export default authorized;