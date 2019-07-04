import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class LocationItem extends PureComponent {
  static propTypes = {
    fetchDetails: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
  }

  isLastItem = (array, n) => array.length === n + 1

  render() {
    const {
      list, index, fetchDetails, description, id,
    } = this.props;
    return (
      <TouchableOpacity
        style={
          [
            styles.root,
            this.isLastItem(list, index) ? {} : { borderBottomWidth: StyleSheet.hairlineWidth },
          ]
        }
        onPress={() => fetchDetails(id)}
      >
        <Text>{description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    marginHorizontal: 5,
    borderColor: '#EAEDED',
    justifyContent: 'center',
  },
});

export default LocationItem;
