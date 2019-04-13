/**
  * Test screen for Expo's Calendar API
  * @ejshumaker 04-07-2019
*/

import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import moment from 'moment';
import { Calendar, Permissions } from 'expo';
import { GlobalStyles, Colors } from '../constants';
import { Buttons } from '../components';

// eslint-disable-next-line
export default class CalendarScreen extends Component {
  async getStartTimeAndLocation(dayStart, dayEnd) {
    let destinationLoc = '';
    let arrivalTime = 0;
    await Permissions.askAsync('calendar').then((response) => {
      if (response.status !== 'granted') {
        Alert.alert('Permission to access calendar was denied.');
      }
    });
    const cals = await Calendar.getCalendarsAsync();
    // get all device calendar ids
    const data = cals.filter(item => item).map(({ id }) => ({ id }));
    // check all events for the following day and return earliest event start time
    await Calendar.getEventsAsync(data, dayStart, dayEnd).then((response) => {
      if (response.length > 0) {
        const { location } = response[0];
        if (location === '') {
          destinationLoc = undefined;
        } else {
          destinationLoc = location;
        }
        arrivalTime = response[0].startDate;
        arrivalTime = moment(arrivalTime).format('hh:mma');
      } else {
        destinationLoc = undefined;
        arrivalTime = undefined;
      }
    });
    return { destinationLoc, arrivalTime };
  }

  async getNextEvents() {
    const d = new Date();
    const currDayOfWeek = d.getDay();
    const dayArray = [];
    for (let i = 0; i < 7; i += 1) {
      const dayStart = new Date();
      dayStart.setDate(dayStart.getDate() + (i - currDayOfWeek));
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date();
      dayEnd.setDate(dayEnd.getDate() + (i - currDayOfWeek));
      dayEnd.setHours(23, 59, 59, 0);
      // eslint-disable-next-line
      await this.getStartTimeAndLocation(dayStart, dayEnd).then((response) => {
        const { destinationLoc } = response;
        const { arrivalTime } = response;
        // if no start time or location, set this array index to undefined
        if ((destinationLoc === undefined) || (arrivalTime === undefined)) {
          dayArray.push(undefined);
        } else {
          dayArray.push({ destinationLoc, arrivalTime });
        }
      });
    }
    return dayArray;
  }

  async getArray() {
    // eslint-disable-next-line
    console.log('====== LOGGING ARRAY ========');
    await this.getNextEvents().then((dayArray) => {
      for (let i = 0; i < 7; i += 1) {
        // eslint-disable-next-line
        console.log(dayArray[i]);
      }
    });
  }

  render() {
    return (
      <View style={[GlobalStyles.centerChildrenXY, { margin: 20 }]}>
        <Buttons
          title="Get Next Events"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => this.getArray()}
        />
      </View>
    );
  }
}
