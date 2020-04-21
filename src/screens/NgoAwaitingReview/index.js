/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { View, TextField, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wah from '../../../assets/test.png';

const { width, height } = Dimensions.get('window');

export default class NgoAwaitingReview extends React.Component {
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
            borderRadius: 3,
            alignItems: 'center'
          }}>
          <Image
            source={wah}
            style={{
              resizeMode: 'cover',
              height: 70,
              width: 140,
              marginBottom: 40
            }}
          />
          <Text style={text.appbarText}>Review Pending</Text>
          <Text
            style={[
              text.secondaryText,
              { textAlign: 'center', paddingVertical: 10, fontStyle: 'italic' }
            ]}>
            Thank you for registering for a cause. We will take a while to
            verify your registration. You might receive call (and /or email ) in
            the registered mobile number (email id) for verification. Once
            verification is complete you will be able to login.
          </Text>
          <Text
            style={[
              text.secondaryText,
              { textAlign: 'center', fontStyle: 'italic' }
            ]}>
            Meanwhile, you can contact administrator if you have any query.
          </Text>
        </View>
        <View
          style={{
            marginTop: 0,
            flexDirection: 'row'
          }}>
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
              Contact admin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

NgoAwaitingReview.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
