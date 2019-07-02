import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
  },
  activeInputStyle: {
    borderBottomColor: 'green',
  },
  inputErrorStyle: {
    borderBottomColor: 'red',
  },
  input: {
    paddingBottom: Platform.OS === 'ios' ? 5 : 0,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  errorStyle: {
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  errorTextStyle: {
    color: 'red',
    marginBottom: -4,
    marginTop: -8,
  },
});

export default styles;
