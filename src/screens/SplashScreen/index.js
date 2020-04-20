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
import wah from '../../../assets/wah.png';
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
      timeout: false
    };
  }

  componentDidMount = async () => {
    let auth = await AsyncStorage.getItem('auth');
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    auth = auth ? JSON.parse(auth) : {};
    // console.log('ASYNCSTORAGE', auth, fcmToken);
    this.navigateAway(auth);

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
        this.props.navigation.navigate('systemError');
      }
    }

    if (auth.token && auth.type === TYPE_NGO) {
      const ngoDetails = await fetchNGODetails(auth.token);
      if (ngoDetails.ok) {
        const {
          address,
          email,
          name,
          phone_number,
          registration_number,
          user_id
        } = ngoDetails.api_message.json;
        this.context.updateNGOUser({
          address,
          email,
          name,
          phone: phone_number,
          regNo: registration_number,
          userId: user_id
        });
      }
      this.setState({ path: 'authorizedNGO' });
    } else if (auth.token && auth.type === TYPE_DONOR) {
      const donorDetails = await fetchDonorDetails(auth.token);
      // console.log(donorDetails);
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
      }
    } else {
      // no token present
      this.setState({ path: 'unauthorized' });
    }
    this.setLoading(false);
  };

  setLoading = (loading) => {
    this.setState({ loading });
  };

  /* messageListener = async () => {
    this.notificationListener = notifications().onNotification(
      (notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
      }
    );

    this.notificationOpenedListener = notifications().onNotificationOpened(
      (notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      }
    );

    const notificationOpen = await notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }; */

  navigateAway = (auth) => {
    this.counter += this.interval;
    if (this.counter >= this.interval * 2) {
      this.setState({ timeout: true });
    }
    setTimeout(async () => {
      if (!this.state.loading && this.state.path) {
        this.props.navigation.navigate(this.state.path);
      } else {
        this.navigateAway(auth);
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
          <ActivityIndicator color={colors.colorsecondary10} size={50} />
          {this.state.timeout ? (
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
