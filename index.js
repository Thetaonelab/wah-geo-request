// core packages
import { AppRegistry } from 'react-native';

// local imports
import App from './src/App';
import { name as appName } from './app.json';

/**
 * NOTE: trying to change the "name" value in app.json file
 * will result in "Application has not registered" error.
 * https://stackoverflow.com/questions/38340360/react-native-application-has-not-been-registered-error
 */
// register component to init react native app

AppRegistry.registerComponent(appName, () => App);
