/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { call } from '../../util';
import { acceptNGORequest, rejectNGORequest } from './api';
import colors from '../../styles/color';
import text from '../../styles/text';
import { UPDATE_TYPES } from './constants';
// import items from './data';

export default function UpcomingPickup(props) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const accept = (ngoId) => async () => {
    setLoading(true);
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const acceptRes = await acceptNGORequest(auth.token, {
      ngo: ngoId,
      notes: 'accepted'
    });
    // console.log({ acceptRes });
    if (acceptRes.ok) {
      // eslint-disable-next-line camelcase
    } else {
      // some error handling will go here
    }
    setLoading(false);
  };

  const reject = (ngoId) => async () => {
    setLoading(true);
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const rejectRes = await rejectNGORequest(auth.token, {
      ngo: ngoId,
      notes: 'rejected'
    });
    // console.log({ rejectRes });
    if (rejectRes.ok) {
      // eslint-disable-next-line camelcase
    } else {
      // some error handling will go here
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderStyle: 'dashed',
        padding: 10,
        borderColor: colors.grey1,
        borderRadius: 4,
        marginBottom: 5
      }}>
      <Badge label={props.status} labelFormatterLimit={3} />
      <Text
        style={[
          text.primaryText,
          { color: colors.black, marginTop: 5, fontWeight: '700' }
        ]}>
        {props.name}
      </Text>
      <Text style={text.bodyText}>{`🌐 ${props.address}`}</Text>
      {props.notes ? (
        <Text style={[text.bodyText, { fontWeight: '600' }]}>
          {`✎ ${props.notes}`}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {/* items[0].data.map((d, idx) => (
          <View
            key={`item-small-${idx}`}
            style={{
              height: 50,
              width: 100,
              borderRadius: 3,
              flexDirection: 'row',
              backgroundColor: colors.grey3,
              marginRight: 7,
              marginBottom: 7,
              alignItems: 'center'
            }}>
            <View style={{ flex: 4, paddingLeft: 5 }}>
              <Text style={text.bodyText}>{d.name}</Text>
              <Text>5 {d.unit}</Text>
            </View>
          </View>
        )) */}
      </View>

      <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            padding: 7,
            borderRadius: 3,
            borderColor: colors.grey1,
            borderWidth: 1
          }}
          onPress={call(props.phoneNumber)}>
          <Text
            style={[
              text.primaryText,
              { color: colors.colorprimary0, fontWeight: '700' }
            ]}>
            CALL
          </Text>
        </TouchableOpacity>

        {props.status === UPDATE_TYPES.REQUEST && (
          <>
            <TouchableOpacity
              style={{
                padding: 7,
                borderRadius: 3,
                borderColor: colors.grey1,
                borderWidth: 1,
                marginRight: 15,
                marginLeft: 15
              }}
              onPress={reject(props.id)}>
              <Text
                style={[
                  text.primaryText,
                  { color: colors.grey0, fontWeight: '700' }
                ]}>
                REJECT
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 7,
                borderRadius: 3,
                borderColor: colors.grey1,
                borderWidth: 1
              }}
              onPress={accept(props.id)}>
              <Text
                style={[
                  text.primaryText,
                  { color: colors.colorsecondary20, fontWeight: '700' }
                ]}>
                ACCEPT
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

UpcomingPickup.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  notes: PropTypes.string
};

UpcomingPickup.defaultProps = {
  notes: ''
};
