import React from 'react';
import { View /* , Image */, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
// import LogoImage from '../../../assets/wah.png';

// import colors from '../../styles/color';
import text from '../../styles/text';
import styles from './style';
// import wahIcon from '../../../assets/wah-icon.png';

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

  render() {
    const { isFirstRoute } = this.props.navigation.isFirstRouteInParent();
    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>
          {this.props.drawerMode ? (
            <TouchableOpacity
              style={styles.menuIconLeft}
              onPress={this.toogleDrawer}>
              <Text style={[text.appbarText]}>☰</Text>
            </TouchableOpacity>
          ) : !isFirstRoute ? (
            <TouchableOpacity style={styles.menuIconLeft} onPress={this.goBack}>
              <Text style={[text.appbarText]}>←</Text>
            </TouchableOpacity>
          ) : null}
        </View>
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

        {/* <View style={styles.menuIconBox}>
          <TouchableOpacity
            style={styles.menuIconLeft}
            onPress={this.toogleDrawer}>
            <Text style={[text.bodyText]}>
              🔔
              <Text
                style={[
                  text.bodyText,
                  { color: colors.black }
                ]}>
                - 4
              </Text>
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  subText: PropTypes.string,
  drawerMode: PropTypes.bool,
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
  drawerMode: false,
  subText: ''
};

export default Header;
