import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnalogClock from '../components/AnalogClock';
import Buttons from '../components/Buttons';

import { userDeleteAlarm } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

import { AddIcon } from '../icons/add';
import { UserIcon } from '../icons/user';

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
          [GlobalStyles.h2, GlobalStyles.margin, { color: Colors.primary, marginTop: 40 }]
        }
        >
          {'PREDICTED:'}
        </Text>
        <Text
          style={[
            { alignItems: 'center', color: Colors.white, fontSize: 70 },
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
          {'NO ALARM SET'}
        </Text>
      </View>
    );
  }

  clockView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (

      <View style={{ marginVertical: 48 }}>
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
      deleteAlarm,
      navigation,
    } = this.props;
    const { navigate } = navigation;
    return (
      <View>
        <Buttons
          title="DELETE"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => deleteAlarm()}
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
      alarmActive,
    } = this.props;

    if (alarmActive) {
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
  deleteAlarm: (alarmId) => { dispatch(userDeleteAlarm(alarmId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
