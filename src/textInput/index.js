import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  View, Animated, TextInput, Platform,
} from 'react-native';

import Plain from './plain';
import ErrorContainer from './errorContainer';
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
      input, meta, useFloatingLabel, placeholder, standInPlaceHolder, inlineError,
      input: {
        value, onChange, onBlur, onFocus,
      },
      meta: {
        touched, invalid, error, active,
      },
      defaultStyle, useDefaultStyle, ...props
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
          <View style={styles.container}>
            <TextInput
              style={[
                useDefaultStyle && styles.input,
                { marginTop: Platform.OS === 'ios' ? 10 : 5 },
                (meta && invalid && touched) || (meta && touched && error)
                  ? styles.inputErrorStyle
                  : null,
                meta && active
                  ? styles.activeInputStyle
                  : null,
              ]}
              {...props}
              placeholder={placeholder}
              value={input && value && value.toString()}
              onBlur={input && onBlur}
              onChangeText={input && onChange}
              onFocus={input && onFocus}
              underlineColorAndroid="transparent"
            />
          </View>
        )}

        {useFloatingLabel && (
          <View style={styles.container}>
            <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
            <TextInput
              style={[
                useDefaultStyle && styles.input,
                { marginTop: Platform.OS === 'ios' ? -2 : -14 },
                (meta && invalid && touched) || (meta && touched && error)
                  ? styles.inputErrorStyle
                  : null,
                meta && active
                  ? styles.activeInputStyle
                  : null,
              ]}
              {...props}
              placeholder={this.state.isFocused && standInPlaceHolder ? standInPlaceHolder : ''}
              underlineColorAndroid="transparent"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              value={input && value && value.toString()}
              onChangeText={input && onChange}
            />
          </View>
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
