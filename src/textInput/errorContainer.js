import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const errorContainer = props => (
  <View>
    <View style={props.style}>
      <Text style={props.textStyle}>{props.children}</Text>
    </View>
  </View>
);

errorContainer.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

errorContainer.defaultProps = {
  style: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textStyle: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
};

export default errorContainer;
