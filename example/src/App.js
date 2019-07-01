import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './create-store';
import Forms from './Forms';

const store = createStore();

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Forms />
      </Provider>
    );
  }
}
