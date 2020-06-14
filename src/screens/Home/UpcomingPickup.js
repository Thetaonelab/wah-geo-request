/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Badge } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncAlert from '../../components/Helpers/AsyncAlert';
import { call } from '../../util';
import { acceptNGORequest, rejectNGORequest } from './api';
import colors from '../../styles/color';
import text from '../../styles/text';
import { REQUEST_STATUS } from '../../constants';
// import items from './data';
const { /* height, */ width } = Dimensions.get('window');

export default function UpcomingPickup(props) {
  // eslint-disable-next-line no-unused-vars
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const accept = (ngoId) => async () => {
    const res = await AsyncAlert.alert(
      'Confirm accepting request ?',
      'The NGO will be notified about this activity and will be able to call you in your registered mobile number.',
      [{ text: 'OK' }, { text: 'Cancel' }]
    );
    if (res === 'Cancel') {
      return;
    }
    setAcceptLoading(true);
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
    setAcceptLoading(false);
    props.stateChangedSoReload();
  };

  const reject = (ngoId) => async () => {
    const res = await AsyncAlert.alert(
      'Confirm rejecting request ?',
      'The NGO will not be able to collect the givaways listed by you.',
      [{ text: 'OK' }, { text: 'Cancel' }]
    );
    if (res === 'Cancel') {
      return;
    }
    setRejectLoading(true);
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
    setRejectLoading(false);
    props.stateChangedSoReload();
  };

  return (
    <View
      style={{
        alignItems: 'flex-start',
        borderBottomWidth: 0,
        borderStyle: 'dashed',
        padding: 10,
        borderColor: colors.grey1,
        borderRadius: 4,
        marginBottom: 5,
        backgroundColor: colors.grey3,
        width: width * 0.8,
        marginRight: 15,
        height: 170,
        justifyContent: 'space-between'
      }}>
      <View>
        <Badge label={props.statusStr} labelFormatterLimit={3} />
        <Text
          style={[
            text.primaryText,
            { color: colors.black, marginTop: 5, fontWeight: '700' }
          ]}>
          {props.name}
        </Text>
        <Text
          style={text.bodyText}
          numberOfLines={3}>{`🌐 ${props.address}`}</Text>
        {props.ngoNotes ? (
          <Text style={[text.bodyText, { fontWeight: '600' }]}>
            {`✎ ${props.ngoNotes}`}
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          marginTop: 10
        }}>
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

        {props.status === REQUEST_STATUS.REJECTED &&
          (acceptLoading ? (
            <ActivityIndicator color={colors.colorsecondary10} size={30} />
          ) : (
            <TouchableOpacity
              style={{
                padding: 7,
                borderRadius: 3,
                borderColor: colors.grey1,
                borderWidth: 1,
                marginLeft: 15,
                marginRight: 15
              }}
              onPress={accept(props.id)}>
              <Text
                style={[
                  text.primaryText,
                  { color: colors.colorsecondary20, fontWeight: '700' }
                ]}>
                Re-ACCEPT
              </Text>
            </TouchableOpacity>
          ))}

        {props.status === REQUEST_STATUS.REQUESTED && (
          <>
            {acceptLoading ? (
              <ActivityIndicator color={colors.colorsecondary10} size={30} />
            ) : (
              <TouchableOpacity
                style={{
                  padding: 7,
                  borderRadius: 3,
                  borderColor: colors.grey1,
                  borderWidth: 1,
                  marginLeft: 15,
                  marginRight: 15
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
            )}
            {rejectLoading ? (
              <ActivityIndicator color={colors.colorsecondary10} size={30} />
            ) : (
              <TouchableOpacity
                style={{
                  padding: 7,
                  borderRadius: 3,
                  borderColor: colors.grey1,
                  borderWidth: 1
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
            )}
          </>
        )}
      </View>
    </View>
  );
}

UpcomingPickup.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  statusStr: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  stateChangedSoReload: PropTypes.func.isRequired,
  // notes: PropTypes.string,
  ngoNotes: PropTypes.string
};

UpcomingPickup.defaultProps = {
  // notes: '',
  ngoNotes: ''
};
