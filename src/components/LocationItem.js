/*
 * Used to display location results from Autocomplete.
 * uses https://github.com/EQuimper/react-native-google-autocomplete
 * @weinoh 03-26-2019
 */


import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../constants';

class LocationItem extends PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
  }


  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id);
    console.log('res output:', JSON.stringify(res));
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handlePress}>
        <Text style={GlobalStyles.searchSuggestions}>
          { this.props.description }
        </Text>
      </TouchableOpacity>
    );
  }
}


export default LocationItem;


// TODO: how to reference props correctly here ?
