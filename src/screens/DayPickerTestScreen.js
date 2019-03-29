import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Colors, GlobalStyles } from '../constants';
import DayPicker from '../components/DayPicker';
import PropTypes from "prop-types";

import { CloseIcon } from '../icons/close';

class DayPickerTestScreen extends Component {
  constructor() {
    super();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={GlobalStyles.container}>
        <CloseIcon style={{ marginLeft: 28, marginTop: 75 }} onPress={() => {
          navigation.navigate("Home");
        }} />
        <DayPicker />
      </View>
    );
  }
}

DayPicker.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export default DayPickerTestScreen;
