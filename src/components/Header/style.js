import { StyleSheet, Platform } from 'react-native';
import colors from '../../styles/color';

const style = StyleSheet.create({
  iosContainer: {
    backgroundColor: colors.colorsecondary20,
    paddingTop: Platform.OS === 'ios' ? 22 : 0
  },
  container: {
    display: 'flex',
    width: '100%',
    height: Platform.OS === 'android' ? 56 : 50,
    backgroundColor: colors.colorsecondary20,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  menuIconBox: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    width: 30,
    display: 'flex',
    flexDirection: 'row'
  },

  menuIconLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  menuIconRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  watchBox: {
    width: 40,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    marginLeft: 'auto'
  },

  leftSide: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  logoImage: {
    width: 60,
    height: 40,
    resizeMode: 'cover'
  },
  backText: {
    marginLeft: 5
  }
});

export default style;
