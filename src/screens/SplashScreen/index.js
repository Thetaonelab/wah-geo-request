/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchNGODetails, fetchDonorDetails } from './api';
import colors from '../../styles/color';
import text from '../../styles/text';
import styles from '../../styles/style';
import wah from '../../../assets/wah.png';
import { TYPE_NGO, TYPE_DONOR } from '../../constants';
import UserContext from '../../contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default class SplashScreen extends React.Component {
  counter = 0;

  interval = 1000;

  unmounted = false;

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

  componentWillUnmount() {
    this.unmounted = true;
  }

  doInit = async () => {
    this.setLoading(true);

    let auth = await AsyncStorage.getItem('auth');
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    auth = auth ? JSON.parse(auth) : {};
    // eslint-disable-next-line no-console
    // console.log('ASYNCSTORAGE', auth, fcmToken);

    if (!fcmToken) {
      if (Platform.OS === 'ios') {
        fcmToken = 'ios-configuration-to-be-done';
      } else {
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
    }
    // eslint-disable-next-line no-console
    // console.log('ASYNCSTORAGE SET', auth, fcmToken);

    if (auth.token && auth.type === TYPE_NGO) {
      const ngoDetails = await fetchNGODetails(auth.token);
      // console.log(ngoDetails);
      if (ngoDetails.ok) {
        const {
          address,
          email,
          name,
          phone_number,
          registration_number,
          user_id,
          lat,
          lon
        } = ngoDetails.json.api_message;
        this.context.updateNGOUser({
          address,
          email,
          name,
          phone: phone_number,
          regNo: registration_number,
          userId: user_id,
          base: { latitude: lat, longitude: lon }
        });
        this.setState({ path: 'authorizedNGO' });
      } else {
        this.setState({
          errorMessage: `Error ${ngoDetails.code}: ${ngoDetails.json.api_message}`
        });
      }
    } else if (auth.token && auth.type === TYPE_DONOR) {
      const donorDetails = await fetchDonorDetails(auth.token);
      if (donorDetails.ok) {
        const {
          address,
          complex_name,
          door_no,
          landmark,
          lat,
          lon,
          name,
          phone_number,
          user_id,
          has_give_away_list
        } = donorDetails.json.api_message;
        this.context.updateUser({
          address,
          name,
          phone: phone_number,
          userId: user_id
        });
        const path = has_give_away_list
          ? 'homeStack'
          : 'authorizedPreHomeStack';
        this.setState({ path });
      } else {
        this.setState({
          errorMessage: `Error ${donorDetails.code}: ${donorDetails.json.api_message}`
        });
      }
    } else {
      // no token present
      this.setState({ path: 'unauthorized' });
    }
    this.setLoading(false);

    if (!this.counter) this.navigateAway();
  };

  setLoading = (loading) => {
    if (loading === true) {
      this.setState({ loading, errorMessage: '' });
    } else {
      this.setState({ loading });
    }
  };

  navigateAway = () => {
    this.counter += this.interval;
    if (this.counter >= this.interval * 2) {
      if (!this.unmounted) this.setState({ timeout: true });
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
        <View style={{ flex: 2 }}>
          {this.state.errorMessage ? (
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  text.secondaryText,
                  { color: colors.red, fontWeight: '700', textAlign: 'center' }
                ]}>
                {this.state.errorMessage}
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40
                }}
                onPress={this.doInit}>
                <Text
                  style={[text.primaryText, { color: colors.colorprimary0 }]}>
                  RETRY
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator color={colors.colorsecondary10} size={50} />
          )}
          {this.state.timeout /* && !this.state.errorMessage */ ? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
              }}
              onPress={async () => {
                await AsyncStorage.setItem('auth', '');
                this.props.navigation.navigate('common');
              }}>
              <Text
                style={[text.primaryText, { color: colors.colorsecondary20 }]}>
                Clear Data
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
