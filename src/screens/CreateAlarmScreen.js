/**
 * This is a template for a 'Smart' component,
 * A.K.A. a 'container', it is connected to the store, and
 * passes values down to it's children (dumb components) via props
 *
 * At the bottom of the document is where most of the Redux integration
 * lives, try to understand how each component is passed/imported
 *
 * @tsteiner4 03-20-2019
 */
import React, { Component } from 'react';
import {
  View, Text, TextInput, ActivityIndicator, Alert, ScrollView, TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import sounds from '../assets/sounds';

import {
  DayPicker,
  Buttons,
  Autocomplete,
  StatusBarBackground,
  BottomBarBackground,
} from '../components';
import { CloseIcon } from '../icons/close';
import { DropdownIcon } from '../icons/dropdown';
import { userUpdateAlarm, userDeleteAlarm } from '../store/actions/userActions';
import {
  Colors,
  GlobalStyles,
} from '../constants';

class CreateAlarmScreen extends Component {
  constructor() {
    super();
    this.state = {
      readyTime: undefined,
      arrivalTime: undefined,
      soundIndex: 2,
      workAddress: '',
      days: {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      alarmId: undefined,
      pageTitle: 'NEW ALARM:',
    };

    this.onDestChange = this.onDestChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
  }

  componentWillMount() {
    const { navigation } = this.props;
    let { alarms } = this.props;
    alarms = alarms || {};
    const alarmId = navigation.getParam('alarmId', undefined);

    if (alarmId !== undefined) {
      const alarm = alarms[alarmId];

      this.setState({
        alarmId,
        readyTime: alarm.timeToGetReady,
        workAddress: alarm.destinationLoc,
        arrivalTime: alarm.arrivalTime,
        pageTitle: 'EDIT ALARM:',
        days: alarm.days,
        soundIndex: alarm.soundIndex,
      });
    }
  }

  onCreateAlarm() {
    const { createAlarm, navigation } = this.props;
    const { navigate } = navigation;
    const {
      arrivalTime, readyTime, workAddress, days, alarmId,
    } = this.state;
    let {
      soundIndex,
    } = this.state;
    soundIndex = soundIndex || 1; // default
    // validate and format
    if (!readyTime || !arrivalTime || !workAddress) {
      Alert.alert('Please make sure you have filled out all fields');
      return;
    }
    if (!Number(readyTime)) {
      Alert.alert('Time to get ready must be a number!');
      return;
    }
    if (this.noRepeats()) {
      Alert.alert('Must select at least one day for alarm');
      return;
    }
    try {
      const momentString = moment(arrivalTime, 'LT');
      const momentDate = moment(momentString);
      const arrivalTimeString = `${momentDate.format('hh')}:${momentDate.format('mm')}${momentDate.format('a')}`;
      const date = new Date(momentString); // used to calculate initial alarm estimate
      // eslint-disable-next-line
      if (isNaN(date.getTime())) {
        Alert.alert('Please double check your time of arrival');
        return;
      }
      createAlarm({
        arrivalTime: arrivalTimeString,
        timeToGetReady: readyTime,
        destinationLoc: workAddress,
        days,
        navigate,
        alarmId,
        soundIndex,
      });
    } catch (error) {
      Alert.alert(error);
    }
  }

  onDestChange(key, value) {
    // parent class change handler is always called with field name and value
    this.setState({
      workAddress: value, // TODO: why do we not use the key value pairing? -- weinoh
    });
  }

  onDayChange(days) {
    this.setState({
      days,
    });
  }

  /* eslint-disable class-methods-use-this */
  onDelete(alarmId) {
    const { deleteAlarm, navigation } = this.props;
    Alert.alert(
      'Delete Alarm?',
      'By pressing "OK" you will PERMANENTLY delete your alarm',
      [
        { text: 'Go Back', style: 'cancel' },
        {
          text: 'OK',
          style: 'negative',
          onPress: () => {
            deleteAlarm(alarmId);
            navigation.navigate('Main');
          },
        },
      ],
    );
  }

  noRepeats() {
    const { days } = this.state;
    let noRepeat = true;
    Object.keys(days).forEach((day) => {
      noRepeat = days[day] ? false : noRepeat;
    });
    return noRepeat;
  }

  deleteButton() {
    const { navigation } = this.props;
    const alarmId = navigation.getParam('alarmId', undefined);
    if (alarmId) {
      return (
        <Buttons
          title="Delete Alarm"
          backgroundColor={Colors.error}
          textColor={Colors.black}
          onPress={() => this.onDelete(alarmId)}
        />
      );
    }
    return null;
  }

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    } return null;
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
    const {
      readyTime,
      arrivalTime,
      pageTitle,
      workAddress,
      days,
      soundIndex,
    } = this.state;

    return (
      <View>
        <StatusBarBackground />
        {this.menu()}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 48 }}
        >

          <Text
            style={[
              GlobalStyles.h2,
              {
                color: Colors.primary,
                marginBottom: 48,
                marginTop: 24,
              },
            ]}
          >
            {pageTitle}
          </Text>
          {this.loader()}
          <Text style={[GlobalStyles.subtitle, { marginVertical: 0 }]}>Destination</Text>
          <Autocomplete
            onDestChange={this.onDestChange}
            autoCompleteValue={workAddress}
          />
          <Text style={[GlobalStyles.subtitle, { marginTop: 8 }]}>Routine Time</Text>
          <TextInput
            keyboardAppearance="dark"
            style={GlobalStyles.input}
            returnKeyType="next"
            keyboardType="numeric"
            ref={(input) => { this.readyTimeInput = input; }}
            onSubmitEditing={() => this.arrivalTimeInput.focus()}
            onChangeText={text => this.setState({ readyTime: text })}
            placeholder="(30 min)"
            placeholderTextColor={Colors.darkGray}
            value={readyTime}
          />
          <Text style={[GlobalStyles.subtitle, { marginTop: 0 }]}>Arrival Time</Text>
          <TextInput
            keyboardAppearance="dark"
            style={GlobalStyles.input}
            returnKeyType="next"
            ref={(input) => { this.arrivalTimeInput = input; }}
            onSubmitEditing={() => null}
            onChangeText={text => this.setState({ arrivalTime: text })}
            placeholder="(8:00 AM)"
            placeholderTextColor={Colors.darkGray}
            value={arrivalTime}
          />
          <Text style={[GlobalStyles.subtitle, { marginTop: 0 }]}>Alarm Sound</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select Alarm Sound',
              value: null,
              color: Colors.darkGray,
            }}
            items={sounds}
            value={soundIndex}
            useNativeAndroidPickerStyle
            style={{ iconContainer: { top: 10 } }}
            textInputProps={{ color: Colors.darkGray, style: GlobalStyles.input }}
            Icon={() => <DropdownIcon />}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ soundIndex: String(itemIndex) });
            }
        }
          />
          <Text style={[GlobalStyles.subtitle, { marginTop: 0 }]}>Recurring</Text>
          <DayPicker
            onChangeDay={this.onDayChange}
            days={days}
          />
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Buttons
              title="Save Alarm"
              backgroundColor={Colors.primary}
              textColor={Colors.black}
              onPress={() => { this.onCreateAlarm(); }}
            />
            {this.deleteButton()}
          </View>
          <BottomBarBackground />
        </ScrollView>
      </View>
    );
  }
}

CreateAlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux dispatch
  createAlarm: PropTypes.func.isRequired,
  deleteAlarm: PropTypes.func.isRequired,
  // Redux state
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  alarms: PropTypes.object,
};

CreateAlarmScreen.defaultProps = {
  alarms: {},
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  loading: state.user.loading,
  alarms: state.user.alarms,
});

/**
 * Assign the action creators to props,
 * import actions at the top of the file
 * @eschirtz 03-03-19
 */
const mapDispatchToProps = dispatch => ({
  createAlarm: (payload) => { dispatch(userUpdateAlarm(payload)); },
  deleteAlarm: (alarmId) => { dispatch(userDeleteAlarm(alarmId)); },
});

export { CreateAlarmScreen };
export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmScreen);
