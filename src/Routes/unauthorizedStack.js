/**
 * this stack contains all components which user
 * can view without logging into the app.
 * This components will appear for the first time user
 */

// third part libraries
import { createStackNavigator } from 'react-navigation-stack';

// local imports
import Login from '../screens/Login';
import OTPValidation from '../screens/OTPValidation';
import FoodTruckRegistration from '../screens/FoodtruckRegistration';
import DriverRegistration from '../screens/DriverRegistration';
import colors from '../styles/color';

const noHeader = () => ({ header: null });

const unauthorized = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: noHeader
    },
    otp: {
      screen: OTPValidation,
      navigationOptions: noHeader
    },
    foodTruckRegistration: {
      screen: FoodTruckRegistration,
      navigationOptions: {
        title: 'Register to supply food',
        headerStyle: {
          backgroundColor: colors.truckinBlue
        },
        headerTintColor: colors.white
      }
    },
    driverRegistration: {
      screen: DriverRegistration,
      navigationOptions: {
        title: 'Driver registration',
        headerStyle: {
          backgroundColor: colors.truckinBlue
        },
        headerTintColor: colors.white
      }
    }
  },
  {
    initialRouteName: 'login'
  }
);

export default unauthorized;
