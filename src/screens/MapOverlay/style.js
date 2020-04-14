import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/color';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    padding: 35,
    alignItems: 'center',
    width,
    height: height * 0.9,
    alignSelf: 'flex-end'
  },
  donorDetailsModal: {
    backgroundColor: colors.grey3,
    borderRadius: 4,
    padding: 20,
    alignItems: 'flex-start',
    height: parseInt(height / 3),
    width: parseInt(width / 1.5),
    elevation: 4
    // alignSelf: 'flex-end'
  },
  openButton: {
    // backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10
  },
  textStyle: {
    color: colors.grey0,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
