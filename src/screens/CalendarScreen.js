/**
  * Test screen for Expo's Calendar API
  * @ejshumaker 04-07-2019
*/

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar, Permissions } from 'expo';
import { GlobalStyles, Colors } from '../constants';
import { Buttons } from '../components';

// eslint-disable-next-line
export default class CalendarScreen extends Component {

  constructor() {
    super();
    this.state = {
      eventStart: '',
    };
  }

  async getStartTime() {
    let timeUTC = 0;
    await Permissions.askAsync('calendar');
    const cals = await Calendar.getCalendarsAsync();
    // get all device calendar ids
    const data = cals.filter(item => item).map(({ id }) => ({ id }));
    const today = new Date();
    today.setDate(today.getDate());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // check all events for the following day and return earliest event start time
    Calendar.getEventsAsync(data, today, tomorrow).then((response) => {
      // parse String to get in UTC format
      const startTime = response[0].startDate;
      const date = String(startTime).split('.');
      timeUTC = Date.parse(date[0]);
      this.setState({ eventStart: timeUTC });
    });
  }

  render() {
    const {
      eventStart,
    } = this.state;
    return (
      <View style={[GlobalStyles.centerChildrenXY, { margin: 20 }]}>
        <Buttons
          title="Get Next Start Time"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => this.getStartTime()}
        />
        <Text style={GlobalStyles.input}>
          {/* eslint-disable-next-line */}
          Next Event: { eventStart }
        </Text>
      </View>
    );
  }
}
