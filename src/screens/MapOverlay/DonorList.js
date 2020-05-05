/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { Button } from 'react-native-ui-lib';
import colors from '../../styles/color';
import text from '../../styles/text';
// import ownStyle from './style';
import DonorDetails from './DonorDetails';

export default class DonorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
      errorMessage: '',
      details: null
    };
  }

  setModalVisible = (val, item) => {
    const details = item
      ? {
          id: item.id,
          name: item.name,
          distance: item.distance,
          note: item.note,
          address: item.address,
          desc: item.desc,
          lat: item.lat,
          lon: item.lon
        }
      : null;
    this.setState({
      modalVisible: val,
      details
    });
  };

  askButtonPress = (donorId) => async () => {
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
    this.setState({ loading: false });
  };

  renderItem = ({ item }) => (
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
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: 'http://lbs.eyezon.in/robohash/test'
          }}
          style={{
            resizeMode: 'cover',
            width: 50,
            height: 50,
            backgroundColor: colors.grey3,
            borderRadius: 25
          }}
        />
      </View>
      <View style={{ flex: 5 }}>
        <Text style={text.primaryText}>{`${item.name}`}</Text>
        <Text style={text.bodyText} numberOfLines={1}>
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

      {!item.status ? (
        <View style={{ flex: 3, alignItems: 'flex-end' }}>
          <Button
            label="Ask"
            backgroundColor={colors.colorprimary1}
            onPress={this.askButtonPress(item.id)}
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
              width: 90,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </View>
      ) : (
        <View style={{ marginEnd: 0, flex: 3, alignItems: 'flex-end' }}>
          <Text style={text.secondaryText}>{item.status}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  dismissModal = () => {
    this.setModalVisible(false);
  };

  render() {
    return (
      <View
        style={{ height: 600 * 0.8, flex: 1, alignSelf: 'stretch' }}
        contentContainerStyle={{
          marginTop: 20,
          alignItems: 'stretch'
        }}>
        <View style={{ alignSelf: 'stretch' }}>
          <FlatList
            data={this.props.data}
            renderItem={this.renderItem}
            style={{ alignSelf: 'stretch' }}
            keyExtractor={(item) => `${item.name}${Math.random()}`}
          />
        </View>

        {this.state.modalVisible && (
          <DonorDetails
            visible={this.state.modalVisible}
            dismiss={this.dismissModal}
            name={this.state.details?.name}
            distance={this.state.details?.distance}
            giveawayList={this.state.details?.desc}
            address={this.state.details?.address}
            note={this.state.details?.note}
            lat={this.state.details?.lat}
            lon={this.state.details?.lon}
          />
        )}
      </View>
    );
  }
}

DonorList.propTypes = {
  askDonorApi: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired
};
