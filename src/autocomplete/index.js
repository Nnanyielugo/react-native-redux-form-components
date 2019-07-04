import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import debounce from 'lodash/debounce';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LocationItem from './location-item';
import mapRequest from './utils';
import ErrorContainer from '../error-container';

class AutoComplete extends Component {
  static propTypes = {
    iconLeft: PropTypes.bool,
    input: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string,
    text: PropTypes.string,
    iconInline: PropTypes.bool,
    useFloatingLabel: PropTypes.bool,
    label: PropTypes.string,
    includeAnywhere: PropTypes.bool,
    meta: PropTypes.object,
    googleMapsKey: PropTypes.string,
    resultContainerStyle: PropTypes.objectOf(
      PropTypes.string,
    ),
    absoluteDropdownStyle: PropTypes.objectOf(
      PropTypes.string,
    ),
    containerStyle: PropTypes.objectOf(
      PropTypes.string,
    ),
    useAbsoluteDropdown: PropTypes.bool,
  }

  static defaultProps = {
    text: '',
    label: 'Search for a location',
    resultContainerStyle: {
      width: '100%',
      flex: 1,
      borderColor: 'whitesmoke',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 5,
      backgroundColor: 'white',
      opacity: 1,
      zIndex: 999,
    },
    absoluteDropdownStyle: {
      position: 'absolute',
      right: 0,
      top: 45,
    },
    containerStyle: {
      width: '100%',
    },
    googleMapsKey: '',
    useAbsoluteDropdown: false,
  }

  makeRequest = debounce((val) => {
    const { googleMapsKey } = this.props;
    const uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(val)}&types=geocode&language=en&key=${googleMapsKey}`;

    const done = (response) => {
      const results = [];
      response.predictions.forEach((value) => {
        const modifiedVal = {
          ...value,
          place_id: value.place_id,
          description: value.description,
        };
        results.push(modifiedVal);
      });

      this.setState(prevState => ({
        ...prevState,
        loading: false,
        suggestions: results,
      }));
    };

    const error = (message) => {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
      }));
    };
    mapRequest(uri, done, error);
  }, 500)

  constructor(props) {
    super(props);
    this.animatedIsFocused = new Animated.Value(props.input && props.input.value === '' ? 0 : 1);

    this.state = {
      isFocused: false,
      loading: false,
      typing: false,
      suggestions: [],
      error: null,
      text: '',
    };
  }

  /**
   * Initializes Autocomplete to the initial value set by redux-form
   */
  componentDidMount() {
    const { input: { value }, googleMapsKey } = this.props;
    if (value) {
      this.setState(prevState => ({
        ...prevState,
        text: value,
      }));
    }
    if (!googleMapsKey) {
      alert('You need to provide a google maps key for this component to work');
    }
  }

  componentDidUpdate() {
    const { input, meta } = this.props;
    const { error, typing, text } = this.state;
    // const { text, typing } = this.state;
    Animated.timing(this.animatedIsFocused, {
      toValue: (
        this.state.isFocused
        || (input && input.value !== '')
        || text !== ''
      ) ? 1 : 0,
      duration: 200,
    }).start();

    if ((!error && !typing) && (meta && meta.touched && meta.error)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(prevState => ({
        ...prevState,
        error: true,
      }));
    }
  }

  handleFocus = () => {
    const { input } = this.props;
    this.setState(prevState => ({
      ...prevState,
      isFocused: true,
    }));
    input && input.onFocus();
  }

  handleBlur = () => {
    const { input } = this.props;
    this.setState(prevState => ({
      ...prevState,
      isFocused: false,
    }));
    input && input.onBlur();
  }

  /**
   * Resets value to 'Anywhere' when it is triggered from the form,
   * and sets form value (redux-form) to 'Anywhere'
   */
  setAnywhere = () => {
    const { input: { onChange, value } } = this.props;
    if (value === 'Anywhere') onChange('');
    else onChange('Anywhere');
    this.setState(prevState => ({
      ...prevState,
      text: 'Anywhere',
      suggestions: [],
      typing: false,
    }));
  }

  closeDropDown = () => {
    const { suggestions, typing } = this.state;
    if ((suggestions && typing) || suggestions) {
      this.setState(prevState => ({
        ...prevState,
        suggestions: [],
        typing: false,
      }));
    }
  }

  handleTextChange = (val) => {
    this.setState(prevState => ({
      ...prevState,
      loading: true,
      typing: true,
      error: null,
      text: val,
    }));
    this.makeRequest(val);
  }

  getCurrentLocation = () => {
    const { googleMapsKey } = this.props;
    this.setState(prevState => ({
      ...prevState,
      loading: true,
      suggestions: [],
    }));
    const options = {
      enableHighAccuracy: Platform.OS === 'ios',
      timeout: 20000,
      maximumAge: 1000,
    };
    Keyboard.dismiss();

    const success = (position) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${googleMapsKey}`;

      const done = (response) => {
        const results = [];
        const currentLocation = response.results[0];
        const modifiedItem = {
          ...currentLocation,
          place_id: currentLocation.place_id,
          description: currentLocation.formatted_address,
        };
        results.push(modifiedItem);
        this.setState(prevState => ({
          ...prevState,
          loading: false,
          suggestions: results,
        }));
      };

      const failed = (message) => {
        this.setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      };
      mapRequest(url, done, failed);
    };

