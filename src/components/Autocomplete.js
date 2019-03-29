/**
  * Uses Google Maps API to autocomplete search entries.
  * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
  * Also uses https://github.com/EQuimper/react-native-google-autocomplete
  * @ejshumaker 03-24-2019
  * @weinoh 03-26-2019
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

  updateDest(key, value) {
    this.setState({
      [key]: value,
    });
    console.log('-----------------------');
    console.log(this.state.destination);
  }

  render() {
    return (
      <GoogleAutoComplete apiKey={API_KEY} debounce={1000} radius="50000" minLength={3} queryTypes="establishment">
        {({
          inputValue, handleTextChange, locationResults, fetchDetails, isSearching, clearSearchs,
        }) => (
          <Fragment>
            <View style={GlobalStyles.centerChildrenXY}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 272,
                  backgroundColor: Colors.darkGray,
                  borderRadius: 8,
                }}
              >
                <TextInput
                  style={GlobalStyles.destinationInput}
                  placeholder="Enter Destination"
                  placeholderTextColor={Colors.white}
                  onChangeText={handleTextChange}
                  value={this.state.destination || inputValue}
                />
              </View>
              {isSearching && <ActivityIndicator size="large" color={Colors.primary} />}
              <View style={{ flexDirection: 'row' }}>
                {locationResults.map((el, i) => (
                  <LocationItem
                    style={GlobalStyles.searchSuggestions}
                    {...el}
                    fetchDetails={fetchDetails}
                    key={String(i)}
                    resetSearch={clearSearchs}
                    updateDest={this.updateDest}
                    value={this.state.destination}
                  />
                ))}
              </ScrollView>
              <Image
                style={{ marginTop: 5 }}
                source={require('../assets/powered_by_google_on_non_white.png')}
              />
            </View>
          </Fragment>
        )}
      </GoogleAutoComplete>
    );
  }
}

export default Autocomplete;

// TODO: Edit prop types???
