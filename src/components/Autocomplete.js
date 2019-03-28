/**
  * Uses Google Maps API to autocomplete search entries.
  * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
  * Also uses https://github.com/EQuimper/react-native-google-autocomplete
  * @ejshumaker 03-24-2019
  * @weinoh 03-26-2019
*/

import React, { Fragment } from 'react';
import {
  TextInput,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
// import PropTypes from 'prop-types';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { GlobalStyles, Colors } from '../constants';

const API_KEY = 'AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw';


const Autocomplete = () => (
  <GoogleAutoComplete apiKey={API_KEY} debounce={1000} radius={50000} minLength={3} queryTypes="establishment">
    {({
      inputValue, handleTextChange, locationResults, fetchDetails, isSearching,
    }) => (
      <Fragment>
        <View style={GlobalStyles.centerChildrenXY}>
          <TextInput
            style={GlobalStyles.destinationInput}
            value={inputValue}
            onChangeText={handleTextChange}
            placeholder="Enter Destination"
            placeholderTextColor={Colors.white}
          />
          {isSearching && <ActivityIndicator size="large" color={Colors.primary} />}
          <View>
            {locationResults.map((el, i) => (
              <LocationItem
                style={GlobalStyles.searchSuggestions}
                {...el}
                fetchDetails={fetchDetails}
                key={String(i)}
              />
            ))}
          </View>
          <Image
            style={{ marginTop: 5 }}
            source="../assets/powered_by_google_on_non_white.png"
          />
        </View>
      </Fragment>
    )}
  </GoogleAutoComplete>
);

export default Autocomplete;

// TODO: Edit prop types???