    const error = (error) => {
      alert(error.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  fetchDetails = (id) => {
    const { input: { onChange } } = this.props;
    const { suggestions } = this.state;
    const result = suggestions.find(suggestion => suggestion.place_id === id);
    this.setState(prevState => ({
      ...prevState,
      text: result.description,
      suggestions: [],
      typing: false,
    }));
    onChange(result.description);
    Keyboard.dismiss();
    return result;
  }

  keyExtractor = (item, index) => index;

  renderItem = ({ item, index }) => (
    <LocationItem
      id={item.place_id}
      index={index}
      list={this.state.suggestions}
      description={item.description}
      fetchDetails={this.fetchDetails}
    />
  );

  renderInputView = () => {
    const {
      iconInline, useFloatingLabel, meta, label, includeAnywhere,
    } = this.props;
    const { text, error } = this.state;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [
          Platform.OS === 'android' ? 8 : 0,
          Platform.OS === 'android' ? -10 : -15,
        ],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [13, 11],
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };

    if (!useFloatingLabel) {
      return (
        <View style={[
          styles.inputContainer,
          iconInline && styles.bottomBorder,
          includeAnywhere && { justifyContent: 'space-between' },
          error && styles.errorView,
        ]}
        >
          <Icon name="map-marker" style={{ marginTop: 10, marginBottom: 5 }} size={20} color="#f58220" />
          <TextInput
            placeholder={label}
            value={text}
            style={[styles.input, !iconInline && styles.bottomBorder]}
            onChangeText={this.handleTextChange}
            underlineColorAndroid="transparent"
          />
        </View>
      );
    }
    return (
      <View style={[
        styles.inputContainer,
        iconInline && styles.bottomBorder,
        includeAnywhere && { justifyContent: 'space-between' },
        error && styles.errorView,
      ]}
      >
        <Icon name="map-marker" style={{ marginTop: 8 }} size={20} color="#f58220" />
        <View style={[styles.input, { marginTop: 8 }]}>
          <Animated.Text style={[labelStyle, error && styles.error]}>{label}</Animated.Text>
          <TextInput
            value={text}
            style={[styles.input, !iconInline && styles.bottomBorder]}
            onChangeText={this.handleTextChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  };

  render() {
    const { loading, typing, suggestions } = this.state;
    const {
      meta, resultContainerStyle, absoluteDropdownStyle, useAbsoluteDropdown,
      containerStyle,
    } = this.props;
    return (
      <View style={[containerStyle]}>

        {this.renderInputView()}

        <View style={[resultContainerStyle, useAbsoluteDropdown && absoluteDropdownStyle]}>
          {!!typing && (
            <TouchableOpacity style={styles.currentPosition} onPress={this.getCurrentLocation}>
              <Text style={{ marginTop: 5, marginBottom: 5 }}>Use current location</Text>
            </TouchableOpacity>
          )}
          {loading && <ActivityIndicator animating />}
          {suggestions && (
            <FlatList
              data={suggestions}
              style={{ width: '100%' }}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              keyboardShouldPersistTaps="always"

            />
          )}
        </View>
        {meta && meta.submitFailed && meta.error && (
          <ErrorContainer>{`${meta.error}!`}</ErrorContainer>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: '95%',
    paddingBottom: 0,
    marginRight: 5,
  },
  bottomBorder: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  currentPosition: {
    backgroundColor: 'whitesmoke',
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
  errorView: {
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AutoComplete;
