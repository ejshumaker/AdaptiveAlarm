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
  Platform, View, Text, Button, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { alarmCalculateTime } from '../store/actions/alarmActions';

import {
  Colors,
  GlobalStyles,
} from '../constants';

class CreateAlarmScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Create Alarm',
      readyTime: '30',
      arrivalTime: '8:00',
      workAddress: 'Unknown',
    };
  }

  render() {
    const {
      title, readyTime, arrivalTime, workAddress,
    } = this.state;
    const {
      navigation, // from react-navigation
      calculateTime,
      alarmTime,
    } = this.props;
    const { navigate } = navigation;

    const dateFormat = new Date(alarmTime);
    return (
      <View style={[GlobalStyles.container, { padding: 48 }]}>
        <Text style={GlobalStyles.h2}>{title}</Text>

        <Text style={GlobalStyles.h4}>Work Address</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={input => this.workAddressInput = input}
          onChangeText={text => this.setState({ workAddress: text })}
          placeholder={workAddress}
          placeholderTextColor={Colors.white}
        />
        <Text style={GlobalStyles.h4}>Estimated Time to Get Ready</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={input => this.readyTimeInput = input}
          onSubmitEditing={() => this.arrivalTimeInput.focus()}
          onChangeText={text => this.setState({ readyTime: text })}
          placeholder={readyTime}
          placeholderTextColor={Colors.white}
        />

        <Text style={GlobalStyles.h4}>Desired Work Arrival Time</Text>
        <TextInput
          style={GlobalStyles.input}
          returnKeyType="next"
          ref={input => this.arrivalTimeInput = input}
          onSubmitEditing={() => this.workAddressInput.focus()}
          onChangeText={text => this.setState({ arrivalTime: text })}
          placeholder={arrivalTime}
          placeholderTextColor={Colors.white}
        />

        {
          Platform.OS === 'ios'
            ? <Text style={GlobalStyles.h4}>Insert day picker for iOS</Text>
            : <Text style={GlobalStyles.h4}>Insert day picker for Android</Text>
        }
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="Create Alarm"
          color={Colors.darkGray}
          onPress={() => navigate('Home')}
        />
        <View style={{
          textAlign: 'left',
          width: '50%',
          margin: 16,
        }}
        >
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Alarm Time</Text>
          <Text style={[GlobalStyles.paragraph, {
            color: Colors.primary,
            marginBottom: 8,
          }]}
          >
            {dateFormat.toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  }
}

CreateAlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux state
  alarmTime: PropTypes.number.isRequired,
  // Redux dispatch
  calculateTime: PropTypes.func.isRequired,
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  alarmTime: state.alarm.time,
});

/**
 * Assign the action creators to props,
 * import actions at the top of the file
 * @eschirtz 03-03-19
 */
const mapDispatchToProps = dispatch => ({
  calculateTime: (time) => { dispatch(alarmCalculateTime(time)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmScreen);
