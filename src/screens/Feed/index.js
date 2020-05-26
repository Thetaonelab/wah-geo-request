/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchImages } from './api';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import Gallery from '../../components/Gallery';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imagesLoading: true
    };
  }

  componentDidMount = async () => {
    let auth = await AsyncStorage.getItem('auth');
    auth = auth ? JSON.parse(auth) : {};
    const imagesRes = await fetchImages(auth.token);
    // console.log({ imagesRes });
    this.setState({ images: imagesRes.json.api_message, imagesLoading: false });
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { wahPoints, numDonations } = this.props.navigation.state.params;

    return (
      <View
        style={[
          styles.parentContainer,
          { padding: 10, justifyContent: 'flex-start', alignItems: 'center' }
        ]}>
        <View>
          <View
            style={{
              paddingVertical: 15,
              alignItems: 'center',
              alignSelf: 'stretch'
            }}>
            <Text
              style={[
                text.primaryText,
                {
                  fontWeight: '700',
                  letterSpacing: 3,
                  fontSize: 40,
                  color: colors.colorprimary0
                }
              ]}>
              {wahPoints}
            </Text>
            <Text style={[text.bodyText, { letterSpacing: 2 }]}>
              Wah points
            </Text>
            {numDonations ? (
              <Text style={[text.bodyText, { fontStyle: 'italic' }]}>
                {`( Based on ${numDonations} donations made by you )`}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              margin: 20,
              paddingVertical: 15,
              alignItems: 'center',
              alignSelf: 'stretch',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              width: '70%'
            }}>
            <Text
              style={[
                text.secondaryText,
                {
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: colors.black,
                  fontStyle: 'italic'
                }
              ]}>
              <Text style={{ fontSize: 25, fontWeight: '700' }}>W</Text>e still
              do not know how can you redeem this points with material things.
              But this is an indicator for the love you received indirectly by
              contributing to the needy in the tough times. Browse through the
              pictures to see how your contribution created million dollar
              smiles.
            </Text>
          </View>
        </View>
        <View style={{ width: '100%', flex: 1 }}>
          <Gallery
            images={this.state.images}
            imagesLoading={this.state.imagesLoading}
          />
        </View>
      </View>
    );
  }
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        wahPoints: PropTypes.number.isRequired,
        numDonations: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
