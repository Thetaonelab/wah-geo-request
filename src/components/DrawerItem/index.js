import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
// import styles from '../../styles/style';
import colors from '../../styles/color';
import text from '../../styles/text';
import ownStyle from './style';

const DrawerItem = (props) =>
  (!props.config.disabled ? (
    <TouchableOpacity
      key={`key-${Math.random()}`}
      style={ownStyle.itemStyle}
      onPress={async () => {
        if (props.config.callback) {
          props.config.callback();
        }
        props.navigation.navigate(props.config.path);
      }}>
      <Text style={text.primaryText}>{props.config.title}</Text>
    </TouchableOpacity>
  ) : (
    <View style={[ownStyle.itemStyle]}>
      <Text style={[text.primaryText, { color: colors.grey0 }]}>
        {props.config.title}
      </Text>
    </View>
  ));

DrawerItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    callback: PropTypes.func,
    disabled: PropTypes.bool
  }).isRequired
};

export default DrawerItem;
