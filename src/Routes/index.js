// third party libraries
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// local imports
import authorizedStack from './authorized';
import unAuthorizedStack from './unauthorizedStack';
import SplashScreen from '../screens/SplashScreen';

const MainRoute = createSwitchNavigator(
  {
    authorized: authorizedStack,
    common: {
      screen: SplashScreen
    },
    unAuthorized: unAuthorizedStack
  },
  {
    initialRouteName: 'common'
  }
);

export default createAppContainer(MainRoute);
