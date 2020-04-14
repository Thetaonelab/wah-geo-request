/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Text,
  View,
  // Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-ui-lib';
import colors from '../../styles/color';
import text from '../../styles/text';
// import ownStyle from './style';
import DonorDetails from './DonorDetails';

export default function DonorList(props) {
  const [modalVisible, setModalVisible] = useState(0);

/*   setTimeout(() => {
    setModalVisible(true);
  }, 3000);
 */
  const askButtonPress = () => {};
  const renderItem = ({ item }) => (
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
      onLongPress={() => setModalVisible(true)}
      key={`${item.name}${Math.random()}`}>
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
        <Text style={text.bodyText}>{item.desc}</Text>
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
            onPress={askButtonPress}
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

  const dismissModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView
      style={{ height: 600 * 0.8, flex: 1, alignSelf: 'stretch' }}
      contentContainerStyle={{
        marginTop: 20,
        alignItems: 'stretch'
      }}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        style={{ alignSelf: 'stretch' }}
      />
      <DonorDetails
        visible={modalVisible}
        dismiss={dismissModal}
        name="Mr. Ghosh"
        distance="2.4KM"
        giveawayList="rice, dal, onion"
      />
    </ScrollView>
  );
}
