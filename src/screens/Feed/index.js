/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import Gallery from '../../components/Gallery';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //  images: ['0B1t0KUoAulNuSjdoXzlKc0dpMTg']
    };
  }

  componentDidMount() {}

  render() {
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
              5000
            </Text>
            <Text style={[text.bodyText, { letterSpacing: 2 }]}>
              Wah points
            </Text>
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
          <Gallery />
        </View>
      </View>
    );
  }
}
