import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import colors from '../../styles/color';
import styles, { width, height } from '../../styles/style';
import text from '../../styles/text';

const stylesheet = StyleSheet.create({
  input: {
    zIndex: 1,
    backgroundColor: colors.white,
    height: 40,
    paddingLeft: 20,
    width: '100%',
    borderColor: colors.truckinBlue,
    color: colors.truckinBlue
  },
  buttonStyle: {
    zIndex: 1,
    height: 35,
    width: parseInt(width * 0.35),
    backgroundColor: colors.red
  }
});

class LocationSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { label: "I'm currently available to serve", value: 1 },
        { label: "I'm Closed", value: 2 }
      ],
      selectedIndex: null,
      types: ['AAAAAAA', 'FFFFFFF']
    };
  }

  radioButtons = () => (
    <View style={{ width: '100%' }}>
      {this.state.options.map((obj, i) => (
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <RadioButton labelHorizontal={true} key={obj.value}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={
                this.state.selectedIndex
                  ? this.state.selectedIndex === obj.value
                  : false
              }
              onPress={() => {
                this.setState({ selectedIndex: obj.value });
              }}
              borderWidth={1}
              buttonInnerColor={colors.white}
              buttonOuterColor={colors.white}
              buttonSize={10}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{}}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={() => {
                this.setState({ selectedIndex: obj.value });
              }}
              labelStyle={{
                fontSize: 15,
                color: colors.white
              }}
              labelWrapStyle={{}}
            />
          </RadioButton>
        </View>
      ))}
    </View>
  );

  render() {
    return (
      <ScrollView
        style={[{ backgroundColor: colors.truckinBlue, padding: 10 }]}>
        <Text
          style={[
            text.heroText,
            {
              marginTop: 10
            }
          ]}>
          Hard 8 BBQ
        </Text>
        <Text
          style={[
            text.appbarText,
            {
              marginTop: 10
            }
          ]}>
          Availability
        </Text>
        {this.radioButtons()}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20
          }}>
          <Text style={text.primaryText}>Current Wait</Text>
          <TextInput
            placeholder=""
            placeholderTextColor={[colors.truckinBlue]}
            underlineColorAndroid={colors.transparent}
            style={[
              styles.textbox,
              stylesheet.input,
              { width: '30%', marginLeft: 10 }
            ]}
            onChangeText={() => {
              //   this.setState({ firstName: value });
            }}
            // value={this.state.firstName}
          />
          <Text style={[text.primaryText, { marginLeft: 10 }]}>Minutes</Text>
        </View>
        <TextInput
          multiline
          maxLength={1000}
          underlineColorAndroid={colors.transparent}
          placeholder="Leave your comments.."
          placeholderTextColor={colors.secondaryText}
          style={[
            stylesheet.input,
            {
              height: height * 0.15,
              marginTop: 30,
              borderRadius: 5,
              padding: 16,
              textAlignVertical: 'top',
              fontSize: 15
            }
          ]}
          value={this.state.comment}
          onChangeText={value => {
            this.setState({ comment: value });
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            marginTop: 10
          }}>
          <Button
            title="Press to set your current location"
            // disabledStyle={{ backgroundColor: color.gray }}
            titleStyle={[text.primaryText]}
            // disabledTextStyle={{ color: color.black }}
            buttonStyle={[
              stylesheet.buttonStyle,
              {
                backgroundColor: colors.buttonGreen,
                width: parseInt(width * 0.8)
              }
            ]}
            onPress={() => {}}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 30
          }}>
          <View
            style={{ width: '60%', height: 300, backgroundColor: colors.white }}
          />
          <View
            style={{
              width: '40%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}>
            <Button
              title="Report Driver Misuse"
              // disabledStyle={{ backgroundColor: color.gray }}
              titleStyle={[text.primaryText]}
              // disabledTextStyle={{ color: color.black }}
              buttonStyle={[
                stylesheet.buttonStyle,
                { backgroundColor: colors.buttonGreen, height: 80 }
              ]}
              onPress={() => {
                this.props.navigation.navigate('reportAgainstDriver');
              }}
            />
            <Button
              title="Go to Map"
              // disabledStyle={{ backgroundColor: color.gray }}
              titleStyle={[text.primaryText]}
              // disabledTextStyle={{ color: color.black }}
              buttonStyle={[
                stylesheet.buttonStyle,
                { backgroundColor: colors.truckinYellow, marginTop: 20 }
              ]}
              onPress={() => {
                this.props.navigation.navigate('foodProviderMapView');
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LocationSettings;
