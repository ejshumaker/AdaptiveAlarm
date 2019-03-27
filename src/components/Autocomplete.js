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
import _ from "lodash";

import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      locationPredictions: []
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
  }

  async onChangeDestination(destination) {
    const API_KEY = 'AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw';
    // hard coded starting location to Memorial Union, need to use current location later
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input={${destination}}&location=43.0762,-89.3998&radius=100`;
    const result = await fetch(url);
    const jsonResult = await result.json();
    this.setState({
      locationPredictions: jsonResult.predictions
    });
  }

  async pressedPrediction(prediction) {
    Keyboard.dismiss();
    console.log(prediction.description)
    this.setState({
      locationPredictions: [],
      destination: prediction.description
    });
    Keyboard;
    const API_KEY = 'AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${prediction.place_id}&key=${API_KEY}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then((json) => {
          if (json.status !== 'OK') {
            const errorMessage = json.error_message || 'Unknown error';
            reject(errorMessage);
          }
          // TODO: need to parse json result to get location
          // console.log(json);
          // const { lat } = json.location;
          // const { lng } = json.location;
          // console.log(`lat: ${lat} long: ${lng}`);
          // resolve(`{lat: ${lat}, lng: ${lng}}`);
        });
    });
  }

  render() {
  const locationPredictions = this.state.locationPredictions.map(
    prediction => (
      <TouchableHighlight
        key={prediction.id}
        onPress={() => this.pressedPrediction(prediction)}
      >
        <Text style={GlobalStyles.searchSuggestions}>
          {prediction.description}
        </Text>
      </TouchableHighlight>
    )
  );

    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <TextInput
          style={GlobalStyles.destinationInput}
          placeholderTextColor={Colors.gray}
          placeholder="Enter destination"
          onChangeText={destination => {
            this.onChangeDestinationDebounced(destination);
          }}
          value={this.state.destination}
        />
        {locationPredictions}
        <Image
          style={{marginTop: 5}}
          source={require('../assets/powered_by_google_on_non_white.png')}
        />
      </View>
    );
  }
}

export default Autocomplete;
