/* eslint-disable react/no-unused-state */
import React from 'react';
import { Keyboard, StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import colors from './styles/color';
import Navigator from './routes';
import { TYPE_NGO } from './constants';
import UserContext from './contexts/UserContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerStatus: false,
      statusBarHidden: true,
      userDetails: {
        name: '',
        address: '',
        phone: '',
        email: '',
        regNo: '',
        userType: TYPE_NGO
      }
    };
  }

  updateUser = (userDetails) => {
    this.setState((pst) => ({
      userDetails: { ...pst.userDetails, ...userDetails }
    }));
  };

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

  toggleStatusBarHidden = () => {
    this.setState((prevState) => ({
      statusBarHidden: !prevState.statusBarHidden
    }));
  };

  render() {
    return (
      <>
        <StatusBar hidden={this.state.statusBarHidden} />
        <UserContext.Provider
          value={{ ...this.state.userDetails, updateUser: this.updateUser }}>
          <Navigator
            screenProps={{
              isStatusBarHidden: this.state.statusBarHidden,
              activateSnackbar: this.activateSnackbar,
              toggleStatusBarHidden: this.toggleStatusBarHidden
            }}
            onNavigationStateChange={this.onNavigate}
          />
        </UserContext.Provider>
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
