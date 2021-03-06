/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Keyboard } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { loginIndividual } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import { loginNGO } from '../NGOLogin/api';
import { TYPE_NGO, TYPE_DONOR } from '../../constants';

const { width, height } = Dimensions.get('window');

export default class OtpValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {}

  confirmCode = async () => {
    Keyboard.dismiss();
    this.setState({ loading: true });
    const { confirmation } = this.props.navigation.state.params;
    const { activateSnackbar } = this.props.navigation.getScreenProps();
    if (!this.state.otp || this.state.otp.length < 6) {
      activateSnackbar('Please enter 6 digit OTP.', 'error');
      this.setState({ loading: false });
      return;
    }
    try {
      const fbUser = await confirmation.confirm(this.state.otp);
      const token = await fbUser.getIdToken(false);
      this.tryLogin(token);
    } catch (error) {
      // console.error(error);
      this.setState({ loading: false });
      activateSnackbar('Invalid OTP. Please try again', 'error');
    }
  };

  tryLogin = async (token) => {
    const loginRes = await loginIndividual(token);
    if (loginRes.ok) {
      const { token: backendToken } = loginRes.json.api_message;
      const auth = {
        token: backendToken,
        type: TYPE_DONOR
      };
      await AsyncStorage.setItem('auth', JSON.stringify(auth));
      this.setState({ loading: false }, () => {
        this.props.navigation.navigate('common');
      });
    } else {
      // not registered yet
      const { name, phoneNumber } = this.props.navigation.state.params;
      this.setState({ loading: false }, () => {
        this.props.navigation.navigate('locationAccess', {
          token,
          name,
          phoneNumber
        }); // should be reset instead of navigate
      });
    }
  };

  render() {
    return (
      <View style={styles.parentContainer}>
        <View
          style={{
            width: parseInt(width * 0.9),
            borderColor: colors.colorsecondary23,
            padding: 30,
            borderWidth: 1,
            borderRadius: 3
          }}>
          <TextField
            showCharacterCounter={true}
            maxLength={6}
            placeholder="e.g. 12345"
            title="6 Digit OTP"
            value={this.state.otp}
            keyboardType="number-pad"
            onChangeText={(text) => {
              // eslint-disable-next-line react/no-unused-state
              this.setState({ otp: text });
            }}
          />
          <Button
            disabled={this.state.loading}
            label={!this.state.loading ? 'Verify' : 'Loading ...'}
            labelStyle={!this.state.loading ? {} : { fontStyle: 'italic' }}
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 30, marginBottom: 10 }}
            onPress={this.confirmCode}
          />
        </View>
      </View>
    );
  }
}

OtpValidation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getScreenProps: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        confirmation: PropTypes.object,
        phoneNumber: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    })
  }).isRequired
};
