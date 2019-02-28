import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';

// Import custom modules below npm packages & libraries
import AppNavigator from './src/navigation/AppNavigator';
import { GlobalStyles } from './src/constants';

const AppContainer = createAppContainer(AppNavigator);

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
