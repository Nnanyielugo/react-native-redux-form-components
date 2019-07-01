import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import SwitchCircle from '~/src/components/formComponents/switch-circle';

// const checkInitial = (fields, datum) => {
//   let initializeWithValue = false;
//   const valuesInState = fields && fields.getAll();
//   valuesInState && valuesInState.map((item) => {
//     if (item === datum) initializeWithValue = true;
//   });
//   return initializeWithValue;
// };

class CircleCheckArray extends Component {
  static propTypes = {
    data: PropTypes.array,
    label: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string,
    }),
  }

  toggleSwitchValue = (value) => {
    const { input: { onChange } } = this.props;
    onChange(value);
  }

  getMarkedState = (spec) => {
    const { input: { value } } = this.props;
    return spec === value;
  }

  render() {
    const { data, label, input: { value } } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {data.map((specs, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <SwitchCircle
              plain
              onClick={() => this.toggleSwitchValue(specs)}
              initial={value === specs} />
            <View style={styles.item}>
              <Text>{data[index]}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  item: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  label: {
    marginTop: 5,
    marginRight: 15,
    color: '#444',
    fontSize: 15,
  },
});

export default CircleCheckArray;
