import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Radio extends Component {
  touchable = this.props.touchable

  static propTypes = {
    marked: PropTypes.bool,
    onPress: (prop, propName, component) => {
      // eslint-disable-next-line eqeqeq
      if (prop.touchable === true && prop[propName] == undefined) {
        return new Error(`${propName} is marked as required if touchable is true in ${component}`);
      }
    },
    size: PropTypes.number,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    touchable: PropTypes.bool,
  }

  static defaultProps = {
    marked: true,
    size: 30,
    disabled: false,
    color: 'grey',
    touchable: false,
  }

  render() {
    const {
      marked, size, color, disabled, onPress, touchable,
    } = this.props;
    if (!touchable) {
      return <Icon name={marked ? 'radiobox-marked' : 'radiobox-blank'} size={size} color={disabled ? 'gray' : color} />;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Icon name={marked ? 'radiobox-marked' : 'radiobox-blank'} size={size} color={disabled ? 'gray' : color} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Radio;
