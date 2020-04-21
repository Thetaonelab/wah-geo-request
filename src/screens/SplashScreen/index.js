/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchNGODetails, fetchDonorDetails } from './api';
import colors from '../../styles/color';
import text from '../../styles/text';
import styles from '../../styles/style';
import wah from '../../../assets/test.png';
import { TYPE_NGO, TYPE_DONOR } from '../../constants';
import UserContext from '../../contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default class SplashScreen extends React.Component {
  counter = 0;

  interval = 1000;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      path: '',
      timeout: false,
      errorMessage: ''
    };
  }

  componentDidMount = async () => {
    this.doInit();
  };

  doInit = async () => {
    let auth = await AsyncStorage.getItem('auth');
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    auth = auth ? JSON.parse(auth) : {};
    // console.log('ASYNCSTORAGE', auth, fcmToken);

    if (!fcmToken) {
      await messaging().registerDeviceForRemoteMessages();
      const enabled = await messaging().hasPermission();
      if (enabled) {
        fcmToken = await messaging().getToken();
      } else {
        await messaging().requestPermission();
        fcmToken = await messaging().getToken();
      }
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } else {
        console.error('Failed', 'No token received');
        this.setState({ errorMessage: 'Error fetching fcm token' });
      }
    }

    // no token present
    this.setState({ path: 'unauthorized' });
    this.setLoading(false);

    if (!this.counter) this.navigateAway();
  };

  setLoading = (loading) => {
    this.setState({ loading });
  };

  navigateAway = () => {
    this.counter += this.interval;
    if (this.counter >= this.interval * 2) {
      this.setState({ timeout: true });
    }
    setTimeout(async () => {
      if (!this.state.loading && this.state.path) {
        this.props.navigation.navigate(this.state.path);
      } else {
        this.navigateAway();
      }
    }, this.interval);
  };

  render() {
    return (
      <View style={[styles.parentContainer, { backgroundColor: colors.white }]}>
        <View style={{ flex: 8, justifyContent: 'center' }}>
          <Image
            source={wah}
            style={{
              resizeMode: 'cover',
              height: parseInt(height / 8),
              width: parseInt(width / 3)
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.errorMessage ? (
            <View>
              <Text style={[text.secondaryText, { color: colors.red }]}>
                {this.state.errorMessage}
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: 'flex-end',
                  flex: 1,
                  justifyContent: 'center'
                }}
                onPress={this.doInit}>
                <Text style={[text.primaryText, { color: colors.black }]}>
                  RETRY
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator color={colors.colorsecondary10} size={50} />
          )}
          {this.state.timeout && !this.state.errorMessage ? (
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                flex: 1,
                justifyContent: 'center'
              }}
              onPress={async () => {
                await AsyncStorage.setItem('auth', '');
                this.props.navigation.navigate('common');
              }}>
              <Text
                style={[text.primaryText, { color: colors.colorsecondary20 }]}>
                Login again
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

SplashScreen.contextType = UserContext;
SplashScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
