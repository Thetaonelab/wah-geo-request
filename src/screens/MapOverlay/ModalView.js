import React from 'react';
import {
  Text,
  View,
  // Dimensions,
  Modal,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
// import styles from '../../styles/style';
// import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';
import DonorList from './DonorList';

export default class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
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
          desc: 'Rice: 5Kg, Dal: 56 Kg',
          status: 'Accepted'
        }
      ]
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          // eslint-disable-next-line no-console
          // console.log('Modal has been closed.');
          this.props.dismissModal();
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

            <DonorList data={this.state.data} />
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
