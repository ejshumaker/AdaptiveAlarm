import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import AnalogClock from '../components/AnalogClock';
import Buttons from '../components/Buttons';

import { GlobalStyles, Colors } from '../constants';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    };
    this.hasAlarmView = this.hasAlarmView.bind(this);
  }

  componentDidMount() {
    this.setState({
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    });
  }

  hasAlarmView() {
    const { predictedTimeHour, predictedTimeMin, predictedTimeMeridiem } = this.state;
    return (
      <View>
        <Text style={
          [GlobalStyles.h1, GlobalStyles.margin, { color: Colors.primary, fontSize: 30 }]
        }
        >
          {'PREDICTED:'}
        </Text>
        <Text
          style={[
            GlobalStyles.margin,
            { alignItems: 'center', color: Colors.white, fontSize: 70 },
          ]}
        >
          <Text style={[{ fontWeight: 'bold' }]}>
            {predictedTimeHour}
            {':'}
            {predictedTimeMin}
          </Text>
          <Text style={[{ fontSize: 40 }]}>
            {' '}
            {predictedTimeMeridiem.toUpperCase()}
          </Text>
        </Text>
      </View>
    );
  }

  hasNoAlarmView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <Text style={
          [GlobalStyles.h1, GlobalStyles.margin, { color: Colors.primary, fontSize: 30 }]
        }
        >
          { 'No Alarm Found!' }
        </Text>
      </View>
    );
  }

  clockView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <AnalogClock
          minuteHandLength={110}
          minuteHandColor={Colors.white}
          minuteHandWidth={2}
          minuteHandCurved={false}
          hourHandColor={Colors.primary}
          hourHandCurved={false}
          hourHandWidth={4}
          // clockBorderColor={Colors.white}
          // clockCentreColor={Colors.white}
        />
        <View style={{ height: 32, width: 8 }} />
      </View>
    );
  }

  hasAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <Buttons
          title="Delete Alarm"
          backgroundColor={Colors.primary}
          textColor={Colors.black}
          onPress={() => null}
        />
        <Buttons
          title="Create Alarm"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => null}
        />
      </View>
    );
  }

  hasNoAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <Buttons
          title="Create Alarm"
          color={Colors.darkGray}
          onPress={() => null}
        />
      </View>
    );
  }

  render() {
    if (true) {
      return (
        <View style={[GlobalStyles.centerChildrenXY]}>
          { this.hasAlarmView() }
          { this.clockView() }
          { this.hasAlarmButtons() }
        </View>
      );
    }
    return (
      <View style={[GlobalStyles.centerChildrenXY]}>
        { this.hasNoAlarmView() }
        { this.clockView() }
        { this.hasNoAlarmButtons() }
      </View>
    );
  }
}

export default MainScreen;
