import { StyleSheet, Platform } from 'react-native';
import colors from './color';

export default StyleSheet.create({
  headerText: {
    fontSize: 35,
    color: 'white',
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround",
    fontWeight: '800'
  },
  heroText: {
    fontSize: 25,
    color: 'white',
    opacity: 0.9,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround",
    fontWeight: '800'
  },

  appbarText: {
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    color: 'white',
    opacity: 0.9,
    fontWeight: '700'
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  primaryText: {
    fontSize: Platform.OS === 'ios' ? 15 : 16,
    color: 'white',
    opacity: 0.9,
    fontWeight: '600'
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  secondaryText: {
    fontSize: Platform.OS === 'ios' ? 15 : 16,
    color: 'white',
    opacity: 0.75
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    opacity: 0.7
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  secondaryButtonText: {
    fontSize: 15,
    color: colors.colorsecondary20
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  bodyText: {
    fontSize: Platform.OS === 'ios' ? 13 : 13,
    color: 'white',
    opacity: 0.7
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  navbarText: {
    color: Platform.OS === 'ios' ? colors.colorprimary0 : 'white',
    width: Platform.OS === 'ios' ? 75 : 100,
    padding: Platform.OS === 'ios' ? 4 : 7,
    marginTop: Platform.OS === 'ios' ? -4 : 0,
    // backgroundColor: (Platform.OS === 'ios' && false) ? 'white' : (colors.colorprimary0) ,
    backgroundColor: colors.colorprimary1,
    marginLeft: 3,
    textAlign: 'center',
    borderRadius: Platform.OS === 'ios' ? 4 : 2,
    fontSize: Platform.OS === 'ios' ? 17 : 17,
    opacity: 1,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround",
    borderColor: colors.colorsecondary10,
    borderWidth: 1
  }
});
