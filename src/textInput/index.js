import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import Plain from './plain';
import FloatingLabel from './floatinglabel';
import ErrorContainer from '../errorContainer';
import styles from './defaultStyles';

export default class TextInputComp extends Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      onFocus: PropTypes.func,
    }).isRequired,
    meta: PropTypes.arrayOf({
      touched: PropTypes.bool,
      invalid: PropTypes.bool,
      error: PropTypes.string,
      active: PropTypes.bool,
    }).isRequired,
    labelStyle: PropTypes.object,
    placeholder: PropTypes.string,
    useFloatingLabel: PropTypes.bool,
    standInPlaceHolder: PropTypes.string,
    inlineError: PropTypes.bool,
    useDefaultStyle: PropTypes.bool,
    defaultStyle: PropTypes.objectOf(
      PropTypes.string,
      PropTypes.number,
    ),
  };

  static defaultProps = {
    defaultStyle: styles.input,
    labelStyle: {},
    placeholder: '',
    standInPlaceHolder: '',
    useDefaultStyle: true,
  }

  constructor(props) {
    super(props);
    this.animatedIsFocused = new Animated.Value(props.input && props.input.value === '' ? 0 : 1);
    this.state = {
      isFocused: false,
    };
  }

  componentDidUpdate() {
    const { input } = this.props;
    Animated.timing(this.animatedIsFocused, {
      toValue: (this.state.isFocused || (input && input.value !== '')) ? 1 : 0,
      duration: 100,
    }).start();
  }

  handleFocus = () => {
    const { input } = this.props;
    this.setState({ isFocused: true });
    input && input.onFocus();
  }

  handleBlur = () => {
    const { input } = this.props;
    this.setState({ isFocused: false });
    input && input.onBlur();
  }

  render() {
    const {
      input, meta, useFloatingLabel, placeholder, standInPlaceHolder, inlineError, ...props
    } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      // marginBottom: -15,
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 11],
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    return (
      <Fragment>
        {!useFloatingLabel && (
          <Plain
            input={input}
            meta={meta}
            placeholder={placeholder}
            {...props}
          />
        )}

        {useFloatingLabel && (
          <FloatingLabel
            input={input}
            meta={meta}
            placeholder={placeholder}
            labelStyle={labelStyle}
            isFocused={this.state.isFocused}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            {...props}
          />
        )}
        {inlineError && (meta && meta.submitFailed && meta.error) && (
          <ErrorContainer
            style={[styles.errorStyle, props.errorStyle]}
            textStyle={styles.errorTextStyle}
          >
            {`${meta.error}!`}
          </ErrorContainer>
        )}
      </Fragment>
    );
  }
}
