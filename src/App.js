/* eslint-disable react/no-unused-state */
import React from 'react';
import { Keyboard, StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import messaging from '@react-native-firebase/messaging';
import colors from './styles/color';
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

  componentDidMount = async () => {
    await messaging().registerDeviceForRemoteMessages();
    await this.checkPermission();
  };

  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // eslint-disable-next-line no-console
      console.log(fcmToken);
      this.setState({ fcmToken });
    } else {
      console.error('Failed', 'No token received');
    }
  };

  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  /* messageListener = async () => {
    this.notificationListener = notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }; */

  onNavigate = (prevState, newState, action) => {
    // eslint-disable-next-line no-console
    console.log('ROUTE CHANGE');
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
    this.setState(
      {
        currentRoute: this.getRoute(newState)
      },
      () => {
        // eslint-disable-next-line no-console
        console.log('CURRENT ROUTE::', this.state.currentRoute);
      }
    );
  };

  getRoute = (prevState) => {
    if (prevState.index !== undefined) {
      const route = this.getRoute(prevState.routes[prevState.index]);
      return route;
    }
    return prevState.routeName;
  };

  activateSnackbar = (message, type = 'success', duration = 8000) => {
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
  toggleDrawer = (val) => {
    this.setState({
      drawerStatus: val
    });
  };

  updateLoginStatus = (val) => {
    this.setState({
      isLoggedIn: val
    });
  };

  toggleStatusBarHidden = () => {
    this.setState((prevState) => ({
      statusBarHidden: !prevState.statusBarHidden
    }));
  };

  render() {
    return (
      <>
        <StatusBar hidden={this.state.statusBarHidden} />
        <Navigator
          screenProps={{
            drawerStatus: this.state.drawerStatus,
            isKeyboardOpen: this.state.isKeyboardOpen,
            isLoggedIn: this.state.isLoggedIn,
            isStatusBarHidden: this.state.statusBarHidden,
            updateLoginStatus: this.updateLoginStatus,
            activateSnackbar: this.activateSnackbar,
            toggleStatusBarHidden: this.toggleStatusBarHidden,
            fcmToken: this.state.fcmToken
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
      </>
    );
  }
}
