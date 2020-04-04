/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Heatmap,
  Circle,
  Polygon
} from 'react-native-maps';
import { Switch } from 'react-native-ui-lib';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import styleJson from './styleJson';
import dat from './data.json';

const { width, height } = Dimensions.get('window');

export default class MapOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  numberToColor = (n) => {
    if (n > 5) {
      return colors.colorgreen0;
    }
    if (n > 3) {
      return colors.colorgreen1;
    }
    if (n > 1) {
      return colors.colorgreen2;
    }
    if (n === 0) {
      return colors.colorgreen3;
    }
    if (n > -2) {
      return colors.colorred3;
    }
    if (n > -3) {
      return colors.colorred2;
    }
    if (n > -4) {
      return colors.colorred1;
    }
    return colors.colorred0;
  };

  render() {
    const baseLat = 22.3;
    const baseLong = 88.3;

    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        <MapView
          customMapStyle={styleJson}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 5, width }}
          initialRegion={{
            latitude: baseLat,
            longitude: baseLong,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0821
          }}>
          {dat.map((dt, idx) => (
            <>
              <Polygon
                key={`poly-${idx}`}
                coordinates={dt.boundary}
                strokeWidth={2}
                strokeColor={colors.grey2}
                fillColor={this.numberToColor(dt.colorGrade)}
              />
              <Marker coordinate={dt.center} key={`marker-${idx}`}>
                <View
                  styele={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Text color={colors.black}>
                    {`${dt.typeMap.p}-${dt.typeMap.c}`}
                  </Text>
                </View>
              </Marker>
            </>
          ))}
        </MapView>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.colorsecondary20,
            width,
            padding: 20
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors.green,
                  borderRadius: 15,
                  marginRight: 5,
                  borderWidth: 3,
                  borderColor: colors.grey2
                }}
              />
              <Text style={text.primaryText}>Truckers needing food</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: colors.red,
                  borderRadius: 15,
                  marginRight: 5,
                  borderWidth: 3,
                  borderColor: colors.grey2
                }}
              />
              <Text style={text.primaryText}>Food providers</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderColor: colors.grey1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              marginTop: 20
            }}>
            <Text style={[text.primaryText, { marginRight: 20 }]}>
              I am hungry, put me on the map
            </Text>
            <Switch />
          </View>
          <View
            style={{
              alignItems: 'center',
              padding: 10
            }}>
            <Text style={text.bodyText}>
              You have been heard and we will do our best.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
