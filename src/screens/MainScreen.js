import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import moment from 'moment';
import AnalogClock from '../components/AnalogClock';

import { GlobalStyles, Colors } from '../constants';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    };
  }

  componentDidMount() {
    this.setState({
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    });
  }

  render() {
    const { predictedTimeHour, predictedTimeMin, predictedTimeMeridiem } = this.state;
    return (
      <View style={[GlobalStyles.centerChildrenXY]}>
        <Text style={
            [GlobalStyles.h1, GlobalStyles.margin, { color: Colors.primary, fontSize: 30 }]
          }
        >
          { 'PREDICTED:' }
        </Text>
        <Text style={[GlobalStyles.margin, { alignItems: 'center', color: Colors.white, fontSize: 70 }]}>
          <Text style={[{ fontWeight: 'bold' }]}>
            { predictedTimeHour }
            { ':' }
            { predictedTimeMin }
          </Text>
          <Text style={[{ fontSize: 40 }]}>
            { ' ' }
            { predictedTimeMeridiem.toUpperCase() }
          </Text>
        </Text>
        <AnalogClock
          minuteHandLength={110}
          minuteHandColor={Colors.white}
          minuteHandWidth={2}
          minuteHandCurved={false}
          hourHandColor={Colors.primary}
          hourHandCurved={false}
          hourHandWidth={4}
          clockBorderColor={Colors.white}
          clockCentreColor={Colors.white}
        />
        <View style={{ height: 32, width: 8 }} />
        <Button
          title="Delete Alarm"
          color={Colors.darkGray}
          onPress={() => null}
        />
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="Create Alarm"
          color={Colors.darkGray}
          onPress={() => null}
        />
      </View>
    );
  }
}

export default MainScreen;
