/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { askDonor, listDonorsNearby } from './api';
/* import { StackActions, NavigationActions } from 'react-navigation'; */
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
/* import ownStyle from './style'; */
import DonorList from '../MapOverlay/DonorList';

export default class ActiveRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [
        {
          name: 'Mr. Sen',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg',
          status: '✓ Accepted'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg',
          status: '⧖ Waiting'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg',
          status: '× Rejected'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg'
        },
        {
          name: 'Mr. Ghosh',
          distance: '2.5 KM',
          desc: 'Rice: 5Kg, Dal: 56 Kg',
          status: 'Accepted'
        }
      ]
    };
  }

  async componentDidMount() {
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const listDonorsNearbyRes = await listDonorsNearby(auth.token, {
      lat: 24.3,
      lon: 88.3,
      radius: 90000
    });
    // console.log({ listDonorsNearbyRes });
    if (listDonorsNearbyRes.ok) {
      // eslint-disable-next-line camelcase
      const data = listDonorsNearbyRes.json.api_message?.map((donor) => ({
        id: donor.donor,
        name: donor.name,
        distance: `${(donor.distance / 1000).toFixed(1)}KM`,
        desc: donor.giveaway_list
          .map((item) => `${item.name}: ${item.qty}${item.unit}`)
          .join(','),
        status: donor.status === 'Yet to contact' ? undefined : donor.status,
        lat: donor.lat,
        lon: donor.lon,
        phoneNumber: donor.phone,
        address: donor.address
      }));
      this.setState({ data });
    } else {
      this.setState({
        errorMessage: `Error ${listDonorsNearbyRes.code}: ${listDonorsNearbyRes.json.api_message}`
      });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={[styles.parentContainer]}>
        {this.state.loading ? (
          <ActivityIndicator color={colors.colorsecondary10} size={50} />
        ) : this.state.errorMessage ? (
          <View style={{ alignSelf: 'center', width: '70%' }}>
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
              {this.state.errorMessage}
            </Text>
          </View>
        ) : (
          <DonorList data={this.state.data} askDonorApi={askDonor} />
        )}
      </View>
    );
  }
}

ActiveRequests.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
