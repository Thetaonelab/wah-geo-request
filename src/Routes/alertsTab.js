import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Dimensions } from 'react-native';

import Alerts from '../pages/Alerts';
import Notifications from '../pages/Alerts/Notifications';
import Reminders from '../pages/Alerts/Reminders';
import { ALERTS, REMINDERS, NOTIFICATIONS } from '../globalText';
import { pallet } from '../globalStyles/colors';

const { width } = Dimensions.get('window');
const Tabs = createMaterialTopTabNavigator(
  {
    alerts: {
      screen: Alerts,
      navigationOptions: () => ({
        title: ALERTS
      })
    },

    notifications: {
      screen: Notifications,
      navigationOptions: () => ({
        title: NOTIFICATIONS
      })
    },

    reminders: {
      screen: Reminders,
      navigationOptions: () => ({
        title: REMINDERS
      })
    }
  },
  {
    initialRouteName: 'alerts',
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: pallet.green
      },
      labelStyle: {
        fontSize: width <= 320 ? 8 : 11,
        fontWeight: '900',
        color: pallet.green
      },
      style: {
        backgroundColor: pallet.white
      }
    }
  }
);

export default Tabs;
