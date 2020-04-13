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

export default class OtpValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  confirmCode = async () => {
    const { confirmation } = this.props.navigation.state.params;
    const { activateSnackbar } = this.props.navigation.getScreenProps();
    /* if (!this.state.otp || this.state.otp.length < 6) {
      activateSnackbar('Please enter 6 digit OTP.', 'error');
      return;
    }
    try {
      await confirmation.confirm(this.state.otp);
    } catch (error) {
      // console.error('Invalid code.');
      activateSnackbar('Invalid OTP. Please try again', 'error');
    } */

    this.props.navigation.navigate('authorized');
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
            onChange={(text) => {
              // eslint-disable-next-line react/no-unused-state
              this.setState({ otp: text });
            }}
          />
          <Button
            label="Verify"
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
