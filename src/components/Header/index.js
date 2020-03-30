import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoImage from '../../../assets/wah.png';

import colors from '../../styles/color';
import text from '../../styles/text';
import styles from './style';

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
    this.props.navigation.navigate('home');
  };

  render() {
    const { deviceConnected } = this.context;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goBack} style={styles.leftSide}>
          {!this.props.isDashboard && (
            <>
              <Icon name="less-than" size={20} />
              <Text style={[text.normalText, styles.backText]}>Back</Text>
            </>
          )}
        </TouchableOpacity>

        {!this.props.isDashboard ? (
          <Text style={[text.normalBoldText]}>{this.props.pageName}</Text>
        ) : (
          <Image style={styles.logoImage} source={LogoImage} />
        )}

        {this.props.drawerMode && (
          <View style={styles.menuIconBox}>
            <View style={styles.menuIconLeft}>
              {!this.props.isDashboard && (
                <Icon
                  style={styles.connectIcon}
                  name="watch"
                  size={30}
                  color={
                    deviceConnected
                      ? colors.colorprimary0
                      : colors.colorsecondary10
                  }
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.menuIconRight}
              onPress={this.toogleDrawer}>
              <Icon name="menu" size={40} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  isDashboard: PropTypes.bool,
  drawerMode: PropTypes.bool,
  navigation: PropTypes.shape({
    state: PropTypes.shape({}),
    navigate: PropTypes.func,
    getScreenProps: PropTypes.func,
    addListener: PropTypes.func,
    toggleDrawer: PropTypes.func,
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func
  }).isRequired
};

Header.defaultProps = {
  isDashboard: false,
  drawerMode: true
};

export default Header;
