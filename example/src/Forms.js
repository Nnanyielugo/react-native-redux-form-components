import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import {
  textInput, picker,
} from 'react-native-redux-form-components';
// eslint-disable-next-line react/prefer-stateless-function
class Forms extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Field
          name="Text"
          component={textInput}
          placeholder="Enter text"
          useDefaultStyle
        />

        <Field
          name="Text 2"
          component={textInput}
          placeholder="Enter text 2"
          useFloatingLabel
        />

        <Field
          name="Picker"
          type="Example Picker"
          component={picker}
        />
      </ScrollView>
    );
  }
}

export default reduxForm({
  form: 'example-form',
})(Forms);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
