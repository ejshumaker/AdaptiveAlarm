/**
 * Uses Google Maps API to autocomplete search entries.
 * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
 * Also uses https://github.com/EQuimper/react-native-google-autocomplete
 * @ejshumaker 03-24-2019
 * @weinoh 03-26-2019
 */

import React, { Fragment } from "react";
import { TextInput, ActivityIndicator, View, Image } from "react-native";
// import PropTypes from 'prop-types';
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import LocationItem from "./LocationItem";
import { GlobalStyles, Colors } from "../constants";
import { SearchIcon } from "../icons/search";

const API_KEY = "AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw";

const Autocomplete = () => (
  <GoogleAutoComplete
    apiKey={API_KEY}
    debounce={1000}
    radius={50000}
    minLength={3}
    queryTypes={"establishment"}
  >
    {({
      inputValue,
      handleTextChange,
      locationResults,
      fetchDetails,
      isSearching
    }) => (
      <Fragment>
        <View style={GlobalStyles.centerChildrenXY}>
          <View
            style={{
              flexDirection: "row",
              width: 272,
              backgroundColor: Colors.darkGray,
              borderRadius: 8
            }}
          >
            <SearchIcon style={{ marginLeft: 13, marginTop: 8 }} />
            <TextInput
              style={GlobalStyles.destinationInput}
              value={inputValue}
              onChangeText={handleTextChange}
              placeholder="Enter Destination"
              placeholderTextColor={Colors.gray}
            />
          </View>
          {isSearching && (
            <ActivityIndicator size="large" color={Colors.gray} />
          )}
          <View
            style={{
              backgroundColor: Colors.gray,
              width: 272,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              marginTop: -4.5
            }}
          >
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
            style={{ marginTop: 20 }}
            source={require("../assets/powered_by_google_on_non_white.png")}
          />
        </View>
      </Fragment>
    )}
  </GoogleAutoComplete>
);

export default Autocomplete;

// TODO: Edit prop types???
