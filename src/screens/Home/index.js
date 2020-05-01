/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import UpcomingPickup from './UpcomingPickup';
import { fetchGiveawayList } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
// import items from './data';
import wahIcon from '../../../assets/wah-icon.png';
import { UPDATE_TYPES } from './constants';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      giveawayListLoading: true
    };
  }

  async componentDidMount() {
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
  }

  render() {
    return (
      <View
        style={[
          styles.parentContainer,
          { padding: 10, justifyContent: 'flex-start' }
        ]}>
        <View
          style={{
            paddingVertical: 15,
            alignItems: 'flex-start',
            alignSelf: 'stretch'
          }}>
          <Text
            style={[text.primaryText, { fontWeight: '700', letterSpacing: 1 }]}>
            My Giveaway List
          </Text>
        </View>
        {this.state.giveawayListLoading ? (
          <ActivityIndicator color={colors.colorsecondary10} size={30} />
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.data.map((d, idx) => (
              <View
                key={`item-big-${idx}-${Math.random()}`}
                style={{
                  height: 50,
                  width: '32%',
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
                <View style={{ flex: 4 }}>
                  <Text>{d.name}</Text>
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
                  <Text style={text.bodyText}>{d.unit}</Text>
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
            Updates
          </Text>
        </View>
        <UpcomingPickup type={UPDATE_TYPES.PICKUP} />
        <UpcomingPickup type={UPDATE_TYPES.AWAIT_PICKUP} />
        <UpcomingPickup type={UPDATE_TYPES.REQUEST} />
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
            this.props.navigation.navigate('feed');
          }}>
          <Text style={text.appbarText}>5000</Text>
          <Image
            style={{ resizeMode: 'cover', width: 30, height: 30 }}
            source={wahIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
