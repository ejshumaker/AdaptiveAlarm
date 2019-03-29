/**
  * Uses Google Maps API to autocomplete search entries.
  * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
  * @ejshumaker 03-24-2019
*/

import React, { Fragment, Component } from 'react';
import {
  TextInput, ActivityIndicator, View, Image, Button, ScrollView,
} from 'react-native';
// import PropTypes from 'prop-types';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { GlobalStyles, Colors } from '../constants';

const API_KEY = 'AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw';

class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      destination: '',
    };
    this.updateDest = this.updateDest.bind(this);
  }

const Autocomplete = () => (
  <GoogleAutoComplete apiKey={API_KEY} debounce={1000} radius="50000" minLength={3} queryTypes="establishment">
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
            /* eslint-disable-next-line */
            source={require('../assets/powered_by_google_on_non_white.png')}
          />
        </View>
      </Fragment>
    )}
  </GoogleAutoComplete>
);

export default Autocomplete;
