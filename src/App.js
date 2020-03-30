/* eslint-disable react/no-unused-state */
import React from 'react';
import { View, Keyboard, StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import colors from './styles/color';
import styles from './styles/style';
// import text from './styles/text';
import Navigator from './routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInAuthorizedRoute: false,
      drawerStatus: false,
      isLoggedIn: false,
      statusBarHidden: true
    };
  }

  onNavigate = (prevState, newState, action) => {
    // Dismissing the keyboard on every Route change
    Keyboard.dismiss();
    if (action.type === 'Navigation/MARK_DRAWER_SETTLING') {
      this.toggleDrawer(action.willShow); // setting drawer status on toggle
    } else if (
      action.type === 'Navigation/NAVIGATE' ||
      action.type === 'Navigation/BACK'
    ) {
      this.toggleDrawer(false); // setting drawer status on toggle
    }

    if (newState.index === 0) {
      this.setState({
        isInAuthorizedRoute: true
      });
    } else {
      this.setState({
        isInAuthorizedRoute: false
      });
    } // eslint-disable-line

    //  setting up current Route
    this.setState({
      currentRoute: this.getRoute(newState)
    });
  };

  getRoute = prevState => {
    if (prevState.index !== undefined) {
      const route = this.getRoute(prevState.routes[prevState.index]);
      return route;
    }
    return prevState.routeName;
  };

  activateSnackbar = (message, type = 'success', duration = 3000) => {
    this.setState({
      snackbar: {
        message,
        type
      }
    });

    if (this.snackbarTimer) clearTimeout(this.snackbarTimer);

    this.snackbarTimer = setTimeout(() => {
      this.setState({
        snackbar: {
          message: '',
          type
        }
      });
    }, duration);
  };

  opneKeyBoard = () => {
    this.setState({ isKeyboardOpen: true });
  };

  closeKeyBoard = () => {
    this.setState({ isKeyboardOpen: false });
  };

  //  drawer toggling function
  toggleDrawer = val => {
    this.setState({
      drawerStatus: val
    });
  };

  updateLoginStatus = val => {
    this.setState({
      isLoggedIn: val
    });
  };

  toggleStatusBarHidden = () => {
    this.setState(prevState => ({
      statusBarHidden: !prevState.statusBarHidden
    }));
  };

  render() {
    return (
      <View style={styles.parentContainer}>
        <StatusBar hidden={this.state.statusBarHidden} />
        <Navigator
          ref={r => {
            this.topLevelNavigator = r;
          }}
          screenProps={{
            drawerStatus: this.state.drawerStatus,
            isKeyboardOpen: this.state.isKeyboardOpen,
            isLoggedIn: this.state.isLoggedIn,
            isStatusBarHidden: this.state.statusBarHidden,
            updateLoginStatus: this.updateLoginStatus,
            activateSnackbar: this.activateSnackbar,
            toggleStatusBarHidden: this.toggleStatusBarHidden
          }}
          onNavigationStateChange={this.onNavigate}
        />
        <SnackBar
          visible={Boolean(this.state.snackbar?.message)}
          backgroundColor={
            this.state.snackbar?.type === 'success'
              ? colors.colorprimary0
              : colors.colorsecondary20
          }
          messageColor={colors.white}
          textMessage={this.state.snackbar?.message}
        />
      </View>
    );
  }
}
