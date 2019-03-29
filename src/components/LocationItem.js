/*
 * Used to display location results from Autocomplete.
 * uses https://github.com/EQuimper/react-native-google-autocomplete
 * @weinoh 03-26-2019
 */

import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../constants';

class LocationItem extends PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
    fetchDetails: PropTypes.func.isRequired,
    place_id: PropTypes.string.isRequired,
  }

  handlePress = async () => {
    const { fetchDetails, place_id } = this.props;
    Keyboard.dismiss();
    const res = await fetchDetails(place_id);
    const { lat } = res.geometry.location;
    const { lng } = res.geometry.location;
    console.log(`lat: ${lat} lng: ${lng}`);
  };

  render() {
    const { description } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={GlobalStyles.searchSuggestions}>
          { description }
        </Text>
      </TouchableOpacity>
    );
  }
}

export default LocationItem;


// TODO: how to reference props correctly here ?
