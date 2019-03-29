import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnalogClock from '../components/AnalogClock';

import { userDeleteAlarm } from '../store/actions/userActions';
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
    const {
      // functions
      navigate,
      deleteAlarm,
      // values
      alarmTime,
      alarmActive,
      loading,
    } = this.props;
    return (
      <View style={[GlobalStyles.centerChildrenXY]}>
        <Text style={
            [GlobalStyles.h2, GlobalStyles.margin, { color: Colors.primary }]
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
          onPress={() => deleteAlarm()}
        />
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="Create Alarm"
          color={Colors.darkGray}
          onPress={() => navigate('CreateAlarm')}
        />
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
