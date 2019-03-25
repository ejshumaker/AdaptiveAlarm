/**
  * Uses Google Maps API to autocomplete search entries.
  * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
  * @ejshumaker 03-24-2019
*/

import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  Keyboard,
  Image
} from "react-native";
import { Colors, GlobalStyles } from '../constants';

import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Autocomplete from '../components/Autocomplete';

class AutocompleteScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <Autocomplete/>
      </View>
    );
  }
}

export default AutocompleteScreen;
