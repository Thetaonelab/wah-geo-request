/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { loginNGO } from './api';
import { TYPE_NGO } from '../../constants';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wah from '../../../assets/wah.png';

const { width, height } = Dimensions.get('window');

export default class NGOLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validArr: '00'.split('').map((v) => false),
      email: 'rkmbelur@gmail.com',
      password: 'repass1234',
      loading: false,
      apiErrorMessage: '',
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

  login = async () => {
    this.setState({ apiErrorMessage: '', loading: true });
    const { email, password, validationSuccess } = this.state;
    if (validationSuccess) {
      try {
        const res = await loginNGO({
          email,
          password
        });

        if (!res.ok) {
          this.setState({
            apiErrorMessage: `Error ${res.code}: ${res.json.api_message}`,
            loading: false
          });

          if (res.code === 432) {
            let resetAction = null;
            resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'ngoAwaitingReview' })
              ]
            });
            this.props.navigation.dispatch(resetAction);
          }
        } else {
          const auth = { token: res.json.api_message.token, type: TYPE_NGO };
          await AsyncStorage.setItem('auth', JSON.stringify(auth));
          this.setState({ loading: false });
          this.props.navigation.navigate('common');
        }
      } catch (e) {
        // console.error(e);
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
            width: parseInt(width * 0.9),
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
              marginBottom: 40
            }}
          />
          <View style={{ padding: 10 }}>
            <TextField
              title="Email id"
              placeholder="Your registered email id"
              value={this.state.email}
              onChangeText={(txt) => {
                this.setState({ email: txt });
              }}
              markRequired
              validateOnStart
              validateOnBlur
              validateOnChange
              enableErrors
              validate="email"
              errorMessage="Valid email id required"
              onChangeValidity={this.onChangeValidity(0)}
            />
          </View>
          <View style={{ padding: 10 }}>
            <TextField
              title="Password"
              placeholder="Password"
              secureTextEntry
              value={this.state.password}
              onChangeText={(txt) => {
                this.setState({ password: txt });
              }}
              markRequired
              validateOnStart
              validateOnBlur
              validateOnChange
              enableErrors
              validate="required"
              errorMessage="Mandatory field"
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
            disabled={this.state.loading || !this.state.validationSuccess}
            label={!this.state.loading ? 'Login' : 'Loading ...'}
            labelStyle={!this.state.loading ? {} : { fontStyle: 'italic' }}
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={this.login}
          />
        </View>
        <View
          style={{
            marginTop: 0,
            flexDirection: 'row'
          }}>
          <Text style={[text.primaryText, { padding: 10, paddingRight: 0 }]}>
            Forgot password ?
          </Text>
          <TouchableOpacity
            onPress={alert}
            style={{ padding: 10, paddingLeft: 0 }}>
            <Text
              style={[
                text.primaryText,
                { color: colors.colorprimary0, fontWeight: '700' }
              ]}>
              {' '}
              Contact admin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

NGOLogin.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};
