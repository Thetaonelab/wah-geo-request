// third party libraries
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// local imports
import authorizedStack from './authorized';
import authorizedStackNGO from './authorizedNGO';
import unauthorizedStack from './unauthorizedStack';
import preHomeStack from './preHomeStack';
import SplashScreen from '../screens/SplashScreen';

const MainRoute = createSwitchNavigator(
  {
    authorized: authorizedStack,
    authorizedPreHomeStack: preHomeStack,
    authorizedNGO: authorizedStackNGO,
    common: {
      screen: SplashScreen
    },
    unauthorized: unauthorizedStack
  },
  {
    initialRouteName: 'common'
  }
);

export default createAppContainer(MainRoute);
