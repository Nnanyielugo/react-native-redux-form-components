import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Checkbox extends Component {
  static propTypes = {
    size: PropTypes.number,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    input: PropTypes.object,
    initial: PropTypes.bool,
    onClick: PropTypes.func,
    unmarkedColor: PropTypes.string,

  }

  static defaultProps = {
    size: 30,
    disabled: false,
    color: 'grey',
  }

  constructor(props) {
    super(props);
    const { input, initial } = props;
    this.isReduxForm = !!props.input;
    this.state = {
      marked: this.isReduxForm ? input.checked : initial,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.isReduxForm) {
      const { input: { checked } } = this.props;
      const { input } = prevProps;
      if (input.checked !== checked) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ marked: checked });
      }
    } else {
      const { initial } = this.props;
      if (prevProps.initial !== initial) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ marked: initial });
      }
    }
  }

  changeMarked = () => {
    const { onClick } = this.props;
    this.setState(prevState => ({
      ...prevState,
      marked: !prevState.marked,
    }));
    if (this.isReduxForm) {
      const { input: { onChange, checked } } = this.props;
      onChange(!checked);
    } else {
      onClick();
    }
  }

  render() {
    const {
      size, color, disabled, initial, input, unmarkedColor,
    } = this.props;
    const { marked } = this.state;
    return (
      <TouchableOpacity onPress={this.changeMarked}>
        <View style={[marked && { marginVertical: 2 }]}>
          <Icon
            name={marked ? 'ios-checkbox' : 'ios-square-outline'}
            size={marked ? size - 4 : size}
            color={disabled ? 'whitesmoke' : (!marked && unmarkedColor ? unmarkedColor : color)} // eslint-disable-line no-nested-ternary
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Checkbox;
