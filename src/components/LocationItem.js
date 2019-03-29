/*
 * Used to display location results from Autocomplete.
 * uses https://github.com/EQuimper/react-native-google-autocomplete
 * @weinoh 03-26-2019
 */
/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles, Colors } from '../constants';
import { LocationIcon } from '../icons/location';

class LocationItem extends PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
    fetchDetails: PropTypes.func.isRequired,
    updateDest: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
    place_id: PropTypes.string.isRequired,
  };

  handlePress = async () => {
    const {
      fetchDetails, place_id, updateDest, resetSearch,
    } = this.props;
    Keyboard.dismiss();
    const res = await fetchDetails(place_id);
    const { lat } = res.geometry.location;
    const { lng } = res.geometry.location;
    const formattedAddress = res.formatted_address;
    updateDest('destination', formattedAddress);
    updateDest('lat', lat);
    updateDest('lng', lng);
    resetSearch();
  };

  render() {
    const { description } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View
          style={{
            flexDirection: 'row',
            width: 272,
            borderTopWidth: 0.5,
            borderTopColor: Colors.darkGray,
          }}
        >
          <LocationIcon style={{ marginLeft: 13, marginTop: 14 }} />
          <Text style={GlobalStyles.searchSuggestions}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default LocationItem;

// TODO: how to reference props correctly here ?
