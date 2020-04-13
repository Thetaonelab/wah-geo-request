import React from 'react';
import {
  Text,
  View,
  // Dimensions,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
// import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';

export default class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          // eslint-disable-next-line no-console
          console.log('Modal has been closed.');
        }}>
        <View style={ownStyle.centeredView}>
          <View style={ownStyle.modalView}>
            <Text style={text.appbarText}>Donor List</Text>

            <TouchableOpacity
              style={{
                ...ownStyle.openButton,
                position: 'absolute',
                right: 20,
                top: 20
              }}
              onPress={this.props.dismissModal}>
              <Text style={ownStyle.textStyle}>×</Text>
            </TouchableOpacity>

            <ScrollView
              style={{ height: 600 * 0.8, flex: 1, alignSelf: 'stretch' }}
              contentContainerStyle={{
                marginTop: 20,
                alignItems: 'stretch'
              }}>
              <FlatList
                data={[
                  {
                    name: 'Mr. Sen',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg',
                    status: '✓ Accepted'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg',
                    status: '⧖ Waiting'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg',
                    status: '× Rejected'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg'
                  },
                  {
                    name: 'Mr. Ghosh',
                    distance: '2.5 KM',
                    desc: 'Rice: 5Kg, Dal: 56 Kg',
                    status: 'accepted'
                  }
                ]}
                renderItem={({ item }) => (
                  <View
                    style={{
                      height: 60,
                      borderBottomColor: colors.grey2,
                      borderBottomWidth: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'stretch'
                    }}>
                    <View style={{ flex: 1 }}>
                      <Image
                        source={{
                          uri: 'http://lbs.eyezon.in/robohash/test'
                        }}
                        style={{
                          resizeMode: 'cover',
                          width: 40,
                          height: 40,
                          backgroundColor: colors.grey3
                        }}
                      />
                    </View>
                    <View style={{ flex: 5 }}>
                      <Text style={text.primaryText}>
                        {`${item.name} | ${item.distance}`}
                      </Text>
                      <Text style={text.bodyText}>{item.desc}</Text>
                    </View>

                    {!item.status ? (
                      <View style={{ flex: 2, alignItems: 'flex-end' }}>
                        <Button
                          label="Ask"
                          backgroundColor={colors.colorprimary1}
                          onPress={this.signInWithPhoneNumber}
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
                      <View>
                        <Text style={text.secondaryText}>{item.status}</Text>
                      </View>
                    )}
                  </View>
                )}
                style={{ alignSelf: 'stretch' }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalView.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  dismissModal: PropTypes.func.isRequired
};
