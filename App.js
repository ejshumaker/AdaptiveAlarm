import React from 'react';
import { Text, View } from 'react-native';

// Import custom modules below npm packages & libraries
import {
  Layout,
  GlobalStyles,
  Colors,
} from './src/constants';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Adaptive Alarm Boiler Plate',
    };
  }

  render() {
    // Deconstruct the 'state' before render calls
    const { message } = this.state;
    return (
      <View style={[GlobalStyles.centerChildren, { backgroundColor: Colors.background }]}>
        <Text style={{ fontSize: Layout.fontSize.xs }}>{message}</Text>
        <Text style={{ fontSize: Layout.fontSize.s }}>{message}</Text>
        <Text style={{ fontSize: Layout.fontSize.m }}>{message}</Text>
      </View>
    );
  }
}

export default App;
