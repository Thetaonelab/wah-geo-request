/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import colors from '../../styles/color';
import text from '../../styles/text';

const { width } = Dimensions.get('window');

export default function BottomView() {
  const colorSet = [
    colors.colorgreen0,
    colors.colorgreen1,
    colors.colorgreen2,
    colors.colorgreen3,
    colors.colorgreen4,
    colors.colorgreen5,
    colors.colorgreen6
  ];
  return (
    <View
      style={{
        height: 180,
        backgroundColor: colors.grey1,
        width,
        padding: 20,
        paddingTop: 5
      }}>
      <View
        style={{
          width: '100%',
          height: 30,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'center',
          padding: 3
        }}>
        {colorSet.map((col, idx) => (
          <View
            key={`key-col-${idx}`}
            style={{
              flex: 1,
              backgroundColor: col,
              height: 20
            }}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Text style={text.bodyText}> More donors</Text>
        <Text style={text.bodyText}>Less donors </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 1,
          borderColor: colors.white,
          paddingTop: 6,
          marginTop: 10,
          paddingHorizontal: 10
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.colorsecondary24,
              borderWidth: 2,
              borderColor: colors.black,
              marginRight: 10
            }}
          />
          <Text style={text.bodyText}>Service Area</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.colorsecondary10,
              borderWidth: 0,
              borderColor: colors.black,
              marginRight: 10
            }}
          />
          <Text style={text.bodyText}>NGO location</Text>
        </View>
      </View>
    </View>
  );
}
