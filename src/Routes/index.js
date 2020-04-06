// third party libraries
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// local imports
import authorizedStack from './authorized';
import authorizedStackNGO from './authorizedNGO';
import unAuthorizedStack from './unauthorizedStack';
import SplashScreen from '../screens/SplashScreen';

const MainRoute = createSwitchNavigator(
  {
    authorized: authorizedStack,
    authorizedNGO: authorizedStackNGO,
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
