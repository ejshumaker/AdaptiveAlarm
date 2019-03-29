/**
 * Uses Google Maps API to autocomplete search entries.
 * Code modified from Stefan Hyltoft (https://github.com/Hyllesen)
 * Also uses https://github.com/EQuimper/react-native-google-autocomplete
 * @ejshumaker 03-24-2019
 * @weinoh 03-26-2019
 */

import React, { Fragment, Component } from 'react';
import {
  TextInput, ActivityIndicator, View, Image,
} from 'react-native';
// import PropTypes from 'prop-types';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import PropTypes from 'prop-types';
import LocationItem from './LocationItem';
import { GlobalStyles, Colors } from '../constants';
import { SearchIcon } from '../icons/search';
import { CloseIcon } from '../icons/close';

const googleStamp = require('../assets/powered_by_google_on_non_white.png');

const API_KEY = 'AIzaSyBpwrz2oV29sjAAKj2l6BIb6l5luzDIsIw';

class Autocomplete extends Component {
  static propTypes = {
    onDestChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    // Below is disabled because state is altered within location item.
    this.state = {
      destination: '', // eslint-disable-line react/no-unused-state
      lat: '', // eslint-disable-line react/no-unused-state
      lng: '', // eslint-disable-line react/no-unused-state
      autoCompleteValue: '',
    };
    this.updateDest = this.updateDest.bind(this);
  }


  onAutoCompleteInput = (autoCompleteValue) => {
    this.setState({ autoCompleteValue });
  };

  updateDest(key, value) {
    const { onDestChange } = this.props;
    this.setState({
      [key]: value,
    });

    if (key === 'destination') onDestChange('workAddress', value);
  }


  render() {
    const { autoCompleteValue } = this.state;
    return (
      <GoogleAutoComplete
        apiKey={API_KEY}
        debounce={1000}
        radius="50000"
        minLength={3}
        queryTypes="establishment"
      >
        {({
          inputValue,
          handleTextChange,
          locationResults,
          fetchDetails,
          isSearching,
          clearSearchs,
        }) => (
          <Fragment>
            <View style={[GlobalStyles.centerChildrenXY, {
              flex: 1, zIndex: 4, justifyContent: 'flex-start',
            }]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  backgroundColor: Colors.darkGray,
                  borderRadius: 8,
                  marginVertical: 12,
                }}
              >
                <SearchIcon style={{ marginLeft: 13, marginTop: 8 }} />
                <TextInput
                  style={GlobalStyles.destinationInput}
                  value={autoCompleteValue || inputValue}
                  onChangeText={(text) => {
                    this.updateDest('autoCompleteValue', text);
                    handleTextChange(text);
                  }}
                  placeholder="Enter Destination"
                  placeholderTextColor={Colors.white}
                />
                <CloseIcon
                  style={{ marginTop: 8, marginRight: 13 }}
                  onPress={() => {
                    this.updateDest('autoCompleteValue', null);
                    handleTextChange('');
                    clearSearchs();
                  }}
                />
              </View>
              {isSearching && (
              <ActivityIndicator size="large" color={Colors.gray} />
              )}
              <View
                style={{
                  backgroundColor: Colors.gray,
                  width: '100%',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  zIndex: 4,
                  marginTop: -4.5,
                }}
              >
                {locationResults.map((el, i) => (


                  <LocationItem
                    style={[GlobalStyles.searchSuggestions, { zIndex: 4 }]}
                    {...el}
                    fetchDetails={fetchDetails}
                    updateDest={this.updateDest}
                    onAutoCompleteInput={this.onAutoCompleteInput}
                    resetSearch={clearSearchs}
                    key={String(i)}
                  />
                ))}
              </View>
              <Image
                style={{ marginTop: 12, height: 10 }}
                source={googleStamp}
                resizeMode="contain"
              />
            </View>
          </Fragment>
        )}
      </GoogleAutoComplete>
    );
  }
}

export default Autocomplete;
