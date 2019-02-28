import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Adaptive Alarm Boiler Plate',
    };
  }

  render() {
    const { message } = this.state;
    return (
      <View style={styles.container}>
        <Text>{message}</Text>
      </View>
    );
  }
}

export default App;
