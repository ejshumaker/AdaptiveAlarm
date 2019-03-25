import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import { GlobalStyles, Colors } from '../constants';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      predictedTime: moment().format('LT'),
    };
  }

  componentDidMount() {
    this.setState({
      predictedTime: moment().format('LT'),
    });
  }

  render() {
    const { predictedTime } = this.state;
    return (
      <View style={[ GlobalStyles.centerChildrenXY ]}>
        <Text style={[ GlobalStyles.margin, { color: Colors.primary, fontWeight: 'bold', fontSize: 30, alignItems: 'flex-start' }]}>
          PREDICTED:
        </Text>
        <Text style={[ GlobalStyles.margin, { alignItems: 'center', color: Colors.white, fontSize: 70 }]}>
          { predictedTime }
        </Text>
      </View>
    );
  }
};

export default MainScreen;