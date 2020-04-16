/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
/* import { StackActions, NavigationActions } from 'react-navigation'; */
import styles from '../../styles/style';
/* import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style'; */
import DonorList from '../MapOverlay/DonorList';

export default class ActiveRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {}

  render() {
    return (
      <View style={[styles.parentContainer]}>
        <DonorList data={this.state.data} />
      </View>
    );
  }
}

ActiveRequests.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
