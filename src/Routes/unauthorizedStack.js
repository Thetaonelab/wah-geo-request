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
import NGORegister from '../screens/NGORegister';
import NGOLogin from '../screens/NGOLogin';
import NgoAwaitingReview from '../screens/NgoAwaitingReview';
import LocationAccess from '../screens/LocationAccess';

const noHeader = () => ({ headerShown: false });

export default createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: noHeader
    },
    ngoRegister: {
      screen: NGORegister,
      navigationOptions: noHeader
    },
    ngoLogin: {
      screen: NGOLogin,
      navigationOptions: noHeader
    },
    otp: {
      screen: OTPValidation,
      navigationOptions: noHeader
    },
    ngoAwaitingReview: {
      screen: NgoAwaitingReview,
      navigationOptions: noHeader
    },
    locationAccess: {
      screen: LocationAccess,
      navigationOptions: noHeader
    }
  },
  {
    initialRouteName: 'login'
  }
);
