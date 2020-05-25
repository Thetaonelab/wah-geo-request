/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Polygon
} from 'react-native-maps';
import { Avatar } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { getRandomColor } from '../../util';
import BottomView from './BottomView';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import styleJson from './styleJson';
// import ownStyle from './style';
import UserContext from '../../contexts/UserContext';
import {
  getLocationData,
  getLocationDataRaw,
  updatePickupSchedule,
  markAsCompleted
} from './api';
import DonorDetails from './DonorDetails';
import { REQUEST_STATUS } from '../../constants';

const { width, height } = Dimensions.get('window');

export default class MapOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: null,
      region: null,
      radius: null,
      defaultServiceRadius: 30,
      locationData: [],
      rawMode: false,
      donorDetailsVisible: false,
      loadingMap: true,
      loadingApi: false
    };
  }

  componentDidMount() {
    this.resetMap();
  }

  // TODO: accuracy is low, need to rewrite
  pointToMaxRadiusInKM = (
    point,
    delta = {
      latitudeDelta: 0.8129076855753112,
      longitudeDelta: 0.5765921249985695
    }
  ) =>
    parseInt(
      Math.abs(
        (delta.longitudeDelta * 40075 * Math.cos(point.latitude)) / 360
      ) / 2
    );

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

  distance = (lat1, lon1, lat2, lon2, unit = 'K') => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist *= 1.609344;
    }
    if (unit === 'N') {
      dist *= 0.8684;
    }
    return dist;
  };

  onRegionChangeComplete = async (center) => {
    const region = center;
    // const base = { latitude: center.latitude, longitude: center.longitude };
    const radius = this.pointToMaxRadiusInKM(
      { latitude: center.latitude, longitude: center.longitude },
      {
        latitudeDelta: center.latitudeDelta,
        longitudeDelta: center.longitudeDelta
      }
    );
    this.setState({ region, radius });

    // console.log({ region, radius });
    if (radius > 3) {
      this.setState({ locationData: [] });
      let auth = await AsyncStorage.getItem('auth');
      auth = auth ? JSON.parse(auth) : {};
      this.setState({ loadingApi: true });
      const locRes = await getLocationData(auth.token, {
        lat: center.latitude,
        lon: center.longitude,
        radius: radius * 1000
      });
      /* console.log({ ...locRes.json });

      locRes.json.forEach((v) => {
        console.log(
          this.distance(
            v.center.lat,
            v.center.long,
            center.latitude,
            center.longitude
          )
        );
      }); */
      if (locRes.ok) {
        this.setState({
          locationData: locRes.json,
          rawMode: false,
          loadingApi: false
        });
      }
    } else if (radius > 1) {
      this.setState({ locationData: [] });
      let auth = await AsyncStorage.getItem('auth');
      auth = auth ? JSON.parse(auth) : {};
      this.setState({ loadingApi: true });
      const locRes = await getLocationDataRaw(auth.token, {
        lat: center.latitude,
        lon: center.longitude,
        radius: radius * 1000
      });
      // console.log({ locRes });
      if (locRes.ok) {
        const data = locRes.json.api_message?.map((donor) => ({
          id: donor.donor,
          name: donor.name,
          distance: `${(donor.distance / 1000).toFixed(1)}KM`,
          desc: donor.giveaway_list
            .map((item) => `${item.name}: ${item.qty}${item.unit}`)
            .join(', '),
          status: donor.status_code,
          statusStr: donor.status,
          lat: donor.lat,
          lon: donor.lon,
          phoneNumber: donor.phone,
          address: donor.address,
          notes: donor.notes,
          ngoNotes: donor.ngo_notes,
          loading: false
        }));
        // console.log(data);
        this.setState({ locationData: data, rawMode: true, loadingApi: false });
      }
    }
  };

  setModalVisible = (val, item) => () => {
    const details = item
      ? {
          donorId: item.id,
          name: item.name,
          distance: item.distance,
          note: item.note,
          address: item.address,
          desc: item.desc,
          lat: item.lat,
          lon: item.lon,
          status: item.statusStr,
          statusCode: item.status,
          phoneNumber: item.phoneNumber,
          notes: item.notes,
          ngoNotes: item.ngoNotes,
          loading: false
        }
      : null;
    this.setState({
      donorDetailsVisible: val,
      details
    });
  };

  updatePickupSchedule = async (donor, scheduleNote) => {
    const { activateSnackbar } = this.props.navigation.getScreenProps();
    const { details } = this.state;
    details.loading = true;
    this.setState({ details: { ...details } });
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const updatePickupScheduleRes = await updatePickupSchedule(auth.token, {
      donor,
      ngo_notes: scheduleNote
    });
    // console.log({ updatePickupScheduleRes });
    details.loading = false;
    details.ngoNotes = scheduleNote;
    details.statusCode = REQUEST_STATUS.PICKUP_SCHEDULE_UPDATED;
    details.status = 'PICKUP_SCHEDULE_UPDATED';
    this.setState({ details: { ...details } });
    activateSnackbar('Pickup schedule updated successfully!', 'success');
  };

  markAsCompleted = async (donor) => {
    const { activateSnackbar } = this.props.navigation.getScreenProps();
    const { details } = this.state;
    details.loading = true;
    this.setState({ details: { ...details } });
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const markAsCompletedRes = await markAsCompleted(auth.token, {
      donor
    });
    details.loading = false;
    details.statusCode = REQUEST_STATUS.PICKED_UP;
    details.status = 'COMPLETED';
    this.setState({ details: { ...details } });
    activateSnackbar('Request closed successfully', 'success');
  };

  /*   dismissModal = () => {
    this.setState((st) => ({ modalVisible: false }));
  };
 */

  resetMap = () => {
    const { base } = this.context.ngo;
    const region = {
      ...base,
      latitudeDelta: 0.8129076855753112,
      longitudeDelta: 0.5765921249985695
    };
    this.setState({
      base,
      region,
      radius: this.pointToMaxRadiusInKM(base),
      loadingMap: false
    });
    if (this.mapRef) {
      this.mapRef.animateToRegion(region, 1000);
    }
  };

  render() {
    if (this.state.loadingMap) {
      return (
        <View style={[styles.parentContainer, { padding: 0 }]}>
          <ActivityIndicator size={50} color={colors.colorsecondary10} />
        </View>
      );
    }

    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        {this.state.loadingApi && (
          <View
            style={{
              backgroundColor: colors.colorgreen1,
              position: 'absolute',
              left: 10,
              top: 10,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              zIndex: 999
            }}>
            <Text style={[text.primaryText, { fontStyle: 'italic' }]}>
              Loading...
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 4,
            backgroundColor: colors.white,
            elevation: 4,
            position: 'absolute',
            right: 10,
            top: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.grey0,
            borderWidth: 1,
            zIndex: 999
          }}
          onPress={this.resetMap}>
          {/* <Text
              style={{ fontSize: 14, color: colors.red, textAlign: 'center' }}>
              ⌖
            </Text> */}
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: colors.colorsecondary10
            }}
          />
        </TouchableOpacity>
        <MapView.Animated
          ref={(component) => {
            this.mapRef = component;
          }}
          customMapStyle={styleJson}
          provider={PROVIDER_GOOGLE}
          style={{ height: height - 80, width }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          moveOnMarkerPress={false}
          showsUserLocation={false}>
          <Circle
            center={this.state.base}
            radius={this.state.radius * 50}
            strokeColor={colors.transparent}
            fillColor={colors.colorsecondary10}
          />
          <Circle
            center={this.state.base}
            radius={this.state.defaultServiceRadius * 1000}
            strokeColor={colors.black}
            strokeWidth={3}
            fillColor={colors.colorsecondary24}
            lineCap="round"
            lineJoin="round"
          />
          <Circle
            center={this.state.region}
            strokeColor={colors.transparent}
            radius={this.state.radius * 1000}
            fillColor={colors.colorsecondary14}
            lineCap="round"
            lineJoin="round"
          />

          {this.state.locationData.map((dt, idx) => (
            <View key={`marker-${idx}`}>
              {this.state.rawMode ? (
                <Marker
                  coordinate={{ latitude: dt.lat, longitude: dt.lon }}
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
                    onPress={this.setModalVisible(true, dt)}>
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
                      <Text style={text.appbarText}>
                        {`${dt.name} | ${dt.distance} away`}
                      </Text>
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
                <View key={`poly-${idx}`}>
                  <Polygon
                    coordinates={dt.hex_boundary.map((pt) => ({
                      latitude: pt[0],
                      longitude: pt[1]
                    }))}
                    strokeWidth={2}
                    strokeColor={colors.grey2}
                    fillColor={this.numberToColor(dt.num_donors)}
                    tappable={true}
                  />
                  <Marker
                    coordinate={{
                      latitude: dt.center.lat,
                      longitude: dt.center.long
                    }}
                    key={`marker-${idx}`}>
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
                        {`${dt.num_donors}`}
                      </Text>
                    </View>
                  </Marker>
                </View>
              )}
            </View>
          ))}
        </MapView.Animated>
        <BottomView />

        {!this.state.loadingApi && this.state.rawMode && this.state.details && (
          <DonorDetails
            visible={this.state.donorDetailsVisible}
            donorId={this.state.details?.donorId}
            name={this.state.details?.name}
            distance={this.state.details?.distance}
            giveawayList={this.state.details?.desc}
            address={this.state.details?.address}
            note={this.state.details?.note}
            lat={this.state.details?.lat}
            lon={this.state.details?.lon}
            status={this.state.details?.status}
            statusCode={this.state.details?.statusCode}
            phoneNumber={this.state.details?.phoneNumber}
            notes={this.state.details?.notes}
            ngoNotes={this.state.details?.ngoNotes}
            loading={this.state.details?.loading}
            dismiss={() => {
              this.setState({ donorDetailsVisible: false });
            }}
            updatePickupSchedule={this.updatePickupSchedule}
            markAsCompleted={this.markAsCompleted}
          />
        )}
      </View>
    );
  }
}

MapOverlay.contextType = UserContext;

MapOverlay.propTypes = {
  navigation: PropTypes.shape({
    getScreenProps: PropTypes.func.isRequired
  }).isRequired
};
