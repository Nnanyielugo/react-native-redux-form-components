import React from 'react';
import { TextInput, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from './defaultStyles';

const plain = (props) => {
  const {
    input,
    input: {
      value, onBlur, onFocus, onChange,
    },
    meta,
    meta: {
      touched, invalid, error, active,
    },
    useDefaultStyle,
  } = props;
  return (
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
      value={input && value && value.toString()}
      onBlur={input && onBlur}
      onChangeText={input && onChange}
      onFocus={input && onFocus}
      underlineColorAndroid="transparent"
    />
  );
};

plain.propTypes = {
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
  placeholder: PropTypes.string,
  defaultStyle: PropTypes.object,
  useDefaultStyle: PropTypes.bool,
};

export default plain;
