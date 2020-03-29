import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from './color'

export var { height, width } = Dimensions.get("window");

const flatStyles = {
  scrollableParentContainer: {
    backgroundColor: colors.grey2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  parentContainer: {
    flex: 1,
    backgroundColor: colors.colorsecondary20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  subContainer: {
    alignSelf: "stretch",
    textAlign: "center"
  },
  buttonStyle: {
    padding: 8,
    marginVertical: 6,
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 3
  },
  secondaryButtonStyle: {
    padding: 8,
    marginTop: 6,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 1,
    borderColor: colors.colorsecondary20
  },
  primaryButtonStyle: {
    padding: 8,
    marginTop: 6,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 1,
    borderColor: colors.colorprimary0
  },
  buttonIconStyle: {
    fontSize: 15,
    margin: 4,
    marginLeft: 0
  },
  badge: {
    marginTop: 12,
    marginRight: 32,
    backgroundColor: colors.colorsecondary21,
    height: 8,
    width: 8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  },
  badgeCount: {
    color: colors.grey4,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -2
  },
  toolbar: {
    height: Platform.OS === "ios" ? 64 : 54,
    backgroundColor: colors.colorprimary0
  },
  listViewRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    height: 70,
    alignItems: "center"
  },
  listViewThumb: {
    width: 40,
    height: 40,
    margin: 2,
    marginRight: 8,
    alignSelf: "flex-start"
  },
  listViewThumbContact: {
    width: 40,
    height: 40,
    margin: 2,
    marginRight: 8,
    alignSelf: "flex-start",
    borderRadius: 20
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  loadingStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
};

export default StyleSheet.create({
  ...flatStyles
});
