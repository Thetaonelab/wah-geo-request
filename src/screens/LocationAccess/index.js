/* eslint-disable no-console */
import React from 'react';
import { Text, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import { TextField, Button } from 'react-native-ui-lib';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
// import ownStyle from './style';

export default class LocationAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Geocoder.init('AIzaSyDBVtbo3bl7yNHa440W7VkEfxHwW5iBFiY', {
      language: 'en'
    });
  }

  handleOnPress = () => {
    // console.log(Geolocation.requestAuthorization);
    Geolocation.getCurrentPosition(
      (loc) => {
        this.setState({ locationLatLong: loc });
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

  onSubmitPress = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'home' })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    console.log(this.state);
    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
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
              <Text style={text.primaryText}>{this.state.addressFromAPI}</Text>
            </View>
            <TextField
              placeholder="e.g. Srimayee apartment"
              title="Apartment / Complex name"
              value={this.state.address1}
              onChangeText={(val) => {
                this.setState({ address1: val });
              }}
            />
            <TextField
              placeholder="e.g. 1C-809A"
              title="Door / Flat No"
              value={this.state.address2}
              onChangeText={(val) => {
                this.setState({ address2: val });
              }}
            />
            <TextField
              placeholder="e.g. Opp. to Mediasiti building"
              title="Landmark"
              value={this.state.landmark}
              onChangeText={(val) => {
                this.setState({ landmark: val });
              }}
            />
            <Button
              label="Looks Good!"
              backgroundColor={colors.colorprimary1}
              style={{ marginTop: 30, marginBottom: 10 }}
              onPress={this.onSubmitPress}
            />
          </View>
        )}
      </View>
    );
  }
}

LocationAccess.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
