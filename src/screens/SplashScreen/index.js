/* eslint-disable camelcase */
import React from 'react';
import { View, ActivityIndicator, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchNGODetails } from './api';
import colors from '../../styles/color';
import styles from '../../styles/style';
// import text from '../../styles/text';
import wah from '../../../assets/wah.png';
import { TYPE_NGO, TYPE_DONOR } from '../../constants';
import UserContext from '../../contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    let auth = await AsyncStorage.getItem('auth');
    // eslint-disable-next-line no-console
    console.log('ASYNCSTORAGE', auth);
    auth = auth ? JSON.parse(auth) : {};
    this.navigateAway(auth);

    if (!auth?.token) {
      await messaging().registerDeviceForRemoteMessages();
      const enabled = await messaging().hasPermission();
      let fcmToken = null;
      if (enabled) {
        fcmToken = await messaging().getToken();
      } else {
        await messaging().requestPermission();
        fcmToken = await messaging().getToken();
      }

      if (fcmToken) {
        // console.log({ fcmToken });
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } else {
        console.error('Failed', 'No token received');
        this.props.navigation.navigate('systemError');
      }
    } else {
      const ngoDetails = await fetchNGODetails(auth.token);
      // eslint-disable-next-line no-console
      console.log(ngoDetails);
      if (ngoDetails.ok) {
        const {
          address,
          email,
          name,
          phone_number,
          registration_number,
          user_id
        } = ngoDetails.json;
        this.context.updateUser({
          address,
          email,
          name,
          phone: phone_number,
          regNo: registration_number,
          userId: user_id
        });
      }
    }

    this.setLoading(false);
  };

  setLoading = (loading) => {
    this.setState({ loading });
  };

  /* messageListener = async () => {
    this.notificationListener = notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }; */

  navigateAway = (auth) => {
    setTimeout(async () => {
      if (!this.state.loading) {
        if (auth.token && auth.type === TYPE_NGO) {
          this.props.navigation.navigate('authorizedNGO');
        } else if (auth.token && auth.type === TYPE_DONOR) {
          this.props.navigation.navigate('authorized');
        } else {
          this.props.navigation.navigate('unAuthorized');
        }
      } else {
        this.navigateAway(auth);
      }
    }, 1000);
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
