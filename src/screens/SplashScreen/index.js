import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import colors from '../../styles/color';
import styles from '../../styles/style';
// import text from '../../styles/text';
import wah from '../../../assets/wah.png';

export default function SplashScreen(props) {
  setTimeout(() => {
    props.navigation.navigate('unAuthorized');
  }, 3000);
  return (
    <View style={[styles.parentContainer, { backgroundColor: colors.white }]}>
      <View style={{ flex: 8, justifyContent: 'center' }}>
        {/* <Text style={[text.heroText, { color: colors.white, fontSize: 40 }]}>
          WAH!
        </Text>
        <Text style={[text.secondaryText, { color: colors.white }]}>
          we are humans
        </Text> */}
        <Image
          source={wah}
          style={{ resizeMode: 'cover', height: 300, width: 300 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ActivityIndicator color={colors.colorsecondary10} size={50} />
      </View>
    </View>
  );
}
