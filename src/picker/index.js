import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Radio from './picker-radio';
import {
  updateList, getSelectedFromName, uncheckonUnmount,
  updateListOnMount, defaultPickerList,
} from './helpers';
import styles from './styles';
import Modal from '../modal';

class Picker extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    defaultList: PropTypes.object,
    selected: PropTypes.object,
    list: PropTypes.array,
    radioColor: PropTypes.string,
    colorBorderOnSelect: PropTypes.bool,
    selectedBorderColor: (prop, propName, component) => {
      // eslint-disable-next-line eqeqeq
      if (prop.colorBorderOnSelect === true && prop[propName] == undefined) {
        return new Error(`${propName} is marked as required if colorBorderOnSelect is true in ${component}`);
      }
    },
    type: PropTypes.string,
    withReduxForm: PropTypes.bool,
    input: PropTypes.object,
    useListLabel: PropTypes.bool,
    plain: PropTypes.bool,
    delayed: PropTypes.bool,
    useValue: PropTypes.bool,
    pickerLabelStyle: PropTypes.objectOf(PropTypes.string),
    topOffset: PropTypes.number.isRequired,
  }

  static defaultProps = {
    isVisible: false,
    defaultList: {
      name: 'Select',
      checked: true,
    },
    selected: null,
    list: defaultPickerList,
    radioColor: undefined,
    colorBorderOnSelect: false,
    selectedBorderColor: undefined,
    type: 'Type',
    useListLabel: true,
    pickerLabelStyle: styles.pickerLabel,
    withReduxForm: true,
  }

  state = {
    isVisible: this.props.isVisible,
    defaultList: this.props.defaultList,
    selected: this.props.selected,
    list: this.props.list,
    radioColor: this.props.radioColor,
    type: this.props.type,
  }

  componentDidMount() {
    const { input: { value }, delayed, useValue } = this.props;
    const { list, selected } = this.state;

    if (!selected && !delayed && value) {
      this.setState(prevState => ({
        ...prevState,
        selected: getSelectedFromName(list, value, useValue),
        list: updateListOnMount(list, value, useValue),
      }));
    }
  }

  componentDidUpdate(prevProps) {
    const { input: { value }, delayed, useValue } = this.props;
    const { list, selected } = this.state;

    if (this.props.list.length && delayed && !prevProps.selected && !selected && value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(prevState => ({
        ...prevState,
        selected: getSelectedFromName(list, value, useValue),
      }));
    }

    // Check if the list prop changes after initialization, and set list state to the new prop
    if (prevProps.list.length !== this.props.list.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(prevState => ({
        ...prevState,
        list: this.props.list,
      }));
    }
  }

  componentWillUnmount() {
    // Fix bug where List initializes with the previous checked value stillremaining true
    // Even if value passed down was clearedand does not trigger a checked
    // in mount or update lifecycle hook
    const { list } = this.props;
    uncheckonUnmount(list);
  }

  handlePress = () => {
    this.setState(prevState => ({
      ...prevState,
      isVisible: true,
    }));
  }

  setAnytype = () => {
    const { input: { onChange, value } } = this.props;
    const { selected } = this.state;
    if (!selected && !value) return;
    onChange('');
    this.setState(prevState => ({
      ...prevState,
      selected: null,
    }));
  }

  clearSelected = () => {
    const { withReduxForm, input } = this.props;
    if (withReduxForm) {
      input.onChange('');
    }
    this.setState({
      selected: null,
    });
    this.closeModal();
  }

  selectItem = (id) => {
    const { list } = this.state;
    const selectedItem = list.find(item => item.id === id);
    // Uncheck default list, set selected item. then update list
    this.setState(prevState => ({
      ...prevState,
      defaultList: {
        ...prevState.defaultList,
        checked: false,
      },
      selected: selectedItem,
      list: updateList(prevState.list, id),
    }));
    this.closeModal();

    const { withReduxForm, input, useValue } = this.props;
    if (withReduxForm) {
      if (useValue) {
        input.onChange(selectedItem.value);
      } else {
        input.onChange(selectedItem.name);
      }
    }
  }

  closeModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isVisible: false,
    }));
  }

  render() {
    /**
     * @property {list} array: List of picker items to display and their checked boolean
     * @property {selected} bool: Self-explanatory
     * @property {defaultList} object: Item and checked boolean to display as header
     * @property {isVisible} bool: Display modal. Defaults to false. Clicking the Picker changes the boolean to true
     * @property {radioColor} string: Self-explanatory
     * @property {type} string: Picker label to show. Required if @property {plain} is false
     */
    const {
      isVisible, defaultList, list, selected, radioColor, type,
    } = this.state;
    /**
     * @property {colorBorderOnSelect} bool: Self-explanatory
     * @property {selectedBorderColor} string: Self-explanatory
     * @property {useListLabel} bool: Display a label on picker even when nothing is selected (default list name will be used)
     * @property {plain} bool: displays a label above picker. Defaults to undefined
     * @property {pickerLabelStyle} object: style for picker label
     * @property {topOffset} number: absolute margin from top for modal
     */
    const {
      colorBorderOnSelect, selectedBorderColor,
      useListLabel, plain, pickerLabelStyle,
      topOffset,
    } = this.props;

    return (
      <View style={styles.container}>
        <Fragment>
          {!plain && (
            <View>
              <Text>{type}</Text>
            </View>
          )}

          <TouchableWithoutFeedback onPress={this.handlePress}>
            <View
              style={[styles.picker, { borderBottomColor: selected && colorBorderOnSelect ? selectedBorderColor : null }]}
            >
              {useListLabel && (
                <Text style={pickerLabelStyle}>{selected ? selected.name : defaultList.name}</Text>
              )}
              {!useListLabel && (
                <Text style={pickerLabelStyle}>{selected ? selected.name : ''}</Text>
              )}
              <Icon name="chevron-down" size={30} color="#E56108" />
            </View>
          </TouchableWithoutFeedback>

          <Modal isVisible={isVisible} topOffset={topOffset}>
            <ScrollView contentContainerStyle={styles.scroll}>
              <View style={styles.scrollWrap}>
                <TouchableOpacity onPress={this.clearSelected}>
                  {useListLabel && (
                    <View style={styles.selectionLabel}>
                      <Text style={styles.selectionLabelText}>{defaultList.name}</Text>
                      <Radio touchable={false} disabled marked={(defaultList.checked && list.every(item => !item.checked))} />
                    </View>
                  )}
                </TouchableOpacity>
                {list.map((item) => {
                  const { id, name, checked } = item;
                  return (
                    <TouchableOpacity key={id} onPress={() => this.selectItem(item.id)}>
                      <View style={styles.optionsLabel}>
                        <Text style={styles.optionsLabelText}>{name}</Text>
                        <Radio touchable={false} marked={checked} color={checked ? radioColor : undefined} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Modal>
        </Fragment>
      </View>
    );
  }
}

export default Picker;
