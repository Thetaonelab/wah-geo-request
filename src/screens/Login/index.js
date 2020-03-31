import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import colors from '../../styles/color';
import styles, { height, width } from '../../styles/style';
import text from '../../styles/text';
import wah from '../../../assets/istockphoto-175498026-612x612.jpg';

const stylesheet = StyleSheet.create({
  emailInput: {
    zIndex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.white,
    marginTop: parseInt(height * 0.02),
    paddingLeft: 20,
    fontFamily: 'Nunito-Bold',
    borderColor: colors.truckinBlue,
    color: colors.truckinBlue
  },
  passInput: {
    zIndex: 1,
    marginTop: -2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.white,
    paddingLeft: 20,
    fontFamily: 'Nunito-Bold',
    borderColor: colors.truckinBlue,
    color: colors.truckinBlue
  },
  passInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  icon: {
    zIndex: 1,
    marginRight: 8,
    position: 'absolute',
    right: 0,
    color: colors.truckinBlue
  },
  buttonStyle: {
    zIndex: 1,
    height: 35,
    width: parseInt(width * 0.45),
    backgroundColor: colors.truckinYellow
  }
});

class Login extends PureComponent {
  render() {
    return (
      <View
        style={[
          styles.parentContainer,
          { backgroundColor: colors.truckinBlue, padding: 0 }
        ]}>
        <View style={{ marginBottom: 20 }}>
          <Text style={text.headerText}>My Truckin' Tech</Text>
        </View>
        <View style={{ backgroundColor: colors.white }}>
          <Image source={wah} style={{ resizeMode: 'cover', height: 250 }} />
        </View>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={colors.truckinBlue}
          underlineColorAndroid={colors.transparent}
          style={[styles.textbox, stylesheet.emailInput]}
          // onChangeText={props.onChange('email')}
          // value={props.email}
        />
        <View style={stylesheet.passInputWrapper}>
          <TextInput
            placeholder="Password"
            // secureTextEntry={props.hide}
            placeholderTextColor={colors.truckinBlue}
            underlineColorAndroid={colors.transparent}
            style={[styles.textbox, stylesheet.passInput]}
            // onChangeText={props.onChange('password')}
            // value={props.password}
          />
          <Icons name={'eye'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 20
          }}>
          <Button
            title="Login Driver"
            // disabledStyle={{ backgroundColor: color.gray }}
            titleStyle={[text.secondaryText]}
            // disabledTextStyle={{ color: color.black }}
            buttonStyle={[stylesheet.buttonStyle]}
            onPress={() => {
              console.log("LLLLLLLLLLLL")
              this.props.navigation.navigate('driverMapView');
            }}
          />
          <Button
            title="Login Food Provider"
            // disabledStyle={{ backgroundColor: color.gray }}
            titleStyle={[text.secondaryText]}
            // disabledTextStyle={{ color: color.black }}
            buttonStyle={[stylesheet.buttonStyle]}
            onPress={() => {}}
          />
        </View>

        <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
          <Button
            title="I can feed drivers"
            // disabledStyle={{ backgroundColor: color.gray }}
            titleStyle={[text.secondaryText, { color: colors.black }]}
            // disabledTextStyle={{ color: color.black }}
            buttonStyle={[
              stylesheet.buttonStyle,
              { width: parseInt(width * 0.8), backgroundColor: colors.white }
            ]}
            onPress={() => {
              this.props.navigation.navigate('foodTruckRegistration');
            }}
          />
          <Button
            title="I am a hungry driver"
            // disabledStyle={{ backgroundColor: color.gray }}
            titleStyle={[text.secondaryText, { color: colors.black }]}
            // disabledTextStyle={{ color: color.black }}
            buttonStyle={[
              stylesheet.buttonStyle,
              {
                width: parseInt(width * 0.8),
                marginTop: 10,
                backgroundColor: colors.white
              }
            ]}
            onPress={() => {
              this.props.navigation.navigate('driverRegistration');
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[text.appbarText, { textDecorationLine: 'underline' }]}>
            I forgot my Truckin' password
          </Text>
        </View>
        {/* <LogInButton pressed={this.state.pressed} login={this.login} /> */}
      </View>
    );
  }
}

export default Login;
