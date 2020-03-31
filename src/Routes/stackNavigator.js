import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Header from '../components/Header';
import DriverMapView from '../screens/DriverMapView';
import CommentsAndRatings from '../screens/Rating';
import ReportAgainstFoodProvider from '../screens/ReportAgainstFoodProvider';
import colors from '../styles/color';

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
    },
    driverMapView: {
      screen: DriverMapView,
      navigationOptions: {
        title: 'Drivers',
        headerStyle: {
          backgroundColor: colors.truckinBlue
        },
        headerTintColor: colors.white
      }
      // navigationOptions: ({ navigation }) => ({
      //   header: <Header pageName="DriverMapView" navigation={navigation} />
      // })
    },
    commentsAndRatings: {
      screen: CommentsAndRatings,
      navigationOptions: {
        title: 'Rating and comments',
        headerStyle: {
          backgroundColor: colors.truckinBlue
        },
        headerTintColor: colors.white
      }
      // navigationOptions: ({ navigation }) => ({
      //   header: <Header pageName="DriverMapView" navigation={navigation} />
      // })
    },
    reportAgainstFoodProvider: {
      screen: ReportAgainstFoodProvider,
      navigationOptions: {
        title: 'Report Misuse',
        headerStyle: {
          backgroundColor: colors.truckinBlue
        },
        headerTintColor: colors.white
      }
      // navigationOptions: ({ navigation }) => ({
      //   header: <Header pageName="DriverMapView" navigation={navigation} />
      // })
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
