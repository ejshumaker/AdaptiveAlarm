/**
 * BASED OFF OF HOMESCREEN by:
 * @eschirtz 03-03-19
 *
 * Edited / Designed by:
 * @weinoh 03-28-19
 */
import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignOut } from '../store/actions/userActions';

import {
  Colors,
  GlobalStyles,
} from '../constants';

import { CloseIcon } from '../icons/close';
import Buttons from '../components/Buttons';

class AccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: 'PROFILE:',
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
      navigation,
      signOut, // Redux actions
      firstName, // Redux store
      lastName,
      alarms,
      alarmId,
    } = this.props;

    // destructure alarms
    const alarm = alarms[alarmId] || {};
    const {
      destinationLoc,
      arrivalTime,
      timeToGetReady,
      days,
    } = alarm;

    const timeToGetReadyString = timeToGetReady
      ? `${timeToGetReady} minutes`
      : 'No routine set';

    const stringLength = 18;
    const shortDestinationLoc = destinationLoc
      ? `${destinationLoc.substring(0, stringLength)}...`
      : 'No destination set';

    let dayString = '';
    if (days !== undefined) {
      Object.keys(days).forEach((key) => {
        if (days[key]) dayString = dayString.concat(`${key} `);
      });
    } else dayString = 'No days set';

    // STYLESHEET FOR USER PROFILE
    const styles = StyleSheet.create({
      titleView: {
        marginBottom: 10,
      },
      imageView: {
        width: '80%',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      usericon: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 20,
      },
      userinfopane: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      profileRow: {
        // flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.white,
        marginVertical: 4,
        height: 40,
        width: '90%',
      },
      infoColumn: {
        // flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginVertical: 6,
      },
      dataColumn: {
        // flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginVertical: 6,
      },
      signOutButton: {
        width: '80%',
        justifyContent: 'space-around',
        height: 80,
        marginBottom: 50,
        marginTop: 40,
      },
    });

    return (
      <View style={{ justifyContent: 'space-around' }}>
        <CloseIcon
          style={{ marginLeft: 28, marginTop: 75 }}
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
        {/* VIEW FOR TITLE ! "YOUR PROFILE" */}
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.titleView]}>
            <Text style={[
              GlobalStyles.h2,
              {
                color: Colors.primary,
                marginTop: 40,
              },
            ]}
            >
              {title}
            </Text>


            {/* VIEW FOR IMAGE OF USER */}
            <View style={[styles.imageView]}>


              {/* TODO: Replace with Icon ! */}
              <Image
                source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png' }}
                style={styles.usericon}
              />
              { /* LOADING ICON FUNCTION */}
              {this.loader()}

              { /* DISPLAY USER'S NAME BELOW IMAGE */}
              <Text style={[GlobalStyles.h2, { color: Colors.white }]}>
                {firstName}
                {' '}
                {lastName}
              </Text>
            </View>
            {/* END -- VIEW FOR IMAGE OF USER */}

          </View>
          { /* END -- VIEW FOR TITLE */}

          {/* VIEW FOR USER INFO */}
          <View style={[styles.userinfopane]}>


            {/* VIEW FOR USER'S ROUTINE TIME */}
            <View style={[styles.profileRow]}>

              <View style={styles.infoColumn}>
                <Text style={[GlobalStyles.paragraph]}>Routine Time</Text>
              </View>

              <View style={styles.dataColumn}>
                <Text style={[
                  GlobalStyles.paragraph,
                  {
                    color: Colors.primary,
                  },
                ]}
                >
                  {timeToGetReadyString}
                </Text>
              </View>
            </View>
            {/* END --  VIEW FOR USER'S ROUTINE TIME */}

            {/* VIEW FOR USER'S HOME ADDRESS */}
            <View style={[styles.profileRow]}>

              <View style={styles.infoColumn}>
                <Text style={[GlobalStyles.paragraph]}>Work Address</Text>
              </View>

              <View style={styles.dataColumn}>
                <Text style={[
                  GlobalStyles.paragraph,
                  {
                    color: Colors.primary,
                  },
                ]}
                >
                  {shortDestinationLoc}
                </Text>
              </View>

            </View>
            {/* END --  VIEW FOR USER'S HOME ADDRESS */}


            {/* VIEW FOR USER'S WORK ADDRESS */}
            <View style={[styles.profileRow]}>

              <View style={styles.infoColumn}>
                <Text style={[GlobalStyles.paragraph]}>Work Time</Text>
              </View>

              <View style={styles.dataColumn}>
                <Text style={[
                  GlobalStyles.paragraph,
                  {
                    color: Colors.primary,
                  },
                ]}
                >
                  {arrivalTime || 'No time set'}
                </Text>
              </View>
            </View>

            {/* VIEW FOR ALARM DAYS */}
            <View style={[styles.profileRow]}>

              <View style={styles.infoColumn}>
                <Text style={[GlobalStyles.paragraph]}>Alarms</Text>
              </View>

              <View style={styles.dataColumn}>
                <Text style={[
                  GlobalStyles.paragraph,
                  {
                    color: Colors.primary,
                  },
                ]}
                >
                  {dayString}
                </Text>
              </View>
            </View>
            {/* END -- VIEW FOR USER'S WORK ADDRESS */}


          </View>
          {/* END -- VIEW FOR USER'S INFO */}


          {/* VIEW FOR SIGN OUT BUTTON */}
          <View style={[styles.signOutButton, { alignItems: 'center' }]}>
            <Buttons
              title="Sign Out"
              backgroundColor={Colors.darkGray}
              textColor={Colors.white}
              onPress={signOut}
            />
          </View>
          {/* END -- VIEW FOR SIGN OUT BUTTON */}

        </View>
      </View>
    );
    // END RENDER, ABOVE IS CLOSING VIEW TAG.
  }
}

AccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux state
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  alarms: PropTypes.object, // eslint-disable-line
  alarmId: PropTypes.string,
  // Redux dispatch
  signOut: PropTypes.func.isRequired,
};

AccountScreen.defaultProps = {
  firstName: '',
  lastName: '',
  alarms: {},
  alarmId: undefined,
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
  alarms: state.user.alarms,
  alarmId: state.alarm.currentAlarmId,
  loading: state.user.loadingFetch,
});

/**
 * Assign the action creators to props,
 * import actions at the top of the file
 * @eschirtz 03-03-19
 */
const mapDispatchToProps = dispatch => ({
  signOut: () => { dispatch(userSignOut()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
export { AccountScreen };
