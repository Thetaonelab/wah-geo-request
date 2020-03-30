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
    }
  },
  {
    initialRouteName: 'login'
  }
);

export default unauthorized;
