import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

import {
// Colors,
// Layout,
  GlobalStyles,
} from '../constants';

class SetupScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super();
    this.state = {
      message: 'Setup Screen',
    };
  }

  render() {
    const { message } = this.state;
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View style={GlobalStyles.centerChildren}>
        <Text>{message}</Text>
        <Button
          title="Go Home"
          onPress={() => navigate('Home')}
        />
      </View>
    );
  }
}

SetupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SetupScreen;
