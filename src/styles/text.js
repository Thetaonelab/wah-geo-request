import { StyleSheet, Platform } from 'react-native';
import colors from './color';

export default StyleSheet.create({
  heroText: {
    fontSize: 25,
    color: colors.white,
    opacity: 0.9,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround",
    fontWeight: '800',
  },

  appbarText: {
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    color: colors.black,
    opacity: 0.9,
    fontWeight: '700',
    letterSpacing: 2,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  primaryText: {
    fontSize: Platform.OS === 'ios' ? 15 : 16,
    color: colors.black,
    opacity: 0.9,
    fontWeight: '600',
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  secondaryText: {
    fontSize: Platform.OS === 'ios' ? 15 : 16,
    color: colors.white,
    opacity: 0.75,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    opacity: 0.7,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  secondaryButtonText: {
    fontSize: 15,
    color: colors.colorsecondary20,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
  bodyText: {
    fontSize: Platform.OS === 'ios' ? 13 : 13,
    color: colors.black,
    opacity: 0.7,
    // fontFamily: Platform.OS === "ios" ? "Varela Round" : "varelaround"
  },
});
