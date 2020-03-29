// third party libraries
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// local imports
import authorizedStack from './authorized';
import unAuthorizedStack from './unauthorizedStack';
import SplashScreen from '../pages/SplashScreen';

const MainRoute = createSwitchNavigator(
  {
    authorized: {
      screen: authorizedStack
    },
    common: {
      screen: SplashScreen
    },
    unAuthorized: {
      screen: unAuthorizedStack
    }
  },
  {
    initialRouteName: 'common'
  }
);

export default createAppContainer(MainRoute);
