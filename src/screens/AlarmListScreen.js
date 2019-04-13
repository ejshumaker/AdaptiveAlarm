import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, FlatList, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { GlobalStyles, Colors } from '../constants';

import { AlarmItem, StatusBarBackground } from '../components';
import { CloseIcon } from '../icons/close';

import { userSetAlarmStatus } from '../store/actions/userActions';


class AlarmListScreen extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  // Loading icon !
  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    }
    return null;
  }

  menu() {
    const {
      navigation,
    } = this.props;
    const { navigate } = navigation;
    return (
      <View style={GlobalStyles.menu}>
        <TouchableOpacity
          onPress={() => { navigate('Main'); }}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    const { alarms, toggleAlarm, navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View style={{ flex: 1 }}>
        <StatusBarBackground />
        {this.menu()}
        <View style={[GlobalStyles.container, { paddingHorizontal: 48 }]}>
          <Text
            style={[
              GlobalStyles.h2,
              {
                color: Colors.primary,
                marginBottom: 48,
              },
            ]}
          >
          ALL ALARMS:
          </Text>
          {this.loader()}

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={Object.values(alarms)}
            renderItem={({ item, index }) => (
              <AlarmItem
                alarm={item}
                alarmId={Object.keys(alarms)[index]}
                toggleAlarm={toggleAlarm}
                navigate={navigate}
              />
            )}
            keyExtractor={(item, index) => String(index)}
          />

        </View>
      </View>
    );
  }
  // end render
}
// end class

// I think this is almost completed ?
AlarmListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux state
  loading: PropTypes.bool.isRequired,
  alarms: PropTypes.object, // eslint-disable-line
  // Redux dispatch
  toggleAlarm: PropTypes.func.isRequired,
};

AlarmListScreen.defaultProps = {
  alarms: {},
};

/**
 * @weinoh 04-10-19
 */
const mapStateToProps = state => ({
  alarmTime: state.alarm.time,
  alarmCalculating: state.alarm.loading,
  loading: state.user.loadingFetch,
  alarms: state.user.alarms,
});

/**
 * TODO: Does this toggleAlarm function need to be passed into our alarmitem?
 * @weinoh 04-10-19
 */
const mapDispatchToProps = dispatch => ({
  toggleAlarm: (alarmid, status) => {
    dispatch(userSetAlarmStatus(alarmid, status));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmListScreen);
