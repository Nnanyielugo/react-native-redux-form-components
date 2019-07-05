import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Checkbox from '../checkbox';

const checkInitial = (fields, datum) => {
  let initializeWithValue = false;
  const valuesInState = fields && fields.getAll();
  if (valuesInState) {
    valuesInState.map((item) => {
      if (!initializeWithValue) {
        initializeWithValue = (item === datum);
      }
    });
  }
  return initializeWithValue;
};

class CheckboxArray extends Component {
  static propTypes = {
    fields: PropTypes.object,
    data: PropTypes.array,
  }

  static defaultProps = {
    data: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
  }

  togglePushValues = (value) => {
    const { fields } = this.props;
    const totalValues = fields.getAll();
    const index = totalValues && totalValues.findIndex(item => item === value);
    if (index > -1) {
      fields.map((item, id) => {
        if (id === index) {
          fields.remove(id);
        }
      });
    } else fields.push(value);
  }


  render() {
    const { data, fields } = this.props;
    return (
      <View style={{ margin: 15 }}>
        {data.map((specs, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Checkbox
              plain
              onClick={() => this.togglePushValues(specs)}
              initial={checkInitial(fields, specs)}
            />
            <View style={{ marginTop: 5, marginLeft: 5 }}>
              <Text>{data[index]}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default CheckboxArray;
