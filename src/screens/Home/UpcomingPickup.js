/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import colors from '../../styles/color';
import text from '../../styles/text';
import { UPDATE_TYPES } from './constants';
// import items from './data';

export default function UpcomingPickup(props) {
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
      <Badge label={props.type} labelFormatterLimit={3} />
      <Text style={[text.primaryText, { color: colors.black, marginTop: 5 }]}>
        RAMAKRISHNA MISSION CALCUTTA STUDENTS HOME
      </Text>
      {props.type === UPDATE_TYPES.PICKUP && (
        <Text style={text.secondaryText}>Pickup Time: 2.30 PM, Tomorrow</Text>
      )}
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
      {props.type === UPDATE_TYPES.PICKUP ||
      props.type === UPDATE_TYPES.AWAIT_PICKUP ? (
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            padding: 7,
            borderRadius: 3,
            borderColor: colors.grey1,
            borderWidth: 1
          }}>
          <Text
            style={[
              text.primaryText,
              { color: colors.colorprimary0, fontWeight: '700' }
            ]}>
            CALL
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={{
              padding: 7,
              borderRadius: 3,
              borderColor: colors.grey1,
              borderWidth: 1,
              marginRight: 15
            }}>
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
            }}>
            <Text
              style={[
                text.primaryText,
                { color: colors.colorsecondary20, fontWeight: '700' }
              ]}>
              ACCEPT
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

UpcomingPickup.propTypes = {
  type: PropTypes.string.isRequired
};
