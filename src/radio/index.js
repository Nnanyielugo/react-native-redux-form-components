import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Radio extends Component {
  static propTypes = {
    size: PropTypes.number,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    input: PropTypes.object,
    initial: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    size: 30,
    disabled: false,
    color: 'grey',
  }

  constructor(props) {
    super(props);
    this.isReduxForm = !!props.input;
  }

  changeMarked = () => {
    const { onClick } = this.props;
    if (this.isReduxForm) {
      const { input: { onChange, value } } = this.props;
      onChange(!value);
    } else if (typeof onClick === 'function') {
      onClick();
    }
  }

  render() {
    const {
      size, color, disabled, initial, input,
    } = this.props;
    const marked = this.isReduxForm ? input.value : initial;
    return (
      <TouchableOpacity onPress={this.changeMarked}>
        <View>
          <Icon
            name={marked ? 'ios-radio-button-on' : 'ios-radio-button-off'}
            size={size}
            color={disabled ? 'whitesmoke' : color}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Radio;
