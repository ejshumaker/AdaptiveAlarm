import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
// Import custom modules below npm packages & libraries
import store from './src/store';
import AppContainer from './src/navigation/AppContainer';
import { GlobalStyles } from './src/constants';

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
