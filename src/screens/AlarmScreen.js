import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles, Colors } from '../constants';

class AlarmScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <View
          style={[
            {
              backgroundColor: Colors.primary,
              width: 48,
              height: 48,
              borderRadius: 8,
            },
            GlobalStyles.margin,
          ]}
        />
        <Text style={[GlobalStyles.h1, GlobalStyles.margin]}>Alarm</Text>
      </View>
    );
  }
}

export default AlarmScreen;
