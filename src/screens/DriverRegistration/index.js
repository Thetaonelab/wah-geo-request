import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import colors from '../../styles/color';
import styles, { height, width } from '../../styles/style';
import text from '../../styles/text';

const stylesheet = StyleSheet.create({
  input: {
    zIndex: 1,
    backgroundColor: colors.white,
    height: 40,
    paddingLeft: 20,
    width: '70%',
    borderColor: colors.truckinBlue,
    color: colors.truckinBlue
  },
  buttonStyle: {
    zIndex: 1,
    height: 35,
    width: parseInt(width * 0.45)
  }
});

class DriverRegistration extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { label: 'I work fror a carrier', value: 1 },
        { label: 'Independent driver', value: 2 }
      ],
      selectedIndex: null
    };
  }

  radioButtons = () => (
    <View>
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

  registrationForm = () => (
    <View>
      {this.state.selectedIndex === 1 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10
          }}>
          <View style={{ width: '30%' }}>
            <Text style={[text.primaryText]}>Carrier</Text>
          </View>
          <TextInput
            placeholder="Carrier"
            placeholderTextColor={[colors.truckinBlue]}
            underlineColorAndroid={colors.transparent}
            style={[styles.textbox, stylesheet.input]}
            onChangeText={() => {
              //   this.setState({ firstName: value });
            }}
            // value={this.state.firstName}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10
        }}>
        <View style={{ width: '30%' }}>
          <Text style={[text.primaryText]}>Your</Text>
        </View>
        <TextInput
          placeholder="Your"
          placeholderTextColor={[colors.truckinBlue]}
          underlineColorAndroid={colors.transparent}
          style={[styles.textbox, stylesheet.input]}
          onChangeText={() => {
            //   this.setState({ firstName: value });
          }}
          // value={this.state.firstName}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10
        }}>
        <View style={{ width: '30%' }}>
          <Text style={[text.primaryText]}>Email</Text>
        </View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={[colors.truckinBlue]}
          underlineColorAndroid={colors.transparent}
          style={[styles.textbox, stylesheet.input]}
          onChangeText={() => {
            //   this.setState({ firstName: value });
          }}
          // value={this.state.firstName}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10
        }}>
        <View style={{ width: '30%' }}>
          <Text style={[text.primaryText]}>Phone</Text>
        </View>
        <TextInput
          placeholder="Phone"
          placeholderTextColor={[colors.truckinBlue]}
          underlineColorAndroid={colors.transparent}
          style={[styles.textbox, stylesheet.input]}
          onChangeText={() => {
            //   this.setState({ firstName: value });
          }}
          // value={this.state.firstName}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10
        }}>
        <View style={{ width: '30%' }}>
          <Text style={[text.primaryText]}>Password</Text>
        </View>
        <TextInput
          placeholder="Password"
          placeholderTextColor={[colors.truckinBlue]}
          underlineColorAndroid={colors.transparent}
          style={[styles.textbox, stylesheet.input]}
          onChangeText={() => {
            //   this.setState({ firstName: value });
          }}
          // value={this.state.firstName}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10
        }}>
        <View style={{ width: '30%' }}>
          <Text style={[text.primaryText]}>Retype Password</Text>
        </View>
        <TextInput
          placeholder="Retype Password"
          placeholderTextColor={[colors.truckinBlue]}
          underlineColorAndroid={colors.transparent}
          style={[styles.textbox, stylesheet.input]}
          onChangeText={() => {
            //   this.setState({ firstName: value });
          }}
          // value={this.state.firstName}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 20
        }}>
        <Button
          title="Register"
          // disabledStyle={{ backgroundColor: color.gray }}
          titleStyle={[text.primaryText]}
          // disabledTextStyle={{ color: color.black }}
          buttonStyle={[
            stylesheet.buttonStyle,
            { backgroundColor: colors.buttonGreen }
          ]}
          onPress={() => {}}
        />
        <Button
          title="Cancel"
          // disabledStyle={{ backgroundColor: color.gray }}
          titleStyle={[text.primaryText]}
          // disabledTextStyle={{ color: color.black }}
          buttonStyle={[
            stylesheet.buttonStyle,
            { backgroundColor: colors.red }
          ]}
          onPress={() => {}}
        />
      </View>
    </View>
  );

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.scrollableParentContainer,
          { backgroundColor: colors.truckinBlue, minHeight: '100%' }
        ]}>
        <View>
          <Text style={[text.heroText, { textAlign: 'center' }]}>
            Thank you for all you are doing during this crisis. Let's try to
            find you something to eat
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View style={{ width: '40%' }}>
            <Text style={text.primaryText}>
              Are you an independent driver or do you work for a carrier?
            </Text>
          </View>
          <View style={{ width: '60%' }}>{this.radioButtons()}</View>
        </View>
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: colors.white,
            marginVertical: 20
          }}
        />
        {this.state.selectedIndex && this.registrationForm()}
      </ScrollView>
    );
  }
}

export default DriverRegistration;
