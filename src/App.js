/* eslint-disable react/no-unused-state */
import React from 'react';
import { Keyboard, StatusBar } from 'react-native';
import Snackbar from 'react-native-snackbar';
import colors from './styles/color';
import Navigator from './routes';
import { TYPE_NGO, TYPE_DONOR } from './constants';
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
        userId: '',
        userType: TYPE_DONOR
      },
      NGOUserDetails: {
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

  updateNGOUser = (NGOUserDetails) => {
    this.setState((pst) => ({
      NGOUserDetails: { ...pst.NGOUserDetails, ...NGOUserDetails }
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
    Snackbar.show({
      text: message,
      duration,
      textColor: colors.white,
      backgroundColor: type === 'error' ? colors.red : colors.colorgreen0
    });
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
          value={{
            donor: { ...this.state.userDetails },
            ngo: { ...this.state.NGOUserDetails },
            updateUser: this.updateUser,
            updateNGOUser: this.updateNGOUser
          }}>
          <Navigator
            screenProps={{
              isStatusBarHidden: this.state.statusBarHidden,
              activateSnackbar: this.activateSnackbar,
              toggleStatusBarHidden: this.toggleStatusBarHidden
            }}
            onNavigationStateChange={this.onNavigate}
          />
        </UserContext.Provider>
      </>
    );
  }
}
