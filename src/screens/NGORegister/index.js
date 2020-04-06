/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Text } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wah from '../../../assets/wah.png';

const { width, height } = Dimensions.get('window');

export default class NGORegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text
          style={[
            text.primaryText,
            {
              alignSelf: 'center',
              marginBottom: 20,
              fontWeight: '700',
              letterSpacing: 2
            }
          ]}>
          FOR REGISTERED NGO
        </Text>
        <View
          style={{
            width: parseInt(width / 1.2),
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
              marginBottom: 20
            }}
          />
          <TextField placeholder="e.g. Justin Trudo" title="Registered name" />
          <TextField placeholder="e.g. S/12/890" title="Registration number" />
          <TextField
            placeholder="e.g. 9988998899"
            title="Contact person phone number"
          />
          <TextField
            placeholder="e.g. 1/2 abc street, kolkata-700001"
            title="Registered address"
          />
          <TextField
            placeholder="Create a strong password"
            title="Password"
          />
          <TextField
            placeholder="Retype your password"
            title="Confirm password"
          />
          <Button
            label="Submit"
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

NGORegister.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
