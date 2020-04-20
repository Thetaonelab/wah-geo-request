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
import PropTypes from 'prop-types';
import { FloatingButton } from 'react-native-ui-lib';
// import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';
import data from './data';

export default class ChooseCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0
    };
  }

  componentDidMount() {
    const stateObj = {};
    data.forEach((element) => {
      element.data.forEach((elem) => {
        stateObj[`item-id-${elem.id}`] = elem.value ? elem.value : 0;
      });
    });
    this.setState({ ...stateObj });
  }

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
      <View style={ownStyle.pmButtonContainer}>
        <TouchableOpacity
          style={ownStyle.pmButton}
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
          <Text style={[text.primaryText, { fontSize: 25 }]}>—</Text>
        </TouchableOpacity>
        <View style={ownStyle.pmValue}>
          <Text style={text.primaryText}>
            {this.state[`item-id-${item.id}`]}
          </Text>
        </View>
        <TouchableOpacity
          style={ownStyle.pmButton}
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
          <Text style={[text.primaryText, { fontSize: 28 }]}>+</Text>
        </TouchableOpacity>
        <View style={ownStyle.unit}>
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
        <FloatingButton
          visible={this.state.totalCount !== 0}
          button={{
            label: 'I am done!',
            labelStyle: { fontWeight: '700' },
            onPress: () => {
              this.props.navigation.navigate('authorized');
            }
          }}
        />
      </View>
    );
  }
}

ChooseCategory.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};
