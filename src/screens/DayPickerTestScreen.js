import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Colors, GlobalStyles } from '../constants';
import DayPicker from '../components/DayPicker';

class DayPickerTestScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <DayPicker />
      </View>
    );
  }
}

export default DayPickerTestScreen;
