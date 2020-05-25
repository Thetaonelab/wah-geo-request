import React from 'react';
import {
  Text,
  View,
  // Dimensions,
  Modal,
  TouchableOpacity,
  /* Platform, */
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Badge, DateTimePicker } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    <View style={{ alignSelf: 'stretch' }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          paddingRight: 15
        }}>
        <DateTimePicker
          containerStyle={{ marginRight: 20, marginBottom: 0 }}
          placeholder="Select pickup date"
          onChange={(date) => {
            this.setState({ pickupDate: moment(date).format('DD MMM, YYYY') });
          }}
          dateFormat="DD MMM, YYYY"
          // value={new Date('October 13, 2014')}
        />
        <DateTimePicker
          containerStyle={{ marginBottom: 0 }}
          mode="time"
          placeholder="Select pickup time"
          timeFormat="hh:mm A"
          onChange={(time) => {
            this.setState({ pickupTime: moment(time).format('hh:mm A') });
          }}
          // value={new Date('2015-03-25T12:00:00-06:30')}
        />
      </View>
      {this.state.pickupDate && this.state.pickupTime && (
        <Text
          style={[text.bodyText, { fontStyle: 'italic', marginBottom: 10 }]}>
          {`Note for donor: the items will be picked up on ${this.state.pickupDate} at around ${this.state.pickupTime}`}
        </Text>
      )}
      {this.state.errorMessageValidation && (
        <Text
          style={[
            text.bodyText,
            { fontStyle: 'normal', marginBottom: 10, color: colors.red }
          ]}>
          {this.state.errorMessageValidation}
        </Text>
      )}
      {/* <TextField
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
      /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch'
        }}>
        <Button
          label="Update Pickup Schedule"
          style={{
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            backgroundColor: colors.colorprimary0
          }}
          size="xSmall"
          onPress={() => {
            this.setState({ errorMessageValidation: '' });
            if (!this.state.pickupDate || !this.state.pickupTime) {
              this.setState({
                errorMessageValidation: 'Please select pickup date and time!'
              });
              return;
            }
            const noteText = `The items will be picked up on ${this.state.pickupDate} at around ${this.state.pickupTime}`;
            this.props.updatePickupSchedule(this.props.donorId, noteText);
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
    const { phoneNumber } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        hardwareAccelerated={true}
        onRequestClose={() => {
          this.props.dismiss();
        }}>
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
