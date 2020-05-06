import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Share from 'react-native-share';
import UserContext from '../../contexts/UserContext';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import DrawerItem from './DrawerItem';

export default function Drawer(props) {
  const user = useContext(UserContext);
  const { address, name, phone /* , userId */ } = user.donor;
  return (
    <View style={[styles.parentContainer, { padding: 0 }]}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.colorsecondary10,
          padding: 20,
          justifyContent: 'center',
          alignSelf: 'stretch'
        }}>
        <Text style={[text.appbarText, { color: colors.black }]}>{name}</Text>
        <Text style={[text.secondaryText, { color: colors.black }]}>
          {phone}
        </Text>
        <Text
          style={[text.bodyText, { color: colors.black, fontStyle: 'italic' }]}>
          {address}
        </Text>
        {/* <Text style={[text.bodyText, { color: colors.black }]}>{userId}</Text> */}
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
          { title: 'About', path: 'about' },
          {
            title: 'Share app',
            path: '',
            callback: async () => {
              await Share.open({
                title: 'Share the app with your near & dear',
                subject: 'Sample subject',
                message: 'Sample message'
              });
            }
          },
          {
            title: 'Log out',
            path: 'common',
            callback: async () => {
              user.updateUser({
                address: '',
                name: '',
                phone: '',
                userId: ''
              });
              await AsyncStorage.setItem('auth', '');
            }
          }
        ].map((v) => (
          <DrawerItem
            navigation={props.navigation}
            config={v}
            key={`drawer-donor-${Math.random() * 1000}`}
          />
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
