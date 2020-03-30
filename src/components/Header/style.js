import { StyleSheet } from 'react-native';
import colors from '../../styles/color';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 60,
    backgroundColor: colors.colorsecondary10,
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
    width: 80,
    height: 60,
    display: 'flex',
    flexDirection: 'row'
  },

  menuIconLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    height: 60,
    width: 'auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover'
  },
  backText: {
    marginLeft: 5
  }
});

export default style;
