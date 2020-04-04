/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import {
  Text,
  View,
  SectionList,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import data from './data';

export default class ChooseCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderItem = ({ item }) => (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: colors.grey1,
        borderBottomWidth: 1,
        alignItems: 'center'
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'stretch',
          height: 50
        }}>
        <Image
          source={{ uri: item.icon }}
          style={{
            resizeMode: 'cover',
            height: 40,
            width: 40
          }}
        />
      </View>
      <View style={{ flex: 4, justifyContent: 'center', paddingLeft: 10 }}>
        <Text style={text.primaryText}>{item.name}</Text>
        {/* <Text style={text.bodyText}>{'5 subcategories'}</Text> */}
      </View>
      <View
        style={{
          flex: 2,
          height: 50,
          alignItems: 'center',
          paddingRight: 20,
          justifyContent: 'center',
          flexDirection: 'row'
        }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            backgroundColor: colors.grey1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3
          }}>
          <Text style={[text.primaryText, { fontSize: 25 }]}>—</Text>
        </TouchableOpacity>

        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={text.primaryText}>0</Text>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            backgroundColor: colors.grey1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3
          }}>
          <Text style={[text.primaryText, { fontSize: 28 }]}>+</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={text.primaryText}>{item.unit}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        <SectionList
          sections={data}
          renderItem={this.renderItem}
          renderSectionHeader={({ section }) => (
            <View
              style={{
                backgroundColor: colors.grey2,
                paddingLeft: 20,
                justifyContent: 'center',
                height: 40
              }}>
              <Text style={text.appbarText}>{section.title}</Text>
            </View>
          )}
          data={this.state.categories}
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: Dimensions.get('window').width
          }}
          keyExtractor={(i) =>
            `key-${i.name.replace(/ /g, '-') + Math.random()}`
          }
        />
      </View>
    );
  }
}
