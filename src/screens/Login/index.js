/* eslint-disable no-unused-vars */
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

const { width, height } = Dimensions.get('window');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '9836825741'
    };
  }

  componentDidMount() {}

  validatePhoneNumber = (number) => {
    const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(number);
  };

  signInWithPhoneNumber = async () => {
    if (!this.validatePhoneNumber(this.state.phoneNumber)) {
      try {
        /* const confirmation = await auth().signInWithPhoneNumber(
          `+91${this.state.phoneNumber}`
        ); */
        this.props.navigation.navigate('otp', { confirmation: null });
      } catch (ex) {
        console.error(ex);
      }
    } else {
      alert('Invalid Phone Number');
    }
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
          <TextField
            placeholder="e.g. Justin Trudo"
            title="Your name"
            onChangeText={(val) => {
              // eslint-disable-next-line react/no-unused-state
              this.setState({ name: val });
            }}
          />
          <TextField
            placeholder="e.g. 9988998899"
            title="Phone number"
            value={this.state.phoneNumber}
            onChangeText={(val) => {
              this.setState({ phoneNumber: val });
            }}
            showCharacterCounter={true}
            maxLength={10}
          />
          <Button
            label="Verify phone number"
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 30, marginBottom: 10 }}
            onPress={this.signInWithPhoneNumber}
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
    navigate: PropTypes.func.isRequired
  }).isRequired
};
