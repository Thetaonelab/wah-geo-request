/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { Button, Avatar } from 'react-native-ui-lib';
import moment from 'moment';
import { getRandomColor } from '../../util';
import colors from '../../styles/color';
import text from '../../styles/text';
// import ownStyle from './style';
import DonorDetails from './DonorDetails';
import { REQUEST_STATUS } from '../../constants';

export default class DonorList extends Component {
  loadDataAfterModalClose = false;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: true,
      errorMessage: '',
      details: null,
      data: []
    };
  }

  componentDidMount() {
    this.loadData();
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getLoading(index) {
    return this.state.data[index].loading;
  }

  setLoading(index, isLoading) {
    this.setState((ps) => {
      const newData = ps.data;
      newData[index].loading = isLoading;
      return { data: [...newData] };
    });
  }

  getStatusStr = (apiStr) => {
    if (apiStr === 'PICKUP_SCHEDULE_UPDATED') return 'SCHEDULED';
    return apiStr;
  };

  loadData = async () => {
    this.setState({ loading: true });
    const { lat, lon, radius, listDonorsNearby } = this.props;
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const listDonorsNearbyRes = await listDonorsNearby(auth.token, {
      lat,
      lon,
      radius
    });
    // console.log({ listDonorsNearbyRes });
    if (listDonorsNearbyRes.ok) {
      // eslint-disable-next-line camelcase
      const data = listDonorsNearbyRes.json.api_message?.map((donor) => ({
        id: donor.donor,
        name: donor.name,
        distance: `${(donor.distance / 1000).toFixed(1)}KM`,
        desc: donor.giveaway_list
          .map((item) => `${item.name}: ${item.qty}${item.unit}`)
          .join(', '),
        status: donor.status_code,
        statusStr: this.getStatusStr(donor.status),
        lat: donor.lat,
        lon: donor.lon,
        phoneNumber: donor.phone,
        address: donor.address,
        notes: donor.notes,
        ngoNotes: donor.ngo_notes,
        lastUpdated: moment(donor.last_updated).fromNow(),
        loading: false
      }));
      if (this.mounted) this.setState({ data });
    } else if (this.mounted) {
      this.setState({
        errorMessage: `Error ${listDonorsNearbyRes.code}: ${listDonorsNearbyRes.json.api_message}`
      });
    }
    if (this.mounted) this.setState({ loading: false });
  };

  setModalVisible = (val, item) => {
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
      modalVisible: val,
      details
    });
  };

  askButtonPress = (donorId, index) => async () => {
    const { activateSnackbar } = this.props;
    this.setLoading(index, true);
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const askDonorRes = await this.props.askDonorApi(auth.token, {
      donor: donorId
    });
    // console.log({ askDonorRes });
    if (askDonorRes.ok) {
      // this.setState({ data });
    } else {
      this.setState({
        // eslint-disable-next-line no-undef
        errorMessage: `Error ${listDonorsNearbyRes.code}: ${listDonorsNearbyRes.json.api_message}`
      });
    }
    this.setLoading(index, false);
    this.loadData();
    activateSnackbar('Request successful!', 'success');
  };

  updatePickupSchedule = async (donor, scheduleNote) => {
    const { activateSnackbar } = this.props;
    const { details } = this.state;
    details.loading = true;
    this.setState({ details: { ...details } });
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    // eslint-disable-next-line no-unused-vars
    const updatePickupScheduleRes = await this.props.updatePickupSchedule(
      auth.token,
      {
        donor,
        ngo_notes: scheduleNote
      }
    );
    console.log({ updatePickupScheduleRes });
    details.loading = false;
    if (updatePickupScheduleRes.ok || updatePickupScheduleRes.code === 422) {
      details.ngoNotes = scheduleNote;
      details.statusCode = REQUEST_STATUS.PICKUP_SCHEDULE_UPDATED;
      details.status = this.getStatusStr('PICKUP_SCHEDULE_UPDATED');
      this.setState({ details: { ...details } });
      activateSnackbar('Pickup schedule updated successfully!', 'success');
      this.loadDataAfterModalClose = true;

      if (updatePickupScheduleRes.code === 422) {
        activateSnackbar(updatePickupScheduleRes.json.api_message, 'error');
      }
    } else {
      activateSnackbar(updatePickupScheduleRes.json.api_message, 'error');
    }
  };

  markAsCompleted = async (donor) => {
    const { activateSnackbar } = this.props;
    const { details } = this.state;
    details.loading = true;
    this.setState({ details: { ...details } });
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    // eslint-disable-next-line no-unused-vars
    const markAsCompletedRes = await this.props.markAsCompleted(auth.token, {
      donor
    });
    details.loading = false;
    details.statusCode = REQUEST_STATUS.PICKED_UP;
    details.status = 'COMPLETED';
    this.setState({ details: { ...details } });
    activateSnackbar('Request closed successfully', 'success');
    this.loadDataAfterModalClose = true;
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        height: 80,
        borderBottomColor: colors.grey2,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
      }}
      onLongPress={() => this.setModalVisible(true, item)}>
      <View
        style={{
          alignItems: 'center',
          width: 70
        }}>
        <Avatar
          label={item.name.substring(0, 2)}
          backgroundColor={getRandomColor()}
        />
      </View>
      <View style={{ flex: 5 }}>
        <Text style={text.primaryText}>
          {`${item.name}`}{' '}
          <Text
            style={[
              text.bodyText,
              { fontStyle: 'normal', paddingLeft: 20, color: colors.grey5 }
            ]}>
            {`   [ ${item.phoneNumber.substring(
              0,
              2
            )}******${item.phoneNumber.substr(8, 2)} ]`}
          </Text>
        </Text>
        <Text
          style={[text.bodyText, { fontStyle: 'italic' }]}
          numberOfLines={1}>
          {item.desc}
        </Text>
        <Text
          style={[
            text.bodyText,
            {
              fontWeight: '700',
              padding: 5,
              paddingStart: 0
            }
          ]}>
          {item.distance}
        </Text>
      </View>

      {item.status === REQUEST_STATUS.NEW ? (
        <View style={{ flex: 3, alignItems: 'flex-end' }}>
          {this.getLoading(index) ? (
            <ActivityIndicator
              color={colors.colorsecondary10}
              size={20}
              style={{ marginRight: 30 }}
            />
          ) : (
            <Button
              label="Ask"
              size="xSmall"
              backgroundColor={colors.colorprimary1}
              onPress={this.askButtonPress(item.id, index)}
              labelStyle={[
                text.secondaryText,
                {
                  color: colors.white,
                  fontWeight: '700',
                  alignSelf: 'center',
                  opacity: 1
                }
              ]}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            />
          )}
        </View>
      ) : (
        <View style={{ marginEnd: 0, flex: 3, alignItems: 'flex-end' }}>
          <Text style={[text.bodyText, { fontWeight: '700' }]}>
            {item.statusStr}
          </Text>
          <Text style={[text.bodyText, { opacity: 0.4, textAlign: 'right' }]}>
            {item.lastUpdated}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  dismissModal = () => {
    if (this.loadDataAfterModalClose) this.loadData();
    this.loadDataAfterModalClose = false;
    this.setModalVisible(false);
  };

  render() {
    return (
      <ScrollView
        style={{ height: 600 * 0.8, flex: 1, alignSelf: 'stretch' }}
        contentContainerStyle={{
          marginTop: 20,
          alignItems: 'stretch'
        }}
        refreshControl={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              this.loadData();
            }}
          />
        }>
        {this.state.loading ? (
          <ActivityIndicator color={colors.colorsecondary10} size={50} />
        ) : (
          <>
            <View
              style={{
                paddingVertical: 8,
                borderColor: colors.grey1,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                alignSelf: 'stretch',
                alignItems: 'center'
              }}>
              <Text
                style={[
                  text.bodyText,
                  { fontStyle: 'italic', textAlign: 'center' }
                ]}>
                Long press to see details of a donor.
              </Text>
            </View>
            <View style={{ alignSelf: 'stretch' }}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                style={{ alignSelf: 'stretch' }}
                keyExtractor={(item) => `${item.name}${Math.random()}`}
              />
            </View>
          </>
        )}

        {this.state.modalVisible && (
          <DonorDetails
            visible={this.state.modalVisible}
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
            dismiss={this.dismissModal}
            updatePickupSchedule={this.updatePickupSchedule}
            markAsCompleted={this.markAsCompleted}
          />
        )}
      </ScrollView>
    );
  }
}

DonorList.propTypes = {
  askDonorApi: PropTypes.func.isRequired,
  updatePickupSchedule: PropTypes.func.isRequired,
  listDonorsNearby: PropTypes.func.isRequired,
  markAsCompleted: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  activateSnackbar: PropTypes.func.isRequired
};
