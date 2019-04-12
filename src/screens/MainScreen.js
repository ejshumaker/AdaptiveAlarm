import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnalogClock from '../components/AnalogClock';
import Buttons from '../components/Buttons';

import { userSetAlarmStatus } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

import { AddIcon } from '../icons/add';
import { UserIcon } from '../icons/user';

class MainScreen extends Component {
  hasAlarmView() {
    const {
      // values
      alarmTime,
      loading,
      armed,
    } = this.props;

    const hour = !loading ? moment(alarmTime).format('hh') : '0';
    const min = !loading ? moment(alarmTime).format('mm') : '00';
    const meridian = !loading ? moment(alarmTime).format('a') : '- -';
    const date = !loading ? moment(alarmTime).format('dddd, MMM. Do') : '';
    return (
      <View>
        <Text style={
          [GlobalStyles.h2, GlobalStyles.margin, { color: Colors.primary, marginTop: 40 }]
        }
        >
          {loading ? 'Calculating...' : 'PREDICTED:'}
        </Text>
        <Text
          style={[
            {
              alignItems: 'center',
              color: armed ? Colors.white : Colors.darkGray,
              fontSize: 70,
            },
          ]}
        >
          <Text style={[{ fontWeight: 'bold' }]}>
            {hour}
            {':'}
            {min}
          </Text>
          <Text style={[{ fontSize: 40, textTransform: 'uppercase', fontWeight: '500' }]}>
            {' '}
            {meridian}
          </Text>
        </Text>
        <Text style={
          [GlobalStyles.h5, { color: Colors.white, marginLeft: 8 }]
        }
        >
          {date}
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
          {'NO ALARMS'}
        </Text>
      </View>
    );
  }

  clockView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View style={{ marginVertical: 48 }}>
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
          title="Development Page"
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
          title="Development Page"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => navigate('Home')}
        />
      </View>
    );
  }

  menu() {
    const { navigation } = this.props;
    return (
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 75,
        paddingHorizontal: 28,
      }}
      >
        <UserIcon
          style={{}}
          onPress={() => {
            navigation.navigate('Account');
          }}
        />
        <AddIcon
          style={{}}
          onPress={() => {
            navigation.navigate('CreateAlarm');
          }}
        />
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
  armed: PropTypes.bool,
};

MainScreen.defaultProps = {
  alarmTime: -1,
  alarmId: undefined,
  loading: true,
  armed: false,
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
