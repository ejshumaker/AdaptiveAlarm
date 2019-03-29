import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AnalogClock, Buttons } from '../components';

import { userDeleteAlarm } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

class MainScreen extends Component {
  hasAlarmView() {
    const {
      // values
      alarmTime,
      loading,
    } = this.props;

    const hour = !loading && alarmTime !== -1 ? moment(alarmTime).format('hh') : '0';
    const min = !loading && alarmTime !== -1 ? moment(alarmTime).format('mm') : '00';
    const meridian = !loading && alarmTime !== -1 ? moment(alarmTime).format('a') : '- -';
    return (
      <View>
        <Text style={
            [GlobalStyles.h2, GlobalStyles.margin, { color: Colors.primary }]
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
            {hour}
            {':'}
            {min}
          </Text>
          <Text style={[{ fontSize: 40 }]}>
            {' '}
            {meridian}
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
            [GlobalStyles.h2, { color: Colors.primary, marginBottom: 48 }]
          }
        >
          {'NO ALARM SET'}
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
        />
        <View style={{ height: 32, width: 8 }} />
      </View>
    );
  }

  hasAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    const { deleteAlarm, navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View>
        <Buttons
          title="Delete Alarm"
          backgroundColor={Colors.primary}
          textColor={Colors.black}
          onPress={() => deleteAlarm()}
        />
        <Buttons
          title="Create Alarm"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => navigate('CreateAlarm')}
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
          title="Create Alarm"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => navigate('CreateAlarm')}
        />
      </View>
    );
  }

  render() {
    const {
      alarmActive,
    } = this.props;

    if (alarmActive) {
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

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  deleteAlarm: PropTypes.func.isRequired,
  alarmTime: PropTypes.number,
  alarmActive: PropTypes.bool,
  loading: PropTypes.bool,
};

MainScreen.defaultProps = {
  alarmTime: -1,
  alarmActive: true,
  loading: false,
};

const mapStateToProps = state => ({
  alarmTime: state.alarm.time,
  alarmActive: state.alarm.active,
  loading: state.alarm.loading,
});

const mapDispatchToProps = dispatch => ({
  deleteAlarm: () => { dispatch(userDeleteAlarm()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
