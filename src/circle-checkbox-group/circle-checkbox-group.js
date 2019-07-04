import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function switchSelected(list, id) {
  const selected = list.find(item => item.id === id);
  selected.checked = true;
  list.map((item) => {
    if (item.id !== id) {
      item.checked = false; // eslint-disable-line no-param-reassign
    }
  });
  return list;
}


function returnSelected(list, id) {
  const selected = list.find(item => item.id === id);
  return selected;
}

function findSelected(list) {
  const selected = list.find(item => item.checked === true);
  return selected;
}

class CircleCheckboxGroup extends Component {
  static propTypes = {
    size: PropTypes.number,
    // disabled: PropTypes.bool,
    color: PropTypes.string,
    items: PropTypes.array,
    row: PropTypes.bool,
    input: PropTypes.object,
    useValue: PropTypes.bool,
  }

  static defaultProps = {
    size: 30,
    // disabled: false,
    color: 'grey',
    items: [
      {
        id: 1,
        name: 'One',
        value: null,
        checked: false,
        disabled: false,
      },
      {
        id: 2,
        name: 'Two',
        value: null,
        checked: true,
        disabled: false,
      },
      {
        id: 3,
        name: 'Three',
        value: null,
        checked: false,
        disabled: false,
      },
    ],
  }

  state = {
    items: this.props.items,
  }

  componentDidMount() {
    const { input: { onChange }, items, useValue } = this.props;
    onChange(useValue ? findSelected(items).value : findSelected(items).name);
  }

  handleSwitch = (list, id) => {
    const { input: { onChange }, useValue } = this.props;
    this.setState(prevState => ({
      ...prevState,
      list: switchSelected(list, id),
    }));
    onChange(useValue ? returnSelected(list, id).value : returnSelected(list, id).name);
  }

  render() {
    const { size, color, row } = this.props;
    const { items } = this.state;

    return (
      <View style={{ flexDirection: row ? 'row' : 'column' }}>
        {items.map((item) => {
          const {
            id, name, checked, disabled,
          } = item;
          return (
            <View key={id} style={[styles.container, { marginRight: row ? 20 : null }]}>
              <Icon
                name={checked ? 'ios-checkmark-circle' : 'ios-radio-button-off'}
                size={size}
                color={disabled ? 'gray' : color}
                onPress={id => this.handleSwitch(items, item.id)}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  text: {
    color: '#111',
    fontSize: 16,
  },
});

export default CircleCheckboxGroup;
