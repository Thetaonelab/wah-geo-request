/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { Badge } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';
import UpcomingPickup from './UpcomingPickup';
import { fetchGiveawayList, fetchNGORequests, fetchDonorDetails } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import wahIcon from '../../../assets/wah-icon.png';
import UserContext from '../../contexts/UserContext';

const { /* height, */ width } = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      giveawayListLoading: true,
      ngoRequestLoading: true,
      updates: []
    };
  }

  async componentDidMount() {
    this.unsubscribeFocus = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchGiveawayList();
      }
    );
    this.fetchNGORequests();
  }

  componentWillUnmount() {
    this.unsubscribeFocus.remove();
  }

  fetchDonorDetails = async () => {
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const donorDetails = await fetchDonorDetails(auth.token);
    // console.log({ donorDetails });
    if (donorDetails.ok) {
      const { wah_points, num_donations } = donorDetails.json.api_message;
      this.context.updateUser({
        wahPoints: wah_points,
        numDonations: num_donations
      });
    }
  };

  fetchGiveawayList = async () => {
    this.setState({ giveawayListLoading: true, data: [] });
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const fetchGiveawayListRes = await fetchGiveawayList(auth.token);
    if (fetchGiveawayListRes.ok) {
      // eslint-disable-next-line camelcase
      const rawData = fetchGiveawayListRes.json.api_message?.json_agg;
      const data = rawData
        .reduce((acc, cat) => acc.concat(cat.data), [])
        .filter((v) => v.qty > 0);
      this.setState({ data });
    }
    this.setState({ giveawayListLoading: false });
  };

  fetchNGORequests = async () => {
    this.setState({ ngoRequestLoading: true, updates: [] });
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const fetchGiveawayListRes = await fetchNGORequests(auth.token);
    // console.log({ fetchGiveawayListRes });
    if (fetchGiveawayListRes.ok) {
      // eslint-disable-next-line camelcase
      const rawData = fetchGiveawayListRes.json.api_message;
      const data = rawData.map((update) => ({
        id: update.ngo,
        name: update.name,
        address: update.address,
        phone: update.phone,
        notes: update.notes,
        ngoNotes: update.ngo_notes,
        status: update.status_code,
        statusStr: update.status
      }));
      this.setState({ updates: data });
    }
    this.setState({ ngoRequestLoading: false });
  };

  renderUpdates = () => {
    if (this.state.updates?.length === 0) {
      return (
        <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
          {/* <Text style={text.appbarText}>ⓘ</Text> */}
          <Text
            style={[
              text.bodyText,
              { fontStyle: 'italic', textAlign: 'left', width: '80%' }
            ]}>
            No update to display. You will see requests from NGOs for picking up
            your giveaway items.
          </Text>
        </View>
      );
    }
    return this.state.updates.map((upd) => (
      <>
        <UpcomingPickup
          id={upd.id}
          status={upd.status}
          statusStr={upd.statusStr}
          name={upd.name}
          address={upd.address}
          notes={upd.notes}
          ngoNotes={upd.ngoNotes}
          phoneNumber={upd.phone}
          stateChangedSoReload={this.fetchNGORequests}
          key={`key-up-${Math.random() * 1000}`}
        />
      </>
    ));
  };

  render() {
    const { wahPoints, numDonations } = this.context.donor;
    return (
      <ScrollView
        contentContainerStyle={[
          styles.parentContainer,
          { padding: 10, justifyContent: 'flex-start' }
        ]}
        refreshControl={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              this.fetchNGORequests();
              this.fetchGiveawayList();
              this.fetchDonorDetails();
            }}
          />
        }>
        <View
          style={{
            paddingVertical: 15,
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            flexDirection: 'row'
          }}>
          <Text
            style={[text.primaryText, { fontWeight: '700', letterSpacing: 1 }]}>
            My Giveaway List
          </Text>

          {!this.state.giveawayListLoading && (
            <Badge
              label=" EDIT "
              labelFormatterLimit={3}
              onPress={() => {
                this.props.navigation.navigate('editGiveawayList');
              }}
              backgroundColor={colors.colorprimary0}
              style={{ marginLeft: 30 }}
            />
          )}
        </View>
        {this.state.giveawayListLoading ? (
          <ActivityIndicator color={colors.colorsecondary10} size={30} />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'stretch'
            }}>
            {this.state.data.map((d, idx) => (
              <View
                key={`item-big-${idx}-${Math.random()}`}
                style={{
                  height: 50,
                  width: width / 3.5,
                  borderRadius: 3,
                  flexDirection: 'row',
                  backgroundColor: colors.colorsecondary12,
                  marginRight: 7,
                  marginBottom: 7,
                  alignItems: 'center'
                }}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: d.icon }}
                    style={{ resizeMode: 'cover', width: 30, height: 30 }}
                  />
                </View>
                <View style={{ flex: 4, paddingRight: 5 }}>
                  <Text style={text.bodyText} numberOfLines={2}>
                    {d.name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: colors.grey1,
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    justifyContent: 'center'
                  }}>
                  <Text style={text.appbarText}>{d.qty}</Text>
                  <Text style={[text.bodyText, { textAlign: 'center' }]}>
                    {d.unit.replace(/ /g, '').substring(0, 4)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View
          style={{
            marginTop: 20,
            paddingVertical: 15,
            alignItems: 'flex-start',
            alignSelf: 'stretch'
          }}>
          <Text
            style={[text.primaryText, { fontWeight: '700', letterSpacing: 1 }]}>
            {`Updates (${this.state.updates?.length})`}
          </Text>
        </View>
        {this.state.ngoRequestLoading ? (
          <ActivityIndicator color={colors.colorsecondary10} size={30} />
        ) : (
          <ScrollView style={{ alignSelf: 'stretch' }}>
            {this.renderUpdates()}
          </ScrollView>
        )}

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: '6%',
            bottom: '5%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.colorprimary3,
            borderRadius: 40,
            width: 80,
            height: 80,
            backgroundColor: colors.colorsecondary10,
            elevation: 3
          }}
          onPress={() => {
            this.props.navigation.navigate('feed', { wahPoints, numDonations });
          }}>
          <Text style={text.appbarText}>{wahPoints}</Text>
          <Image
            style={{ resizeMode: 'cover', width: 30, height: 30 }}
            source={wahIcon}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

Home.contextType = UserContext;

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired
  }).isRequired
};
