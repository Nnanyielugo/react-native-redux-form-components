import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
        />

        <Field
          name="Text 2"
          component={textInput}
          placeholder="Enter text 2"
          useFloatingLabel
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
