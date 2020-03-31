import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../styles/color';
import styles, { width, height } from '../../styles/style';
import text from '../../styles/text';

const stylesheet = StyleSheet.create({
  input: {
    zIndex: 1,
    backgroundColor: colors.white,
    height: 40,
    paddingLeft: 20,
    width: '80%',
    borderColor: colors.truckinBlue,
    color: colors.truckinBlue
  },
  buttonStyle: {
    zIndex: 1,
    height: 35,
    width: parseInt(width * 0.4),
    backgroundColor: colors.red
  }
});

class ReportAgainstDriver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      types: ['AAAAAAA', 'FFFFFFF']
    };
  }

  render() {
    return (
      <View
        style={[
          styles.appContainer,
          { backgroundColor: colors.truckinBlue, padding: 10 }
        ]}>
        <Text
          style={[
            text.heroText,
            {
              marginTop: 10,
              textAlign: 'center'
            }
          ]}>
          Drivers not playing by the rules?
        </Text>
        <Text
          style={[
            text.heroText,
            {
              marginTop: 10,
              textAlign: 'center'
            }
          ]}>
          We want to know
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}>
          <TextInput
            placeholder="TGI Fridays"
            placeholderTextColor={[colors.truckinBlue]}
            underlineColorAndroid={colors.transparent}
            style={[styles.textbox, stylesheet.input]}
            onChangeText={() => {
              //   this.setState({ firstName: value });
            }}
            // value={this.state.firstName}
          />
          <Picker
            mode="dialog"
            itemStyle={[text.primaryText, { color: colors.black }]}
            style={[stylesheet.input, { marginTop: 20 }]}
            // selectedValue={this.state.typeOfDocument}
            // onValueChange={value => {
            //   this.setState({ typeOfDocument: value });
            // }}
          >
            {this.state.types.map((type, index) => (
              <Picker.Item label={type} value={type} key={index} />
            ))}
          </Picker>
          <TextInput
            multiline
            maxLength={1000}
            underlineColorAndroid={colors.transparent}
            placeholder="Leave your comments.."
            placeholderTextColor={colors.secondaryText}
            style={[
              stylesheet.input,
              {
                height: height * 0.1,
                marginVertical: 30,
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
          <Icon name="camera" size={40} style={{ marginHorizontal: 7, color: colors.white }} />
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
            onPress={() => {
              this.props.navigation.navigate('commentsAndRatings');
            }}
          />
        </View>
      </View>
    );
  }
}

export default ReportAgainstDriver;
