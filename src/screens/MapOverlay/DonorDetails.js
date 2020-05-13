import React from 'react';
import {
  Text,
  View,
  // Dimensions,
  Modal,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { Button, TextField, Badge } from 'react-native-ui-lib';
import PropTypes from 'prop-types';

// import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';
import { call, openGps } from '../../util';
import { REQUEST_STATUS } from '../../constants';

export default class DonorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  acceptedView = () => (
    <View>
      <TextField
        placeholder="Enter a Note for the donor"
        hideUnderline={false}
        style={{
          marginTop: 30,
          alignSelf: 'stretch',
          width: '100%'
        }}
        onChangeText={(val) => {
          // eslint-disable-next-line react/no-unused-state
          this.setState({ note: val });
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          size="xSmall"
          onPress={() => {
            this.props.updatePickupSchedule(
              this.props.donorId,
              this.state.note
            );
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
          onPress={() => openGps(this.props.lat, this.props.lon)}
          size="xSmall"
        />
      </View>
    </View>
  );

  pickupScheduleUpdatedView = () => (
    <View>
      <View
        style={{
          height: 2,
          alignSelf: 'stretch',
          borderBottomWidth: 1,
          borderBottomColor: colors.grey1,
          marginTop: 20
        }}
      />
      <Text style={[text.secondaryText, { marginVertical: 7 }]}>
        {this.props.ngoNotes}
      </Text>
      <View
        style={{
          height: 2,
          alignSelf: 'stretch',
          borderBottomWidth: 1,
          borderBottomColor: colors.grey1
        }}
      />

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch'
        }}>
        <Button
          label="Mark as completed"
          style={{
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            backgroundColor: colors.colorprimary0
          }}
          size="xSmall"
          onPress={() => {
            this.props.markAsCompleted(this.props.donorId);
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
          onPress={() => openGps(this.props.lat, this.props.lon)}
          size="xSmall"
        />
      </View>
    </View>
  );

  render() {
    const phoneNumber =
      Platform.OS === 'android'
        ? `tel:${this.props.phoneNumber}`
        : `telprompt:${this.props.phoneNumber}`;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        hardwareAccelerated={true}
        onRequestClose={() => {
          this.props.dismiss();
        }}
        >
        <KeyboardAvoidingView
          behavior="padding"
          style={[
            ownStyle.centeredView,
            { backgroundColor: 'rgba(0,0,0,0.6)' }
          ]}>
          <View style={ownStyle.donorDetailsModal}>
            <View style={ownStyle.detailsWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={text.appbarText}>{this.props.name}</Text>
                {this.props.statusCode >= REQUEST_STATUS.ACCEPTED && (
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
                    onPress={call(phoneNumber)}
                    labelStyle={[
                      text.bodyText,
                      {
                        color: colors.white,
                        fontWeight: '700'
                      }
                    ]}
                    size="xSmall"
                  />
                )}
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
                  marginTop: 20
                }}>
                <Text style={[text.bodyText, { fontStyle: 'italic' }]}>
                  {this.props.address}
                </Text>
                <View
                  style={{
                    height: 2,
                    alignSelf: 'stretch',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.grey1,
                    marginTop: 20
                  }}
                />
                <Text style={[text.secondaryText, { marginVertical: 7 }]}>
                  {this.props.giveawayList}
                </Text>
                <View
                  style={{
                    height: 2,
                    alignSelf: 'stretch',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.grey1
                  }}
                />
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
                <Badge label={this.props.status} labelFormatterLimit={3} />

                {this.props.loading ? (
                  <ActivityIndicator
                    size={30}
                    color={colors.colorsecondary10}
                    style={{ height: 80, alignSelf: 'center' }}
                  />
                ) : this.props.statusCode === REQUEST_STATUS.ACCEPTED ? (
                  this.acceptedView()
                ) : this.props.statusCode ===
                  REQUEST_STATUS.PICKUP_SCHEDULE_UPDATED ? (
                  this.pickupScheduleUpdatedView()
                ) : null}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

DonorDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  donorId: PropTypes.string.isRequired,
  giveawayList: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  statusCode: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  // notes: PropTypes.string,
  ngoNotes: PropTypes.string,
  loading: PropTypes.bool,
  updatePickupSchedule: PropTypes.func.isRequired,
  markAsCompleted: PropTypes.func.isRequired
};

DonorDetails.defaultProps = {
  loading: true,
  // notes: '',
  ngoNotes: ''
};
