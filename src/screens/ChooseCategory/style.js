import { StyleSheet } from 'react-native';
import colors from '../../styles/color';

export default StyleSheet.create({
  pmButtonContainer: {
    flex: 2,
    height: 50,
    alignItems: 'center',
    paddingRight: 20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pmButton: {
    height: 40,
    width: 40,
    backgroundColor: colors.grey1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  unit: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pmValue: {
    height: 40,
    width: 50,
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
