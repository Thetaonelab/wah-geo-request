import React from 'react';
import {
  Text,
  View,
  // Dimensions,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Button, TextArea } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
// import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';

export default class DonorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        hardwareAccelerated={true}
        onRequestClose={() => {
          this.props.dismiss();
        }}>
        <View
          style={[
            ownStyle.centeredView,
            { backgroundColor: 'rgba(0,0,0,0.6)' }
          ]}>
          <View style={ownStyle.donorDetailsModal}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={text.appbarText}>{this.props.name}</Text>
              <Button
                label="CALL"
                style={{
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  backgroundColor: colors.grey0,
                  marginLeft: 20
                }}
                labelStyle={[
                  text.bodyText,
                  {
                    color: colors.white,
                    fontWeight: '700'
                  }
                ]}
              />
            </View>
            <TouchableOpacity
              style={{
                ...ownStyle.openButton,
                position: 'absolute',
                right: 10,
                top: 0
              }}
              onPress={this.props.dismiss}>
              <Text style={ownStyle.textStyle}>×</Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                flex: 1,
                marginTop: 20
              }}>
              <Text style={text.primaryText}>{this.props.giveawayList}</Text>
              <Text
                style={[
                  text.bodyText,
                  {
                    fontWeight: '700',
                    padding: 5,
                    paddingStart: 0
                  }
                ]}>
                {this.props.distance}
              </Text>
              <Text
                style={[
                  text.bodyText,
                  {
                    fontWeight: '700'
                  }
                ]}>
                Accepted
              </Text>
              <TextArea
                placeholder="e.g. Pickup will be dont at tomorrow 10 AM"
                onChangeText={(val) => {
                  // eslint-disable-next-line react/no-unused-state
                  this.setState({ note: val });
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  alignSelf: 'stretch'
                }}>
                <Button
                  label="Update note"
                  style={{
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                    backgroundColor: colors.colorprimary0
                  }}
                />
                <Button
                  label="NAVIGATE"
                  style={{
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                    backgroundColor: colors.transparent
                  }}
                  labelStyle={{
                    color: colors.colorsecondary20,
                    fontWeight: '700'
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

DonorDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  giveawayList: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired
};
