/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Heatmap,
  Circle
} from 'react-native-maps';
import { Switch } from 'react-native-ui-lib';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import styleJson from './styleJson';

const { width, height } = Dimensions.get('window');

export default class MapOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const baseLat = 22.3;
    const baseLong = 88.3;

    const baseLatRed = 22.3;
    const baseLongRed = 88.3;
    const redPoints = [];
    for (let i = 0; i < 10; i++) {
      redPoints.push({
        latitude:
          baseLatRed +
          (Math.pow(-1, parseInt(Math.random() * 100)) *
            Math.random() *
            Math.random()) /
            100,
        longitude:
          baseLongRed +
          (Math.pow(-1, parseInt(Math.random() * 100)) *
            Math.random() *
            Math.random() *
            1) /
            100,
        weight: Math.random() > 0.5 ? 1 : 0.8
      });
    }

    const baseLatGreen = 22.3 + 0.02;
    const baseLongGreen = 88.3 + 0.01;
    const greenPoints = [];
    for (let i = 0; i < 10; i++) {
      greenPoints.push({
        latitude:
          baseLatGreen +
          (Math.pow(-1, parseInt(Math.random() * 100)) *
            Math.random() *
            Math.random()) /
            100,
        longitude:
          baseLongGreen +
          (Math.pow(-1, parseInt(Math.random() * 100)) *
            Math.random() *
            Math.random() *
            1) /
            100,
        weight: Math.random() > 0.5 ? 1 : 0.8
      });
    }

    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        <MapView
          customMapStyle={styleJson}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 5, width }}
          initialRegion={{
            latitude: baseLat,
            longitude: baseLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          <Heatmap
            points={redPoints}
            gradient={{
              colors: [colors.transparent, colors.red],
              startPoints: [0.5, 0.9]
            }}
            radius={50}
          />
          {/* <Circle
            center={{ latitude: baseLatRed, longitude: baseLongRed }}
            radius={800}
            strokeColor={colors.transparent}
            fillColor={colors.red}
          /> */}
          {redPoints.map((pt, idx) => {
            return <Marker coordinate={pt} pinColor={colors.red} />;
          })}

          <Heatmap
            points={greenPoints}
            gradient={{
              colors: [colors.transparent, colors.green],
              startPoints: [0.5, 0.9]
            }}
            radius={50}
          />
          {/* <Circle
            center={{ latitude: baseLatGreen, longitude: baseLongGreen }}
            radius={800}
            strokeColor={colors.transparent}
            fillColor={colors.green}
          /> */}
          {greenPoints.map((pt, idx) => {
            return <Marker coordinate={pt} pinColor={colors.green} />;
          })}
          {/*           <Heatmap
            points={points}
            gradient={{
              colors: [colors.red, colors.green],
              startPoints: [0.5, 0.9]
            }}
          />
 */}
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
            <Text style={[text.appbarText, { marginRight: 20 }]}>
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
