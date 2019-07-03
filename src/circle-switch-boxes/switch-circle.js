import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SwitchCircle extends Component {
  static propTypes = {
    size: PropTypes.number,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    input: PropTypes.object,
    initial: PropTypes.bool,
    onClick: PropTypes.func,
    toggle: PropTypes.bool,
  }

  static defaultProps = {
    size: 30,
    disabled: false,
    color: 'grey',
  }

  state = {
    marked: false,
  }

  componentDidMount() {
    const { input, initial } = this.props;
    this.isReduxForm = !!input;
    this.setState({
      marked: this.isReduxForm ? input.value : initial,
    });
  }

  /* eslint-disable no-lonely-if, react/no-did-update-set-state */
  componentDidUpdate(prevProps) {
    const { input, initial } = this.props;
    if (this.isReduxForm) {
      if (prevProps.input.value !== input.value) {
        this.setState({ marked: input.value });
      }
    } else {
      if (prevProps.initial !== initial) {
        this.setState({ marked: initial });
      }
    }
  }
  /* eslint-enable no-lonely-if react/no-did-update-set-state */

  changeMarked = () => {
    const { onClick, toggle } = this.props;
    if (toggle) {
      this.setState(prevState => ({
        ...prevState,
        marked: !prevState.marked,
      }));
    }
    if (this.isReduxForm) {
      const { input: { onChange, value } } = this.props;
      onChange(!value);
    } else if (typeof onClick === 'function') {
      onClick();
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

export default SwitchCircle;
