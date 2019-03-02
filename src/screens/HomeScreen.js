import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

import {
  Colors,
  // Layout,
  GlobalStyles,
} from '../constants';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Home',
      subtitle: 'React-Native Boilerplate',
    };
  }

  render() {
    const { title, subtitle } = this.state;
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <Text style={[GlobalStyles.h2, GlobalStyles.margin]}>{title}</Text>
        <Text style={[GlobalStyles.subtitle, { marginBottom: 24 }]}>{subtitle}</Text>
        <Button
          title="Style Demo"
          color={Colors.darkGray}
          onPress={() => navigate('StyleDemo')}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
