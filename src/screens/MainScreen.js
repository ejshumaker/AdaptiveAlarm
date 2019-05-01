import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity, Alert, YellowBox,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnalogClock from '../components/AnalogClock';
import { Buttons, StatusBarBackground } from '../components';
import Alarm from '../custom_modules/Alarm';
import { weatherConditions } from '../assets/weatherConditions';

import { userSetAlarmStatus } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

import { AddIcon } from '../icons/add';
import { UserIcon } from '../icons/user';
import { MenuIcon } from '../icons/menu';

// ios warning boxes for meaningless errors
if (!__testing__) { // eslint-disable-line
  YellowBox.ignoreWarnings(['Class EX']); // expo did not export module (xcode ?)
  YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection']); // no issue, POSSIBLE.
  YellowBox.ignoreWarnings(['Module AudioRecorderManager']); // comes from using react-native-audio
}


class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      temperature: 0,
      weather: 'Clear',
      weatherLoading: true,
    };
  }

  componentDidMount() {
    this.didFocus();
  }


  didFocus = () => {
    this.storeWeather();
  }

  async storeWeather() {
    try {
      const response = await Alarm.getWeather();
      if ((response.temperature === '') || (response.currWeather === '')) {
        throw Error('getWeather() did not return any data.');
      }
      const temp = response.temperature;
      const currWeather = response.weather;
      this.setState({ temperature: temp, weather: currWeather, weatherLoading: false });
    } catch {
      Alert.alert('Error retrieving local weather.');
      // eslint-disable-next-line
      console.log(error);
    }
  }

  hasAlarmView() {
    const {
      // values
      alarmTime,
      loading,
    } = this.props;
    const { weatherLoading, temperature, weather } = this.state;
    const hour = alarmTime !== -1 ? moment(alarmTime).format('hh') : '0';
    const min = alarmTime !== -1 ? moment(alarmTime).format('mm') : '00';
    const meridian = alarmTime !== -1 ? moment(alarmTime).format('a') : '- -';
    const month = alarmTime !== -1 ? moment(alarmTime).format('MMM') : '';
    const day = alarmTime !== -1 ? moment(alarmTime).format('D, dddd') : '';

    return (
      <View>
        <Text style={
          [GlobalStyles.h2, { color: Colors.primary }]
        }
        >
          {loading ? 'CALCULATING...' : 'PREDICTED:'}
        </Text>
        <Text
          style={
            [GlobalStyles.h1, { color: Colors.white, fontSize: 70 }]
          }
        >
          <Text>
            {hour}
            {':'}
            {min}
          </Text>
          <Text style={[GlobalStyles.meridian]}>
            {' '}
            {meridian.toUpperCase()}
          </Text>
        </Text>
        <Text style={
          [GlobalStyles.month, { color: Colors.white, marginLeft: 130 }]
        }
        >
          <Text style={GlobalStyles.date}>
            {weatherLoading ? '' : temperature }
          </Text>
          <Text>
            {weatherLoading ? '' : '\u2109   ' }
          </Text>
          {weatherLoading ? '' : (
            <MaterialCommunityIcons
              size={18}
              name={weatherConditions[weather].icon}
              color={Colors.white}
            />
          )}
          <Text>
            {'  '}
            {month.toUpperCase()}
            {' '}
          </Text>
          <Text style={[GlobalStyles.date]}>
            {day}
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
          [GlobalStyles.h2, { color: Colors.primary, marginVertical: 48 }]
        }
        >
          {'NO ALARMS SET'}
        </Text>
      </View>
    );
  }

  clockView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View style={{ marginVertical: '10%' }}>
        <StatusBar barStyle="light-content" />
        <AnalogClock
          minuteHandLength={105}
          minuteHandColor={Colors.white}
          minuteHandWidth={2}
          minuteHandCurved={false}
          hourHandColor={Colors.primary}
          hourHandCurved={false}
          hourHandWidth={6}
        />
      </View>
    );
  }

  hasAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    const {
      dismissAlarm,
      alarmId,
    } = this.props;
    return (
      <View>
        <Buttons
          title="DISMISS"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => dismissAlarm(alarmId)}
        />
      </View>
    );
  }
  // eslint-disable-next-line
  hasNoAlarmButtons() {
    return null;
  }

  menu() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View style={GlobalStyles.menu}>
        <TouchableOpacity
          onPress={() => { navigate('AlarmList'); }}
        >
          <MenuIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigate('Account'); }}
        >
          <UserIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigate('CreateAlarm'); }}
        >
          <AddIcon />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {
      alarmId,
      loading,
    } = this.props;
    if (alarmId !== undefined || loading) {
      return (
        <View>
          <StatusBarBackground />
          {this.menu()}
          <View style={{ alignItems: 'center', width: '100%' }}>
            {this.hasAlarmView()}
            {this.clockView()}
            {this.hasAlarmButtons()}
          </View>
        </View>
      );
    }
    return (
      <View>
        <StatusBarBackground />
        {this.menu()}
        <View style={{ alignItems: 'center', width: '100%' }}>
          {this.hasNoAlarmView()}
          {this.clockView()}
          {this.hasNoAlarmButtons()}
        </View>
      </View>
    );
  }
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  dismissAlarm: PropTypes.func.isRequired,
  alarmTime: PropTypes.number,
  alarmId: PropTypes.string,
  loading: PropTypes.bool,
};

MainScreen.defaultProps = {
  alarmTime: -1,
  alarmId: undefined,
  loading: true,
};

const mapStateToProps = state => ({
  alarmTime: state.alarm.time,
  alarmId: state.alarm.currentAlarmId,
  loading: state.alarm.loading,
  armed: state.alarm.armed,
});

const mapDispatchToProps = dispatch => ({
  dismissAlarm: (alarmId) => { dispatch(userSetAlarmStatus(alarmId, false)); },
});

export { MainScreen };
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
