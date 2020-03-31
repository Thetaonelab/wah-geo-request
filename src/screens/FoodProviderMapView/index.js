import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

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

class FoodProviderMapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropAPinPress: false
    };
  }

  bigButton = () => (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
      <Button
        title={
          this.state.dropAPinPress
            ? 'Cancel Pin Drop'
            : 'Press to drop a pin and let them know you are  on the way!'
        }
        // disabledStyle={{ backgroundColor: color.gray }}
        titleStyle={[text.primaryText]}
        // disabledTextStyle={{ color: color.black }}
        buttonStyle={[
          {
            backgroundColor: this.state.dropAPinPress
              ? colors.red
              : colors.buttonGreen,
            width: parseInt(width * 0.45),
            height: 100,
            marginTop: 20
          }
        ]}
        onPress={() => {
          this.setState({ dropAPinPress: !this.state.dropAPinPress });
        }}
      />
      <Button
        title="Location  Settings/ Check In"
        // disabledStyle={{ backgroundColor: color.gray }}
        titleStyle={[text.primaryText]}
        // disabledTextStyle={{ color: color.black }}
        buttonStyle={[
          {
            backgroundColor: colors.truckinYellow,
            width: parseInt(width * 0.45),
            height: 100,
            marginTop: 20
          }
        ]}
        onPress={() => {
          this.props.navigation.navigate('locationSettings');
        }}
      />
    </View>
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
              this.props.navigation.navigate('reportAgainstDriver');
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
          {this.bigButton()}
        </View>
      </ScrollView>
    );
  }
}

export default FoodProviderMapView;
