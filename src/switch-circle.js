import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Switch extends Component {
  static propTypes = {
    size: PropTypes.number,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    input: PropTypes.object,
    initial: PropTypes.bool,
    onClick: PropTypes.func,
    plain: PropTypes.bool,
    toggle: PropTypes.bool,
  }

  static defaultProps = {
    size: 30,
    disabled: false,
    color: 'grey',
  }

  state = {
    marked: this.props.initial,
  }

  componentDidUpdate(prevProps) {
    const { initial } = this.props;
    if (prevProps.initial !== initial) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ marked: initial });
    }
  }

  changeMarked = () => {
    const { onClick, plain, toggle } = this.props;
    if (toggle) {
      this.setState(prevState => ({
        ...prevState,
        marked: !prevState.marked,
      }));
    }
    if (plain) {
      onClick();
    } else {
      const { input: { onChange, checked } } = this.props;
      onChange(!checked);
    }
  }

  render() {
    const { size, color, disabled } = this.props;
    const { marked } = this.state;
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

export default Switch;
