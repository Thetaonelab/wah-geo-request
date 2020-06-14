import { StyleSheet } from 'react-native';
import colors from '../../styles/color';

export default StyleSheet.create({
  pmButtonContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pmButton: {
    height: 40,
    width: 25,
    backgroundColor: colors.grey1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  pmButtonPlus: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  pmButtonMinus: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  unit: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
    paddingLeft: 5
  },
  pmValue: {
    height: 40,
    width: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButton: {
    height: 50,
    backgroundColor: colors.colorsecondary11,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
