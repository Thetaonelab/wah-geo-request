/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Polygon
} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
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
  updatePickupSchedule
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
      locationData: [],
      rawMode: false,
      donorDetailsVisible: false,
      loadingMap: true,
      loadingApi: false
    };
  }

  componentDidMount() {
    const { base } = this.context.ngo;
    this.setState({
      base,
      region: {
        ...base,
        latitudeDelta: 0.5219515622656417,
        longitudeDelta: 0.3920997306704379
      },
      radius: this.pointToMaxRadiusInKM(base),
      loadingMap: false
    });
  }

  // TODO: accuracy is low, need to rewrite
  pointToMaxRadiusInKM = (
    point,
    delta = { latitudeDelta: 0, longitudeDelta: 0.3921 }
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

    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};

    // console.log({ region, base, radius });
    if (radius > 3) {
      this.setState({ loadingApi: true });
      const locRes = await getLocationData(auth.token, {
        lat: center.latitude,
        lon: center.longitude,
        radius: radius * 1000
      });
      // console.log({ locRes });
      this.setState({
        locationData: locRes.json,
        rawMode: false,
        loadingApi: false
      });
    } else if (radius > 1) {
      this.setState({ loadingApi: true });
      const locRes = await getLocationDataRaw(auth.token, {
        lat: center.latitude,
        lon: center.longitude,
        radius: radius * 1000
      });
      // console.log({ locRes });
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
  };

  /*   dismissModal = () => {
    this.setState((st) => ({ modalVisible: false }));
  };
 */
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
        <MapView
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
            radius={this.state.radius * 1000}
            strokeColor={colors.black}
            strokeWidth={3}
            // fillColor={colors.colorsecondary24}
            lineCap="round"
            lineJoin="round"
            lineDashPattern={[400, 500, 600]}
            lineDashPhase={100}
          />
          {this.state.locationData.map((dt, idx) => (
            <>
              {this.state.rawMode ? (
                <Marker
                  coordinate={{ latitude: dt.lat, longitude: dt.lon }}
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
                <>
                  <Polygon
                    key={`poly-${idx}`}
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
                </>
              )}
            </>
          ))}
        </MapView>
        <BottomView />

        {!this.state.loadingApi && this.state.rawMode && (
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
          />
        )}
      </View>
    );
  }
}

MapOverlay.contextType = UserContext;
