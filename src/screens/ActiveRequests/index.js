/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
// import AsyncStorage from '@react-native-community/async-storage';
import { askDonor, listDonorsNearby, updatePickupSchedule } from './api';
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
      loading: false
    };
  }

  componentDidMount() {}

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
          <DonorList
            askDonorApi={askDonor}
            updatePickupSchedule={updatePickupSchedule}
            listDonorsNearby={listDonorsNearby}
            lat={22.3}
            lon={88.3}
            radius={30000}
          />
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
