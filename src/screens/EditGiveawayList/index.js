/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import {
  Text,
  View,
  SectionList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import { FloatingButton } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';
// import { StackActions, NavigationActions } from 'react-navigation';
import { fetchGiveawayList, saveGiveawayList } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';
// import data from './data';

export default class EditGiveawayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
      data: [],
      loading: true
    };
  }

  async componentDidMount() {
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const fetchGiveawayListRes = await fetchGiveawayList(auth.token);
    if (fetchGiveawayListRes.ok) {
      // eslint-disable-next-line camelcase
      const data = fetchGiveawayListRes.json.api_message?.json_agg;
      const stateObj = {};
      let totalCount = 0;
      data.forEach((element) => {
        element.data.forEach((elem) => {
          stateObj[`item-id-${elem.id}`] = elem.qty ? elem.qty : 0;
          totalCount += elem.qty ? elem.qty : 0;
        });
      });
      this.setState({ ...stateObj, data, totalCount });
    } else {
      // do some error handling
    }
    this.setState({ loading: false });
  }

  saveAndLeave = async () => {
    const saveList = Object.keys(this.state)
      .map((v) => {
        if (v.indexOf('item-id-') === 0) {
          return { id: v.replace('item-id-', ''), qty: this.state[v] };
        }
        return -1;
      })
      .filter((v) => v !== -1);

    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    // const saveGiveawayListRes =
    await saveGiveawayList(auth.token, saveList);

    const { routeName } = this.props.navigation.state;
    if (routeName === 'chooseCategory') {
      this.props.navigation.navigate('authorized');
    } else {
      this.props.navigation.goBack();
    }
  };

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
        alignItems: 'center',
        backgroundColor:
          this.state[`item-id-${item.id}`] > 0
            ? colors.colorgreen7
            : colors.white
      }}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'stretch'
        }}>
        <Image
          source={{
            uri: `https://picsum.photos/seed/${item.id}/40/40` /* item.icon */
          }}
          style={{
            resizeMode: 'cover',
            height: 40,
            width: 40,
            borderRadius: 3
          }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: 'center', paddingLeft: 10 }}>
        <Text style={text.secondaryText} numberOfLines={2}>
          {item.name}
        </Text>
        {/* <Text style={text.bodyText}>{'5 subcategories'}</Text> */}
      </View>
      <View style={ownStyle.pmButtonContainer}>
        <TouchableOpacity
          style={[ownStyle.pmButton, ownStyle.pmButtonMinus]}
          onPress={() => {
            this.setState((ps) => {
              if (ps[`item-id-${item.id}`] > 0) {
                return {
                  [`item-id-${item.id}`]: ps[`item-id-${item.id}`] - 1,
                  totalCount: ps.totalCount - 1
                };
              }
              return {};
            });
          }}>
          <Text style={[text.primaryText, { fontSize: 20 }]}>—</Text>
        </TouchableOpacity>
        <View style={ownStyle.pmValue}>
          <Text style={text.primaryText}>
            {this.state[`item-id-${item.id}`]}
          </Text>
        </View>
        <TouchableOpacity
          style={[ownStyle.pmButton, ownStyle.pmButtonPlus]}
          onPress={() => {
            this.setState((ps) => {
              if (ps[`item-id-${item.id}`] < 10) {
                return {
                  [`item-id-${item.id}`]: ps[`item-id-${item.id}`] + 1,
                  totalCount: ps.totalCount + 1
                };
              }
              return {};
            });
          }}>
          <Text style={[text.primaryText, { fontSize: 23 }]}>+</Text>
        </TouchableOpacity>
        <View style={ownStyle.unit}>
          <Text style={[text.bodyText]}>{item.unit}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        {this.state.loading ? (
          <ActivityIndicator color={colors.colorsecondary10} size={50} />
        ) : (
          <>
            <SectionList
              sections={this.state.data}
              renderItem={this.renderItem}
              renderSectionHeader={({ section }) => (
                <View
                  style={{
                    backgroundColor: colors.grey2,
                    paddingLeft: 20,
                    justifyContent: 'center',
                    height: 40
                  }}>
                  <Text style={text.appbarText}>{`♥ ${section.title}`}</Text>
                </View>
              )}
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: Dimensions.get('window').width,
                marginBottom: 0
              }}
              contentContainerStyle={{ paddingBottom: 62 }}
              keyExtractor={(i) =>
                `key-${i.name.replace(/ /g, '-') + Math.random()}`
              }
            />
            <FloatingButton
              visible={this.state.totalCount !== 0}
              button={{
                label: 'I am done!',
                labelStyle: { fontWeight: '700' },
                onPress: this.saveAndLeave
              }}
            />
          </>
        )}
      </View>
    );
  }
}

EditGiveawayList.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    state: PropTypes.shape({
      routeName: PropTypes.string
    })
  }).isRequired
};
