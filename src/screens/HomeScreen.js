/**
 * This is a template for a 'Smart' component,
 * A.K.A. a 'container', it is connected to the store, and
 * passes values down to it's children (dumb components) via props
 *
 * At the bottom of the document is where most of the Redux integration
 * lives, try to understand how each component is passed/imported
 *
 * @eschirtz 03-03-19
 */
import React, { Component } from 'react';
import {
  View, Text, Button, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignOut } from '../store/actions/userActions';
import { alarmCalculateTime } from '../store/actions/alarmActions';

import {
  Colors,
  GlobalStyles,
} from '../constants';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Home',
    };
  }

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    } return null;
  }

  render() {
    const { title } = this.state;
    const {
      navigation, // from react-navigation
      signOut, // Redux actions
      calculateTime,
      firstName, // Redux store
      lastName,
      userName,
      email,
      alarmTime,
      errorMessage,
    } = this.props;
    const { navigate } = navigation;

    /**
     * There are way more 'magic' numbers in the styling
     * than should be preffered, just tossed them in to make it passable.
     * All our components will be built custom or have a global style applied
     * @eschirtz 03-03-19
     */
    const dateFormat = new Date(alarmTime);
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <Text style={[GlobalStyles.h2, GlobalStyles.margin]}>{title}</Text>
        { this.loader() }
        <View style={{
          height: 80, margin: 8, width: '60%',
        }}
        >
          <View style={{
            flex: 1,
            justifyContent: 'space-around',
          }}
          >
            <Button
              title="Async"
              color={Colors.darkGray}
              onPress={() => calculateTime(Date.now())}
            />
          </View>
        </View>
        <View style={{
          textAlign: 'left',
          width: '60%',
          margin: 16,
        }}
        >
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Username</Text>
          <Text style={[GlobalStyles.paragraph, { color: Colors.primary, marginBottom: 8 }]}>
            {userName}
          </Text>
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Full Name</Text>
          <Text style={[GlobalStyles.paragraph, { color: Colors.primary, marginBottom: 8 }]}>
            {firstName}
            {' '}
            {lastName}
          </Text>
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Email Address</Text>
          <Text style={[GlobalStyles.paragraph, { color: Colors.primary, marginBottom: 8 }]}>
            {email}
          </Text>
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Error Message</Text>
          <Text style={[GlobalStyles.paragraph, { color: Colors.error, marginBottom: 8 }]}>
            {errorMessage}
          </Text>
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Alarm Time</Text>
          <Text style={[GlobalStyles.paragraph, {
            color: Colors.primary,
            marginBottom: 8,
          }]}
          >
            {dateFormat.toLocaleTimeString()}
          </Text>
        </View>
        <Button
          title="Create New Alarm"
          color={Colors.darkGray}
          onPress={() => navigate('CreateAlarm')}
        />
        {/* Temporary button to navigate to AlarmScreen, TODO: Remove */}
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="Alarm"
          color={Colors.darkGray}
          onPress={() => navigate('Alarm')}
        />
        {/* Temporary button to navigate to DayPicker, TODO: Remove */}
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="DayPicker"
          color={Colors.darkGray}
          onPress={() => navigate('DayPicker')}
        />
        {/* Temporary button to navigate to AutoComplete, TODO: Remove */}
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="AutoComplete"
          color={Colors.darkGray}
          onPress={() => navigate('AutoComplete')}
        />
        <View style={{ height: 8, width: 8 }} />
        {/* Temporary button to navigate to MainScreen (true home screen) TODO: Remove */}
        <Button
          title="True Home Screen"
          color={Colors.darkGray}
          onPress={() => navigate('Main')}
        />
        <View style={{ height: 8, width: 8 }} />
        <Button
          title="Sign Out"
          color={Colors.darkGray}
          onPress={signOut}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux state
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userName: PropTypes.string,
  email: PropTypes.string,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  alarmTime: PropTypes.number.isRequired,
  // Redux dispatch
  calculateTime: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

HomeScreen.defaultProps = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  errorMessage: '',
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  userName: state.user.userName,
  email: state.user.email,
  errorMessage: state.user.errorMessage,
  loading: state.user.loadingFetch,
  alarmTime: state.alarm.time,
});

/**
 * Assign the action creators to props,
 * import actions at the top of the file
 * @eschirtz 03-03-19
 */
const mapDispatchToProps = dispatch => ({
  signOut: () => { dispatch(userSignOut()); },
  calculateTime: (time) => { dispatch(alarmCalculateTime(time)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
