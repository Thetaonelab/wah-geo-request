/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import styles from '../../styles/style';
import colors from '../../styles/color';
import wah from '../../../assets/wah.png';

const { width, height } = Dimensions.get('window');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.parentContainer}>
        <View
          style={{
            width: parseInt(width / 1.5),
            borderColor: colors.colorsecondary23,
            padding: 30,
            borderWidth: 1,
            borderRadius: 3
          }}>
          <Image
            source={wah}
            style={{
              resizeMode: 'cover',
              height: 70,
              width: 140,
              alignSelf: 'center',
              marginBottom: 40
            }}
          />
          <TextField placeholder="e.g. Justin Trudo" title="Your name" />
          <TextField placeholder="e.g. 9988998899" title="Phone number" />
          <Button
            label="Validate OTP"
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 30, marginBottom: 10 }}
            onPress={() => {
              this.props.navigation.navigate('otp');
            }}
          />
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
