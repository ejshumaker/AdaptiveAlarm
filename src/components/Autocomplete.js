/**
  * Uses Google Maps API to autocomplete search entries.
  * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
  * Also uses https://github.com/EQuimper/react-native-google-autocomplete
  * @ejshumaker 03-24-2019
  * @weinoh 03-26-2019
*/

import React, { Fragment, Component } from 'react';
import { TextInput, View } from 'react-native';
// import PropTypes from 'prop-types';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { GlobalStyles } from '../constants';

const API_KEY = 'AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw';


class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      destination: '',
    };
  }

  render() {
    return (
      <GoogleAutoComplete
        apiKey={API_KEY}
        debounce={500}
      >
        {({
          inputValue, handleTextChange, locationResults, fetchDetails,
        }) => (
          <Fragment>
            <TextInput
              style={GlobalStyles.destinationInput}
              value={inputValue}
              onChangeText={handleTextChange}
              placeholder="Enter Destination"
            />
            <View style={{ maxHeight: 100 }}>
              {locationResults.map((el, i) => (
                <LocationItem
                  {...el}
                  fetchDetails={fetchDetails}
                  key={String(i)}
                />
              ))}
            </View>
          </Fragment>
        )}
      </GoogleAutoComplete>
    );
  }
}

export default Autocomplete;

// TODO: Edit prop types???
