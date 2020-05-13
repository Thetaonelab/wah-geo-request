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
  const { address, email, name, phone, regNo /* , userId */ } = user.ngo;
  return (
    <View style={[styles.parentContainer, { padding: 0 }]}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.colorprimary0,
          padding: 20,
          justifyContent: 'center',
          alignSelf: 'stretch'
        }}>
        <Text style={[text.appbarText, { color: colors.black }]}>{name}</Text>
        <Text style={[text.bodyText, { color: colors.black }]}>{address}</Text>
        <Text style={[text.bodyText, { color: colors.black }]}>{email}</Text>
        <Text style={[text.bodyText, { color: colors.black }]}>{phone}</Text>
        <Text style={[text.bodyText, { color: colors.black }]}>{regNo}</Text>
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
          {
            title: 'Share App',
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
                email: '',
                name: '',
                phone: '',
                regNo: '',
                userId: ''
              });
              await AsyncStorage.setItem('auth', '');
            }
          }
        ].map((v) => (
          <DrawerItem navigation={props.navigation} config={v} key={v.title} />
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
