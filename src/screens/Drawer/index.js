import React /* useState */ from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import DrawerItem from './DrawerItem';

export default function Drawer(props) {
  return (
    <View style={[styles.parentContainer, { padding: 0 }]}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.colorprimary0,
          padding: 20,
          justifyContent: 'center'
        }}>
        <Text style={text.appbarText}>
          Ramakrishna Mission Calcutta Students Home
        </Text>
        <Text style={text.bodyText}>
          Belgharia, Kolkata-56, West Bengal, India
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          backgroundColor: colors.white,
          alignSelf: 'stretch',
          padding: 20
        }}>
        {[
          { title: 'Profile', path: '' },
          { title: 'Active Requests', path: 'activeRequests' },
          { title: 'All Requests', path: '' },
          { title: 'Share App', path: '' },
          {
            title: 'Log out',
            path: 'common',
            callback: async () => {
              await AsyncStorage.setItem('auth', '');
            }
          }
        ].map((v) => (
          <DrawerItem navigation={props.navigation} config={v} />
        ))}
      </View>
    </View>
  );
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
