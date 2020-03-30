/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';

import homeStack from './stackNavigator';
import Drawer from '../screens/Drawer';

const screenWidth = Dimensions.get('window').width;

const authorized = createDrawerNavigator(
  {
    homeStack
  },
  {
    drawerWidth: screenWidth * 0.9,
    initialRouteName: 'homeStack',
    drawerPosition: 'right',
    useNativeAnimations: false,
    contentComponent: props => <Drawer {...props} />
  }
);

export default authorized;
