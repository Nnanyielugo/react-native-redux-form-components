import React from 'react';
import {
  View, Animated, TextInput, Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './defaultStyles';

const floatinglabel = (props) => {
  const {
    input,
    input: {
      value, onChange,
    },
    meta,
    meta: {
      touched, invalid, error, active,
    },
    placeholder,
    labelStyle,
    standInPlaceHolder,
    isFocused,
    handleFocus,
    handleBlur,
    defaultStyle,
    useDefaultStyle,
  } = props;
  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput
        style={[
          useDefaultStyle && defaultStyle,
          { marginTop: Platform.OS === 'ios' ? -2 : -14 },
          (meta && invalid && touched) || (meta && touched && error)
            ? styles.inputErrorStyle
            : null,
          meta && active
            ? styles.activeInputStyle
            : null,

        ]}
        {...props}
        placeholder={isFocused && standInPlaceHolder ? standInPlaceHolder : ''}
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={input && value && value.toString()}
        onChangeText={input && onChange}
      />
    </View>
  );
};

floatinglabel.propTypes = {
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
  standInPlaceHolder: PropTypes.string,
  isFocused: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  defaultStyle: PropTypes.object,
  useDefaultStyle: PropTypes.bool,
};

export default floatinglabel;
