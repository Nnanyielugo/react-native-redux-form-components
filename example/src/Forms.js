import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import {
  TextInput, Picker, CircleSwitchBoxes, Radio,
  textInput, Autocomplete,
} from 'react-native-redux-form-components';

// eslint-disable-next-line react/prefer-stateless-function
class Forms extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Field
          name="autocomplete"
          component={Autocomplete}
          googleMapsKey=""
          useAbsoluteDropdown
        />

        <Field
          name="Text"
          component={TextInput}
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
          component={Picker}
        />

        <Field
          name="circle-switch-boxes"
          component={CircleSwitchBoxes}
          data={['Data 1', 'Data 2', 'Data 3']}
        />

        <Field
          name="circle-switch-boxes 2"
          component={CircleSwitchBoxes}
        />

        <Field
          name="switch-circle"
          component={Radio}
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
