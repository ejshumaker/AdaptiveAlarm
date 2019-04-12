/*
 * Used to display all alarms withing AlarmListScreen.js
 * @weinoh 04-10-2019
 */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Switch, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles, Colors } from '../constants';

const styles = StyleSheet.create({
  alarmRow: {
    // flex: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.white,
    marginVertical: 0,
    width: '100%',
  },
  alarmInfoColumn: {
    // flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
  switchColumn: {
    margin: 0,
    marginRight: 13,
    justifyContent: 'space-around',
  },
});

class AlarmItem extends Component {
  // on press we should call the navigator to go to the edit alarm page.
  handlePress = async () => {
    const {
      alarmId, navigate,
    } = this.props;
    // navigate to edit alarm page with params TODO: SWITCH TO EDIT ALARM SCREEN
    navigate('CreateAlarm', {
      alarmId,
    });
  };

  // on toggle of a specific alarm we should call the alarm set status prop function
  // TODO: HANDLE THE ALARM FIRING RIGHT AFTER WE TURN IT ON IF IT IS IN THE PAST
  handleAlarmToggle = async () => {
    const {
      alarmId, toggleAlarm, alarm,
    } = this.props;
    // alarm.isActive = !alarm.isActive;
    // call the toggle alarm function from alarmlistscreen (fire off action)
    // TODO: get this to update correctly.
    const toggleVal = !alarm.isActive;
    await toggleAlarm(alarmId, toggleVal);
    this.render();
  }

  displayDays() {
    const { alarm } = this.props;
    let { days } = alarm;
    days = days || {};
    let dayString = '';

    if (days.sun) dayString += ' S';
    if (days.mon) dayString += ' M';
    if (days.tue) dayString += ' T';
    if (days.wed) dayString += ' W';
    if (days.thu) dayString += ' Th';
    if (days.fri) dayString += ' F';
    if (days.sat) dayString += ' Sa';

    if (dayString === '') dayString = ' None';

    return dayString;
  }

  render() {
    const { alarm } = this.props;
    if (alarm === undefined) return null;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View
          style={styles.alarmRow}
        >
          <View style={styles.alarmInfoColumn}>
            <Text
              style={[GlobalStyles.h2,
                { color: alarm.isActive ? Colors.white : Colors.darkGray }]}
            >
              {alarm.arrivalTime}
            </Text>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Text style={[GlobalStyles.paragraph, { justifyContent: 'flex-start', color: alarm.isActive ? Colors.white : Colors.darkGray }]}>
              Repeat:
              </Text>
              <Text style={[GlobalStyles.paragraph, { justifyContent: 'flex-end', color: alarm.isActive ? Colors.primary : Colors.darkGray, fontWeight: 'bold' }]}>
                {this.displayDays()}
              </Text>
            </View>
          </View>
          <View style={styles.switchColumn}>
            <Switch
              onValueChange={this.handleAlarmToggle}
              value={alarm.isActive}
              style={styles.switchRow}
            />
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

export default AlarmItem;

AlarmItem.propTypes = {
  toggleAlarm: PropTypes.func.isRequired,
  alarm: PropTypes.object.isRequired, // eslint-disable-line
  alarmId: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};
