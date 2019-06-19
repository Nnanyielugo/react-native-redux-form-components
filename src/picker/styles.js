import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerLabel: {
    marginTop: 4,
  },
  scrollWrap: {
    backgroundColor: '#303030',
    margin: 5,
    borderRadius: 10,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  selectionLabel: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionLabelText: {
    color: 'gray',
    fontSize: 16,
    marginTop: 4,
  },
  optionsLabel: {
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  optionsLabelText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 4,
  },
});

export default styles;
