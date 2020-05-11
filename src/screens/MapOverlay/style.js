import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/color';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width
  },
  donorDetailsModal: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 4,
    flex: 1,
    width: width * 0.9
  },
  detailsWrapper: {
    backgroundColor: colors.grey3,
    borderRadius: 4,
    padding: 20
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
