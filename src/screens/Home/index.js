import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import items from './data';

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
          {items[0].data.map((d) => (
            <View
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
            Upcoming pickups
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            borderWidth: 1,
            padding: 10,
            borderColor: colors.grey1,
            borderRadius: 4
          }}>
          <Text style={[text.secondaryText, { color: colors.black }]}>
            RAMAKRISHNA MISSION CALCUTTA STUDENTS HOME
          </Text>
          <Text style={text.bodyText}>2.30 PM, Tomorrow</Text>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
            {items[0].data.map((d) => (
              <View
                style={{
                  height: 50,
                  width: 100,
                  borderRadius: 3,
                  flexDirection: 'row',
                  backgroundColor: colors.grey3,
                  marginRight: 7,
                  marginBottom: 7,
                  alignItems: 'center'
                }}>
                <View style={{ flex: 4, paddingLeft: 5 }}>
                  <Text style={text.bodyText}>{d.name}</Text>
                  <Text>5 {d.unit}</Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              padding: 7,
              borderRadius: 3,
              borderColor: colors.grey1,
              borderWidth: 1
            }}>
            <Text
              style={[
                text.primaryText,
                { color: colors.colorprimary0, fontWeight: '700' }
              ]}>
              CALL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
