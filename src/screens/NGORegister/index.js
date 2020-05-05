/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Text } from 'react-native';
import { View, TextField, Button, MaskedInput } from 'react-native-ui-lib';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { registerNGO } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wah from '../../../assets/wah.png';

const { width, height } = Dimensions.get('window');

export default class NGORegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiErrorMessage: '',
      validArr: '0000000'.split('').map((v) => false),
      email: 'rkmbelur@gmail.com',
      mobile: '9800880989',
      name: 'RKM Belur, saradapith',
      regno: 'S/22/12/2018',
      password: 'repass1234',
      passwordConfirm: 'repass1234',
      address: 'Ramakrishna Math,Howrah 711202',
      loading: false,
      validationSuccess: false
    };
  }

  componentDidMount() {}

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

  onSubmit = async () => {
    this.setState({ apiErrorMessage: '', loading: true });
    const {
      name,
      email,
      mobile,
      regno,
      password,
      address,
      validationSuccess
    } = this.state;

    if (validationSuccess) {
      try {
        const res = await registerNGO({
          email,
          name,
          phone: mobile,
          password,
          registration_number: regno,
          address,
          lat: 22.3,
          lon: 88.3
        });

        if (!res.ok) {
          this.setState({
            apiErrorMessage: `Error ${res.code}: ${res.json.api_message}`,
            loading: false
          });
          return;
        }

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'ngoAwaitingReview' })
          ]
        });
        this.props.navigation.dispatch(resetAction);
        this.setState({ loading: false });
      } catch (e) {
        this.setState({ apiErrorMessage: e.message, loading: false });
      }
    }
  };

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
            padding: 10,
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
          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="e.g. Smile Foundation"
                title="Registered name"
                markRequired
                value={this.state.name}
                onChangeText={(txt) => {
                  this.setState({ name: txt });
                }}
                validate={(val) => val && val.length > 7}
                validateOnStart
                validateOnBlur
                enableErrors
                errorMessage="Mandatory >7 letters"
                onChangeValidity={this.onChangeValidity(0)}
              />
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="e.g. S/12/890"
                title="Registration number"
                markRequired
                value={this.state.regno}
                onChangeText={(txt) => {
                  this.setState({ regno: txt });
                }}
                validate="required"
                validateOnStart
                validateOnBlur
                enableErrors
                errorMessage="Required field"
                onChangeValidity={this.onChangeValidity(1)}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="e.g. abc@def.com"
                title="Email id"
                markRequired
                value={this.state.email}
                onChangeText={(txt) => {
                  this.setState({ email: txt });
                }}
                validate="email"
                validateOnStart
                validateOnBlur
                enableErrors
                errorMessage="Valid email id required"
                onChangeValidity={this.onChangeValidity(2)}
              />
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="e.g. 9988998899"
                title="Mobile number"
                showCharacterCounter
                maxLength={10}
                markRequired
                validate={(val) => val && val.length === 10}
                validateOnStart
                validateOnBlur
                value={this.state.mobile}
                onChangeText={(txt) => {
                  this.setState({ mobile: txt });
                }}
                errorMessage="Mobile no required"
                onChangeValidity={this.onChangeValidity(3)}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="Create password"
                title="Password"
                value={this.state.password}
                onChangeText={(txt) => {
                  this.setState({ password: txt });
                }}
                onChangeValidity={this.onChangeValidity(4)}
                secureTextEntry
                validate="required"
                validateOnStart
                validateOnBlur
                markRequired
                enableErrors
                errorMessage="Required field"
              />
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="Retype password"
                title="Confirm"
                value={this.state.passwordConfirm}
                onChangeText={(txt) => {
                  this.setState({ passwordConfirm: txt });
                }}
                secureTextEntry
                markRequired
                validate={(val) => val && val === this.state.password}
                validateOnStart
                validateOnBlur
                enableErrors
                errorMessage="Must match."
                onChangeValidity={this.onChangeValidity(5)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <View style={{ flex: 1, padding: 10 }}>
              <TextField
                placeholder="e.g. 1/2 abc street, kolkata-700001"
                title="Registered address"
                markRequired
                value={this.state.address}
                onChangeText={(txt) => {
                  this.setState({ address: txt });
                }}
                validate="required"
                validateOnStart
                validateOnBlur
                enableErrors
                errorMessage="Required field"
                onChangeValidity={this.onChangeValidity(6)}
              />
            </View>
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
            disabled={this.state.loading || !this.state.validationSuccess}
            label={!this.state.loading ? 'Submit' : 'Loading ...'}
            labelStyle={!this.state.loading ? {} : { fontStyle: 'italic' }}
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={this.onSubmit}
          />
        </View>
      </View>
    );
  }
}

NGORegister.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
