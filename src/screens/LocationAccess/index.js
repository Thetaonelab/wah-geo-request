import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../../styles/style';
import colors from '../../styles/color';
// import text from '../../styles/text';
// import ownStyle from './style';

export default class LocationAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.parentContainer, { padding: 0 }]}>
        <Text>This app needs to have location access.</Text>
        <Button
          label="OK fine!"
          backgroundColor={colors.colorprimary1}
          style={{ marginTop: 30, marginBottom: 10 }}
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'home' })]
            });
            this.props.navigation.dispatch(resetAction);
          }}
        />
      </View>
    );
  }
}

LocationAccess.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
