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
  View, Text, Button, TextInput, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DayPicker,
} from '../components';
import { userCreateAlarm } from '../store/actions/userActions';

import {
  Colors,
  GlobalStyles,
} from '../constants';

class CreateAlarmScreen extends Component {
  constructor() {
    super();
    this.state = {
      readyTime: 31,
      arrivalTime: new Date(2019, 3, 26, 10, 6, 16),
      workAddress: 'Middleton, WI',
    };
  }

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    } return null;
  }

  render() {
    const {
      uid,
      createAlarm,
    } = this.props;

    const {
      readyTime,
      arrivalTime,
      workAddress,
    } = this.state;

    return (
      <View style={[GlobalStyles.container, { padding: 48 }]}>
        <Text
          style={[
            GlobalStyles.h2,
            {
              color: Colors.primary,
              marginBottom: 48,
              marginTop: 96,
            },
          ]}
        >
        NEW ALARM:
        </Text>
        <Text style={GlobalStyles.subtitle}>Destination</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={(input) => { this.workAddressInput = input; }}
          onSubmitEditing={() => this.arrivalTimeInput.focus()}
          onChangeText={text => this.setState({ workAddress: text })}
          placeholder="Work Address"
          placeholderTextColor={Colors.darkGray}
        />
        <Text style={GlobalStyles.subtitle}>Routine Time</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={(input) => { this.readyTimeInput = input; }}
          onSubmitEditing={() => this.arrivalTimeInput.focus()}
          onChangeText={text => this.setState({ readyTime: text })}
          placeholder="30"
          placeholderTextColor={Colors.darkGray}
        />
        <Text style={GlobalStyles.subtitle}>Arrival Time</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={(input) => { this.arrivalTimeInput = input; }}
          onSubmitEditing={() => this.workAddressInput.focus()}
          onChangeText={text => this.setState({ arrivalTime: text })}
          placeholder="8:00"
          placeholderTextColor={Colors.darkGray}
        />
        <DayPicker />
        {this.loader()}
        <Button
          title="Create Alarm"
          color={Colors.darkGray}
          onPress={() => createAlarm({
            uid,
            arrivalTime: arrivalTime.getTime(),
            timeToGetReady: readyTime,
            destinationLoc: workAddress,
          })}
        />
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
  uid: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  uid: state.user.uid,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmScreen);
