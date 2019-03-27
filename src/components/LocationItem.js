/*
 * Used to display location results from Autocomplete.
 * uses https://github.com/EQuimper/react-native-google-autocomplete
 * @weinoh 03-26-2019
 */


import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../constants';

class LocationItem extends PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View>
        <Text style={GlobalStyles.searchSuggestions}>
          { this.props.description }
        </Text>
      </View>
    );
  }
}


export default LocationItem;


// TODO: how to reference props correctly here ?
