import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Radio from '../radio';

class CircleCheckArray extends Component {
  static propTypes = {
    data: PropTypes.array,
    label: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string,
    }),
    withDataLabel: PropTypes.bool,
  }

  static defaultProps = {
    data: ['Data 1', 'Data 2'],
    label: 'Data Label',
    withDataLabel: true,
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
    const {
      data, label, input: { value },
      withDataLabel,
    } = this.props;
    return (
      <View style={[styles.container, withDataLabel && { flexDirection: 'row' }]}>
        {withDataLabel && <Text style={styles.label}>{label}</Text>}
        {data.map((specs, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Radio
              plain
              onClick={() => this.toggleSwitchValue(specs)}
              initial={value === specs}
            />
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
export { Radio };
