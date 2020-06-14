/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import UserContext from '../../contexts/UserContext';

// import colors from '../../styles/color';
import text from '../../styles/text';
import styles from './style';
import AsyncAlert from '../Helpers/AsyncAlert';
import logoutIcon from '../../../assets/logout.png';
import menuIcon from '../../../assets/menu.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toogleDrawer = () => {
    if (this.props.navigation.getScreenProps().drawerStatus) this.closeDrawer();
    else this.openDrawer();
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  logout = async () => {
    const res = await AsyncAlert.alert(
      'Confirm logging out ?',
      'All unsaved data will be wiped.',
      [{ text: 'OK' }, { text: 'Cancel' }]
    );
    if (res === 'Cancel') {
      return;
    }
    this.context.updateUser({
      address: '',
      email: '',
      name: '',
      phone: '',
      regNo: '',
      userId: ''
    });
    await AsyncStorage.setItem('auth', '');
    this.props.navigation.navigate('common');
  };

  render() {
    const { isFirstRoute } = this.props.navigation.getScreenProps();
    let conditionalView = null;
    /* if (this.props.drawerMode) {
      conditionalView = (
        <TouchableOpacity
          style={styles.menuIconLeft}
          onPress={this.toogleDrawer}>
          <Text style={[text.appbarText]}>☰</Text>
        </TouchableOpacity>
      );
    } else  */
    if (this.props.giveAwayPageFirstTime) {
      conditionalView = (
        <TouchableOpacity style={styles.menuIconLeft} onPress={this.logout}>
          {/* <Text style={[text.primaryText]}>👋</Text> */}
          <Image
            source={logoutIcon}
            style={{
              resizeMode: 'cover',
              height: 26,
              width: 26,
              alignSelf: 'center'
            }}
          />
        </TouchableOpacity>
      );
    } else if (!this.props.drawerMode && isFirstRoute) {
      conditionalView = (
        <TouchableOpacity style={styles.menuIconLeft} onPress={this.goBack}>
          <Text style={[text.primaryText]}>{'< Back'}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>{conditionalView}</View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[text.appbarText]}>
            {this.props.pageName.toUpperCase()}
          </Text>
          {this.props.subText ? (
            <Text style={[text.bodyText]}>
              {this.props.subText.toUpperCase()}
            </Text>
          ) : null}
        </View>
        {/* <View
          style={{
            padding: 2,
          }}>
          <Image
            style={{ resizeMode: 'cover', width: 30, height: 30 }}
            source={wahIcon}
          />
        </View> */}

        <View style={styles.menuIconBox}>
          <TouchableOpacity
            style={styles.menuIconLeft}
            onPress={this.toogleDrawer}>
            {/* <Text style={[text.appbarText, { opacity: 1 }]}>☰</Text> */}
            <Image
              source={menuIcon}
              style={{
                resizeMode: 'cover',
                height: 20,
                width: 20,
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Header.contextType = UserContext;

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  subText: PropTypes.string,
  drawerMode: PropTypes.bool,
  giveAwayPageFirstTime: PropTypes.bool,
  navigation: PropTypes.shape({
    state: PropTypes.shape({}),
    navigate: PropTypes.func,
    getScreenProps: PropTypes.func,
    goBack: PropTypes.func,
    isFirstRouteInParent: PropTypes.func,
    toggleDrawer: PropTypes.func,
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func
  }).isRequired
};

Header.defaultProps = {
  drawerMode: true,
  giveAwayPageFirstTime: false,
  subText: ''
};

export default Header;
