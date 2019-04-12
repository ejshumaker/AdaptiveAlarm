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
  View, Text, TextInput, ActivityIndicator, Alert, Picker,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RNPickerSelect from 'react-native-picker-select';
import {
  DayPicker,
  Buttons,
  Autocomplete,
} from '../components';
import { CloseIcon } from '../icons/close';
import { userUpdateAlarm } from '../store/actions/userActions';

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
    // const { days } = this.state;
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
      });
    }
  }

  onCreateAlarm() {
    const { createAlarm, navigation } = this.props;
    const { navigate } = navigation;
    const {
      arrivalTime, readyTime, workAddress, days, alarmId, soundIndex,
    } = this.state;
    // validate and format
    if (!readyTime || !arrivalTime || !workAddress) {
      Alert.alert('Please make sure you have filled out all fields');
      return;
    }
    if (!Number(readyTime)) {
      Alert.alert('Time to get ready must be a number!');
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

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    } return null;
  }

  render() {
    const {
      navigation,
    } = this.props;
    const { navigate } = navigation;
    const {
      readyTime,
      arrivalTime,
      pageTitle,
      workAddress,
      days,
      soundIndex,
    } = this.state;

    const sounds = [
      {
        label: 'Alarm Sound 1',
        value: '1',
        color: Colors.darkGray,
      },
      {
        label: 'Alarm Sound 2',
        value: '2',
        color: Colors.darkGray,
      },
      {
        label: 'Alarm Sound 3',
        value: '3',
        color: Colors.darkGray,
      },
      {
        label: 'Alarm Sound 4',
        value: '4',
        color: Colors.darkGray,
      },
    ];

    return (
      <View style={[GlobalStyles.container, { justifyContent: 'space-around', paddingHorizontal: 48, paddingVertical: '10%' }]}>
        <CloseIcon
          style={{ marginLeft: -20, marginTop: 27 }}
          onPress={() => {
            navigate('Main');
          }}
        />
        <Text
          style={[
            GlobalStyles.h2,
            {
              color: Colors.primary,
              marginBottom: 48,
              marginTop: 40,
            },
          ]}
        >
          {pageTitle}
        </Text>
        {this.loader()}
        <View style={{ justifyContent: 'space-between' }}>

          <Text style={[GlobalStyles.subtitle, { marginTop: 0 }]}>Recurring</Text>
          <DayPicker
            onChangeDay={this.onDayChange}
            days={days}
          />


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
            useNativeAndroidPickerStyle={false}
            textInputProps={{ color: Colors.darkGray, style: GlobalStyles.input }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ soundIndex: String(itemIndex) });
            }
        }
          />
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Buttons
              title="Save Alarm"
              backgroundColor={Colors.primary}
              textColor={Colors.black}
              onPress={() => { this.onCreateAlarm(); }}
            />
          </View>
        </View>
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
});

export { CreateAlarmScreen };
export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmScreen);
