import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
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
    const a = '\uF10D';
    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>
          {!this.props.isDashboard && (
            <TouchableOpacity onPress={this.goBack} style={styles.menuIconLeft}>
              {/* <Text style={text.appbarText}>BACK</Text> */}
              <Icon name="align-justify" size={30} />
            </TouchableOpacity>
          )}
        </View>

        {!this.props.isDashboard ? (
          <Text style={[text.normalBoldText]}>{this.props.pageName}</Text>
        ) : (
          <Image style={styles.logoImage} source={LogoImage} />
        )}

        {this.props.drawerMode && (
          <View style={styles.menuIconBox}>
            <TouchableOpacity
              style={styles.menuIconLeft}
              onPress={this.toogleDrawer}>
              <Text style={[text.appbarText]}>☰</Text>
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
