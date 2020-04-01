import React from 'react';
import { View, ActivityIndicator, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/color';
import styles from '../../styles/style';
// import text from '../../styles/text';
import wah from '../../../assets/wah.png';

const { width, height } = Dimensions.get('window');

export default function SplashScreen(props) {
  setTimeout(() => {
    props.navigation.navigate('unAuthorized');
  }, 1000);

  return (
    <View style={[styles.parentContainer, { backgroundColor: colors.white }]}>
      <View style={{ flex: 8, justifyContent: 'center' }}>
        <Image
          source={wah}
          style={{
            resizeMode: 'cover',
            height: parseInt(height / 8),
            width: parseInt(width / 3)
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ActivityIndicator color={colors.colorsecondary10} size={50} />
      </View>
    </View>
  );
}

SplashScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
