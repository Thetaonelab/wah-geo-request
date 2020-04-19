/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image } from 'react-native';
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
      const auth = {
        token: loginRes.json.api_message.token,
        type: TYPE_DONOR,
        path: 'home'
      };
      await AsyncStorage.setItem('auth', JSON.stringify(auth));
    } else {
      const auth = {
        token,
        type: TYPE_DONOR,
        path: 'locationAccess',
        temp: true
      };
      await AsyncStorage.setItem('auth', JSON.stringify(auth));
    }

    this.setState({ loading: false });
    this.props.navigation.navigate('common');
  };

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
          <TextField
            placeholder="e.g. 12345"
            title="6 Digit OTP"
            value={this.state.otp}
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
      params: PropTypes.shape({ confirmation: PropTypes.object })
    })
  }).isRequired
};
