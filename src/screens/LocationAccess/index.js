/* eslint-disable no-console */
import React from 'react';
import { Text, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { TextField, Button } from 'react-native-ui-lib';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

import { registerDonor } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import { GOOGLE_GEOCODE_KEY } from '../../config';
import { TYPE_DONOR } from '../../constants';
// import ownStyle from './style';

export default class LocationAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLatLong: null,
      complexName: 'Alaktika',
      doorNo: '1b-807',
      landmark: 'city center 2',
      addressFromAPI: '',
      validArr: '00'.split('').map(() => false),
      validationSuccess: false,
      loading: false,
      apiErrorMessage: ''
    };
  }

  componentDidMount = async () => {
    await this.requestLocationPermission();
    Geocoder.init(GOOGLE_GEOCODE_KEY, {
      language: 'en'
    });
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

  handleOnPress = () => {
    // console.log(Geolocation.requestAuthorization);
    Geolocation.getCurrentPosition(
      (loc) => {
        this.setState({ locationLatLong: loc.coords });
        console.log(loc);
        Geocoder.from(loc.coords)
          .then((json) => {
            const addressComponent = json.results[0].formatted_address;
            console.log(addressComponent);
            this.setState({ addressFromAPI: addressComponent });
          })
          .catch((error) => console.warn(error));
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: Platform.OS !== 'android', timeout: 2000 }
    );
  };

  onSubmitPress = async () => {
    this.setState({ apiErrorMessage: '', loading: true });
    const {
      complexName,
      doorNo,
      landmark,
      addressFromAPI,
      validationSuccess,
      locationLatLong
    } = this.state;

    const { token, name, phoneNumber } = this.props.navigation.state.params;
    console.log({ token, name, phoneNumber });

    if (validationSuccess) {
      /* const { token, name, phoneNumber } = this.props.navigation.params;
      console.log({ token, name, phoneNumber }); */
      try {
        const body = {
          name,
          door: doorNo,
          landmark,
          complex_name: complexName,
          phone: phoneNumber,
          lat: locationLatLong.latitude,
          lon: locationLatLong.longitude,
          address: addressFromAPI
        };
        console.log(token, body);
        // eslint-disable-next-line no-unused-vars
        const donorRes = await registerDonor(token, body);
        console.log(donorRes);
        if (donorRes.ok) {
          const auth = {
            token: donorRes.json.api_message.token,
            type: TYPE_DONOR
          };
          await AsyncStorage.setItem('auth', JSON.stringify(auth));
          this.props.navigation.navigate('common');
        } else {
          throw new Error(
            `Error ${donorRes.code}: ${donorRes.json.api_message}`
          );
        }
      } catch (ex) {
        this.setState({ apiErrorMessage: ex.message, loading: false });
      }
    }
  };

  requestLocationPermission = async () => {
    const { activateSnackbar } = this.props.navigation.getScreenProps();
    try {
      check(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS
        })
      )
        .then(async (result) => {
          // console.log(result);
          switch (result) {
            case RESULTS.UNAVAILABLE:
              activateSnackbar(
                'LOCATION feature is not available (on this device / in this context)',
                'error'
              );
              /* console.warn(
                'LOCATION feature is not available (on this device / in this context)'
              ); */
              break;
            case RESULTS.DENIED:
              // eslint-disable-next-line no-case-declarations
              const resultReq = await request(
                Platform.select({
                  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                  ios: PERMISSIONS.IOS.LOCATION_ALWAYS
                })
              );
              if (resultReq === RESULTS.GRANTED) {
                activateSnackbar('LOCATION permission is granted', 'success');
              } else {
                activateSnackbar(
                  'LOCATION permission is denied and not requestable anymore',
                  'error'
                );
              }
              break;
            case RESULTS.GRANTED:
              activateSnackbar('LOCATION permission is granted', 'success');
              // console.warn('LOCATION permission is granted');
              break;
            case RESULTS.BLOCKED:
              activateSnackbar(
                'LOCATION permission is denied and not requestable anymore',
                'error'
              );
              /* console.warn(
                'LOCATION permission is denied and not requestable anymore'
              ); */
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.error('LOCATION permission error', error);
        });
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center'
          }}>
          {!this.state.locationLatLong ? (
            <View>
              <Text>This app needs to have location access.</Text>
              <Button
                label="OK fine!"
                backgroundColor={colors.colorprimary1}
                style={{ marginTop: 30, marginBottom: 10 }}
                onPress={this.handleOnPress}
              />
            </View>
          ) : (
            <View style={{ width: '80%' }}>
              <View style={{ padding: 10 }}>
                <Text
                  style={[
                    text.heroText,
                    { letterSpacing: 2, color: colors.colorprimary0 }
                  ]}>
                  ADDRESS
                </Text>
                <View
                  style={{
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.colorprimary0,
                    marginBottom: 15
                  }}>
                  <Text style={text.primaryText}>
                    {this.state.addressFromAPI || 'Fetching address ...'}
                  </Text>
                </View>
              </View>
              <View style={{ padding: 10 }}>
                <TextField
                  placeholder="e.g. Srimayee apartment"
                  title="Apartment / Complex name"
                  value={this.state.complexName}
                  onChangeText={(val) => {
                    this.setState({ complexName: val });
                  }}
                  validate={(val) => val && val.length >= 5}
                  validateOnStart
                  validateOnBlur
                  errorMessage="At least 5  letters."
                  onChangeValidity={this.onChangeValidity(0)}
                />
              </View>
              <View style={{ padding: 10 }}>
                <TextField
                  placeholder="e.g. 1C-809A"
                  title="Door / Flat No"
                  value={this.state.doorNo}
                  onChangeText={(val) => {
                    this.setState({ doorNo: val });
                  }}
                  validate={(val) => val && val.length >= 5}
                  validateOnStart
                  validateOnBlur
                  errorMessage="At least 5  letters."
                  onChangeValidity={this.onChangeValidity(1)}
                />
              </View>
              <View style={{ padding: 10 }}>
                <TextField
                  placeholder="e.g. Opp. to Mediasiti building"
                  title="Landmark"
                  value={this.state.landmark}
                  onChangeText={(val) => {
                    this.setState({ landmark: val });
                  }}
                  validate={(val) => val && val.length >= 5}
                  validateOnStart
                  validateOnBlur
                  errorMessage="At least 5  letters."
                  onChangeValidity={this.onChangeValidity(2)}
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
                onPress={this.onSubmitPress}
                disabled={this.state.loading || !this.state.validationSuccess}
                label={!this.state.loading ? 'Looks Good!' : 'Loading ...'}
                labelStyle={!this.state.loading ? {} : { fontStyle: 'italic' }}
              />
            </View>
          )}
        </View>
        {/* <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'center'
          }}
          onPress={async () => {
            await AsyncStorage.setItem('auth', '');
            this.props.navigation.navigate('common');
          }}>
          <Text style={[text.primaryText, { color: colors.colorsecondary20 }]}>
            Login again
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

LocationAccess.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    getScreenProps: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
