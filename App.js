import React from 'react';
import { View } from 'react-native';

// Import custom modules below npm packages & libraries
import AppContainer from './src/navigation/AppContainer';
import { GlobalStyles } from './src/constants';


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
        <AppContainer />
      </View>
    );
  }
}

export default App;
