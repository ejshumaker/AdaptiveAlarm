/**
  * Uses Google Maps API to autocomplete search entries.
  * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
  * @weinoh 03-26-2019
  * @ejshumaker 03-24-2019
*/

import React, { Component } from 'react';
import { View } from 'react-native';
import { GlobalStyles } from '../constants';

import Autocomplete from '../components/Autocomplete';

export default class AutocompleteScreen extends Component {

  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <Autocomplete />
      </View>
    );
  }
}
