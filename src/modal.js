import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class CustomModal extends Component {
  static propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func.isRequired,
    isVisible: PropTypes.func.isRequired,
    useIcon: PropTypes.bool,
    iconName: PropTypes.string,
    setbackgroundColor: PropTypes.bool,
    backgroundColor: PropTypes.string,
    topOffset: PropTypes.number,
  }

  state = {
    modalIsVisible: false,
    slideUpAnim: new Animated.Value(0),
  }

  componentDidMount() {
    if (this.props.isVisible && !this.state.modalIsVisible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ modalIsVisible: true });
      this.startAnim();
    }
  }

  componentDidUpdate() {
    const { isVisible } = this.props;
    const { modalIsVisible } = this.state;
    if (isVisible && !modalIsVisible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ modalIsVisible: true });
      this.startAnim();
    }
    if (!isVisible && modalIsVisible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.handleClose();
    }
    if (!isVisible && !modalIsVisible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.stopAnim();
    }
  }

  startAnim = () => {
    const { slideUpAnim } = this.state;
    Animated.timing(slideUpAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  stopAnim = () => {
    const { slideUpAnim } = this.state;
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 100,
    }).start();
  }

  handleClose = () => {
    const { closeModal } = this.props;
    if (typeof closeModal === 'function') {
      closeModal();
    }
    this.setState({ modalIsVisible: false });
  }

  render() {
    const { modalIsVisible, slideUpAnim } = this.state;
    const {
      useIcon, iconName, setbackgroundColor,
      backgroundColor, topOffset,
    } = this.props;

    const justify = slideUpAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [200, topOffset || 40],
    });

    return (
      <Modal visible={modalIsVisible} transparent animationType="fade">
        <View style={styles.modal}>
          <Animated.View style={[styles.modalWrapper, { marginTop: justify }, setbackgroundColor && { backgroundColor }]}>
            <View style={styles.container}>
              {useIcon && (
                <View style={styles.icon}>
                  <TouchableOpacity onPress={this.handleClose}>
                    <Icon name={iconName} size={35} />
                  </TouchableOpacity>
                </View>
              )}
              {this.props.children}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  modal: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalWrapper: {
    marginVertical: 40,
    width: Dimensions.get('window').width * 0.9,
    minHeight: 100,
    opacity: 1,
    borderRadius: 3,
  },
  icon: {
    marginLeft: Dimensions.get('window').width < 500 ? Dimensions.get('window').width * 0.8 : Dimensions.get('window').width * 0.85,
    marginTop: -5,
  },
});

export default CustomModal;
