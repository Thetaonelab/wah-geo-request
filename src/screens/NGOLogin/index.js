/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wah from '../../../assets/wah.png';

const { width, height } = Dimensions.get('window');

export default class NGOLogin extends React.Component {
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
          <TextField placeholder="" title="Mobile number" />
          <TextField placeholder="" title="Password" />
          <Button
            label="Login"
            backgroundColor={colors.colorprimary1}
            style={{ marginTop: 30, marginBottom: 10 }}
            onPress={() => {
              this.props.navigation.navigate('authorizedNGO');
            }}
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
    navigate: PropTypes.func.isRequired
  }).isRequired
};
