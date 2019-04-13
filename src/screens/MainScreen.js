import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnalogClock from '../components/AnalogClock';
import { Buttons, StatusBarBackground } from '../components';

import { userSetAlarmStatus } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

import { AddIcon } from '../icons/add';
import { UserIcon } from '../icons/user';
import { MenuIcon } from '../icons/menu';

class MainScreen extends Component {
  hasAlarmView() {
    const {
      // values
      alarmTime,
      loading,
    } = this.props;
    const hour = !loading ? moment(alarmTime).format('hh') : '0';
    const min = !loading ? moment(alarmTime).format('mm') : '00';
    const meridian = !loading ? moment(alarmTime).format('a') : '- -';
    const month = !loading ? moment(alarmTime).format('MMM') : '';
    const day = !loading ? moment(alarmTime).format('D, dddd') : '';

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
          <Text>
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
      navigation,
      alarmId,
    } = this.props;
    const { navigate } = navigation;
    return (
      <View>
        <Buttons
          title="DISMISS"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => dismissAlarm(alarmId)}
        />
        <Buttons
          title="Dev Page"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => navigate('Home')}
        />
      </View>
    );
  }

  hasNoAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View>
        <Buttons
          title="Dev Page"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => navigate('Home')}
        />
      </View>
    );
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
