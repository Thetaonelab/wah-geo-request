/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import UpcomingPickup from './UpcomingPickup';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import items from './data';
import wahIcon from '../../../assets/wah-icon.png';
import { UPDATE_TYPES } from './constants';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {items[0].data.map((d, idx) => (
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
                <Text style={text.appbarText}>5</Text>
                <Text style={text.bodyText}>{d.unit}</Text>
              </View>
            </View>
          ))}
        </View>

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
