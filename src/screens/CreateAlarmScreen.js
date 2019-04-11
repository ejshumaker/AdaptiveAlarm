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
  View, Text, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DayPicker,
  Buttons,
  Autocomplete,
} from '../components';
import { CloseIcon } from '../icons/close';
import { userCreateAlarm } from '../store/actions/userActions';

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
      parentNav: 'Not working', // TODO: undefined
    };

    this.onDestChange = this.onDestChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
  }

  componentWillMount() {
    const { navigation } = this.props;
    const parent = navigation.dangerouslyGetParent();
    this.setState({ parentNav: parent.state.key }, () => { console.log('In setState: ' + this.state.parentNav); });
  }

  onCreateAlarm() {
    const { createAlarm, navigation } = this.props;
    const { navigate } = navigation;
    const {
      arrivalTime, readyTime, workAddress, days,
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
      });
    } catch (error) {
      Alert.alert(error);
    }
  }

  onDestChange(key, value) {
    // parent class change handler is always called with field name and value
    this.setState({
      workAddress: value,
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
    const { parentNav } = this.state;

    return (
      <View style={[GlobalStyles.container, { padding: 48 }]}>
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
        NEW ALARM: 
        {parentNav}
        </Text>
        <Text style={GlobalStyles.subtitle}>Destination</Text>
        <Autocomplete onDestChange={this.onDestChange} />
        <Text style={[GlobalStyles.subtitle]}>Routine Time</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          keyboardType="numeric"
          ref={(input) => { this.readyTimeInput = input; }}
          onSubmitEditing={() => this.arrivalTimeInput.focus()}
          onChangeText={text => this.setState({ readyTime: text })}
          placeholder="(30)"
          placeholderTextColor={Colors.darkGray}
        />
        <Text style={GlobalStyles.subtitle}>Arrival Time</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={(input) => { this.arrivalTimeInput = input; }}
          onSubmitEditing={() => null}
          onChangeText={text => this.setState({ arrivalTime: text })}
          placeholder="(8:00 AM)"
          placeholderTextColor={Colors.darkGray}
        />
        <Text style={GlobalStyles.subtitle}>Recurring (beta)</Text>
        <DayPicker
          onChangeDay={this.onDayChange}
        />
        {this.loader()}
        <View style={{ alignItems: 'center' }}>
          <Buttons
            title="Create Alarm"
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={() => { this.onCreateAlarm(); }}
          />
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
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  loading: state.user.loading,
});

/**
 * Assign the action creators to props,
 * import actions at the top of the file
 * @eschirtz 03-03-19
 */
const mapDispatchToProps = dispatch => ({
  createAlarm: (payload) => { dispatch(userCreateAlarm(payload)); },
});

export { CreateAlarmScreen };
export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmScreen);
