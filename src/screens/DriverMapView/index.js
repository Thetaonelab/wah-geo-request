import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import colors from '../../styles/color';
import styles, { width } from '../../styles/style';
import text from '../../styles/text';

const stylesheet = StyleSheet.create({
  buttonStyle: {
    zIndex: 1,
    height: 35,
    width: parseInt(width * 0.7),
    backgroundColor: colors.red
  }
});

class DriverMapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { label: "I'm hyngry and stopped, put me on the map", value: 1 },
        { label: "I'm OTR, tell me about up comming food truk", value: 2 }
      ],
      selectedIndex: null,
      hungrtButtonClicked: false
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
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
        }}>
        <Button
          title="Cancel Search"
          // disabledStyle={{ backgroundColor: color.gray }}
          titleStyle={[text.primaryText]}
          // disabledTextStyle={{ color: color.black }}
          buttonStyle={[stylesheet.buttonStyle]}
          onPress={() => {
            this.setState({ hungrtButtonClicked: false });
          }}
        />
      </View>
    </View>
  );

  bigButton = () => (
    <Button
      title="I'M Hungry"
      // disabledStyle={{ backgroundColor: color.gray }}
      titleStyle={[text.headerText]}
      // disabledTextStyle={{ color: color.black }}
      buttonStyle={[
        {
          backgroundColor: colors.buttonGreen,
          width: parseInt(width * 0.9),
          height: 100,
          marginTop: 20
        }
      ]}
      onPress={() => {
        this.setState({ hungrtButtonClicked: true });
      }}
    />
  );

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.scrollableParentContainer,
          { backgroundColor: colors.white, minHeight: '100%', padding: 0 }
        ]}>
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
            onPress={() => {
                this.props.navigation.navigate('reportAgainstFoodProvider');
            }}
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
            onPress={() => {
              this.props.navigation.navigate('commentsAndRatings');
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            backgroundColor: colors.truckinBlueLight,
            marginTop: 20,
            height: 200
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              marginTop: 10
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: colors.red,
                borderRadius: 15
              }}
            />
            <Text style={text.primaryText}>Truckers Needing</Text>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: colors.buttonGreen,
                borderRadius: 15
              }}
            />
            <Text style={text.primaryText}>Food Service</Text>
          </View>
          {this.state.hungrtButtonClicked
            ? this.radioButtons()
            : this.bigButton()}
        </View>
      </ScrollView>
    );
  }
}

export default DriverMapView;
