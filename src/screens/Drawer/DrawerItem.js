import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
// import styles from '../../styles/style';
// import colors from '../../styles/color';
import text from '../../styles/text';

const DrawerItem = (props) => (
  <TouchableOpacity
    style={{
      alignSelf: 'stretch',
      height: 50,
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}
    onPress={async () => {
      if (props.config.callback) {
        props.config.callback();
      }
      props.navigation.navigate(props.config.path);
    }}>
    <Text style={text.primaryText}>{props.config.title}</Text>
  </TouchableOpacity>
);

DrawerItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    callback: PropTypes.func
  }).isRequired
};

export default DrawerItem;
