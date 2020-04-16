/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Polygon
} from 'react-native-maps';
import BottomView from './BottomView';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import styleJson from './styleJson';
// import ownStyle from './style';
import { getLocationData, getLocationDataRaw } from './api';
import ModalView from './ModalView';
import DonorDetails from './DonorDetails';

const { width, height } = Dimensions.get('window');

export default class MapOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: { latitude: 22.6573, longitude: 88.3624 },
      region: {
        latitude: 22.6573,
        longitude: 88.3624,
        latitudeDelta: 0.5219515622656417,
        longitudeDelta: 0.3920997306704379
      },
      radius: parseInt(
        Math.abs((0.3921 * 40075 * Math.cos(22.6573)) / 360) / 2
      ),
      locationData: [],
      rawMode: false,
      modalVisible: false,
      donorDetailsVisible: false
    };
  }

  async componentDidMount() {
    const { base, radius } = this.state;
    const locationData = await getLocationData({
      base,
      radius
    });
    this.setState({ locationData, rawMode: false });
  }

  numberToColor = (n) => {
    if (n > 50) {
      return colors.colorgreen0;
    }
    if (n > 25) {
      return colors.colorgreen1;
    }
    if (n > 12) {
      return colors.colorgreen2;
    }
    if (n > 6) {
      return colors.colorgreen3;
    }
    if (n > 3) {
      return colors.colorgreen4;
    }
    if (n > 1) {
      return colors.colorgreen5;
    }
    if (n > 0) {
      return colors.colorgreen6;
    }
    return colors.transparent;
  };

  onRegionChangeComplete = async (center) => {
    const region = center;
    const base = { latitude: center.latitude, longitude: center.longitude };
    const radius = parseInt(
      Math.abs(
        (center.longitudeDelta * 40075 * Math.cos(center.longitude)) / 360
      ) / 2
    );
    // console.log({ region, base, radius });

    this.setState({ region, base, radius });
    if (radius > 3) {
      const locationData = await getLocationData({
        base,
        radius
      });
      this.setState({ locationData, rawMode: false });
    } else if (radius > 1) {
      const locationData = await getLocationDataRaw({
        base,
        radius
      });

      this.setState({ locationData, rawMode: true });
    }
  };

  dismissModal = () => {
    this.setState((st) => ({ modalVisible: false }));
  };

  render() {
    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        <MapView
          customMapStyle={styleJson}
          provider={PROVIDER_GOOGLE}
          style={{ height: height - 80, width }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          moveOnMarkerPress={false}
          showsUserLocation>
          <Circle
            center={this.state.base}
            radius={this.state.radius * 1000}
            strokeColor={colors.transparent}
            fillColor={colors.colorsecondary24}
          />
          {this.state.locationData.map((dt, idx) => (
            <>
              {this.state.rawMode ? (
                <Marker
                  coordinate={dt}
                  key={`marker-${idx}`}
                  pinColor={colors.colorprimary0}
                  zIndex={100}
                  ref={(_marker) => {
                    this.marker = _marker;
                  }}
                  onCalloutPress={() => {
                    // not working
                    this.marker.hideCallout();
                  }}>
                  <MapView.Callout
                    tooltip={true}
                    onPress={() => {
                      this.setState({ donorDetailsVisible: true });
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.white,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        borderColor: colors.colorsecondary10,
                        borderWidth: 4
                      }}>
                      <Text style={text.appbarText}>Mr. Sen | 24 KM away</Text>
                      <Text style={text.secondaryText}>See details</Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.colorsecondary10,
                        width: 4,
                        height: 20,
                        alignSelf: 'center'
                      }}
                    />
                  </MapView.Callout>
                </Marker>
              ) : (
                <>
                  <Polygon
                    key={`poly-${idx}`}
                    coordinates={dt.boundary}
                    strokeWidth={2}
                    strokeColor={colors.grey2}
                    fillColor={this.numberToColor(dt.typeMap.p + dt.typeMap.c)}
                    tappable={true}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}
                  />
                  <Marker
                    coordinate={dt.center}
                    key={`marker-${idx}`}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}>
                    <View
                      styele={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text
                        style={[
                          text.bodyText,
                          { fontSize: 10, fontWeight: '700' }
                        ]}
                        color={colors.black}>
                        {`${dt.typeMap.p + dt.typeMap.c}`}
                      </Text>
                    </View>
                  </Marker>
                </>
              )}
            </>
          ))}
        </MapView>
        <BottomView />
        <ModalView
          modalVisible={this.state.modalVisible}
          dismissModal={this.dismissModal}
        />
        <DonorDetails
          name="Test"
          giveawayList="Rice 23Kg, Dal 10 Kg, Aloo 5 Kg"
          distance="2.3Km"
          visible={this.state.donorDetailsVisible}
          dismiss={() => {
            this.setState({ donorDetailsVisible: false });
          }}
        />
      </View>
    );
  }
}
