/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wah from '../../../assets/wah.png';

const { width /* , height */ } = Dimensions.get('window');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '', // '9836825741',
      apiErrorMessage: '',
      validArr: '00'.split('').map(() => false),
      loading: false,
      validationSuccess: false
    };
  }

  componentDidMount() {}

  validatePhoneNumber = (number) => {
    const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(number);
  };

  onChangeValidity = (index) => (valid) => {
    this.setState((pst) => {
      const newst = pst;
      newst.validArr[index] = valid;
      const validationSuccess = newst.validArr.reduce(
        (acc, n) => acc && n,
        true
      );
      newst.validationSuccess = validationSuccess;
      return newst;
    });
  };

  signInWithPhoneNumber = async () => {
    this.setState({ apiErrorMessage: '', loading: true });
    const { name, phoneNumber, validationSuccess } = this.state;

    if (validationSuccess) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(
          `+91${phoneNumber}`
        );
        this.props.navigation.navigate('otp', {
          confirmation,
          name,
          phoneNumber
        });
        this.setState({ loading: false });
      } catch (ex) {
        this.setState({ apiErrorMessage: ex.message, loading: false });
      }
    } else {
      this.setState({
        apiErrorMessage: 'Invalid Phone Number',
        loading: false
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
          <View style={{ padding: 10, paddingBottom: 5 }}>
            <TextField
              placeholder="e.g. Justin Trudo"
              title="Your full name"
              validate={(val) => val && val.length >= 5}
              validateOnBlur
              // validateOnStart
              validateOnChange
              errorMessage="At least 5  letters."
              onChangeValidity={this.onChangeValidity(0)}
              onChangeText={(txt) => {
                this.setState({ name: txt });
              }}
              value={this.state.name}
            />
          </View>
          <View style={{ padding: 10, paddingTop: 0 }}>
            <TextField
              placeholder="e.g. 9988998899"
              title="Phone number"
              value={this.state.phoneNumber}
              onChangeText={(val) => {
                this.setState({ phoneNumber: val });
              }}
              showCharacterCounter={true}
              maxLength={10}
              markRequired
              validate={(val) => val && val.length === 10}
              validateOnBlur
              // validateOnStart
              validateOnChange
              errorMessage="10 digit Phone no required."
              onChangeValidity={this.onChangeValidity(1)}
            />
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Text
              style={[
                text.secondaryText,
                {
                  color: colors.red,
                  fontWeight: '700',
                  letterSpacing: 1,
                  textAlign: 'center'
                }
              ]}>
              {this.state.apiErrorMessage}
            </Text>
          </View>
          <Button
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={this.signInWithPhoneNumber}
            disabled={this.state.loading || !this.state.validationSuccess}
            label={!this.state.loading ? 'Verify phone number' : 'Loading ...'}
            labelStyle={!this.state.loading ? {} : { fontStyle: 'italic' }}
          />
        </View>
        <View
          style={{
            marginTop: 0,
            flexDirection: 'row'
          }}>
          <Text style={[text.primaryText, { padding: 10, paddingRight: 0 }]}>
            Running a relief drive ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ngoRegister');
            }}
            style={{ padding: 10, paddingLeft: 0 }}>
            <Text
              style={[
                text.primaryText,
                { color: colors.colorprimary0, fontWeight: '700' }
              ]}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              text.primaryText,
              { padding: 5, paddingLeft: 0, paddingTop: 10 }
            ]}>
            |
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ngoLogin');
            }}
            style={{ padding: 10, paddingLeft: 0 }}>
            <Text
              style={[
                text.primaryText,
                { color: colors.colorprimary0, fontWeight: '700' }
              ]}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getScreenProps: PropTypes.func.isRequired
  }).isRequired
};
