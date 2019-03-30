import React from 'react';
import { View, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
// Import custom modules below npm packages & libraries
import store from './src/store';
import AppContainer from './src/navigation/AppContainer';
import { GlobalStyles } from './src/constants';

/**
 * Ignore React-Native timer warnings caused by Firebase
 * https://github.com/facebook/react-native/issues/12981
 */
YellowBox.ignoreWarnings(['Setting a timer']);
/* eslint-disable */
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
  /* eslint-enable */
};
const fbConfig = {
  apiKey: 'AIzaSyAdZC0aMsWxZDOJvmbIxWvUKMU-PShOajQ',
  authDomain: 'adaptive-alarm-9a0ef.firebaseapp.com',
  databaseURL: 'https://adaptive-alarm-9a0ef.firebaseio.com',
  projectId: 'adaptive-alarm-9a0ef',
  storageBucket: 'adaptive-alarm-9a0ef.appspot.com',
  messagingSenderId: '141484900385',
};
firebase.initializeApp(fbConfig);

/**
 * App is the single entry point of the application,
 * this file should not be modified for basic functionality,
 * what happens in this file affects the entire app
 * @eschirtz 03-01-19
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </View>
    );
  }
}

export default App;
