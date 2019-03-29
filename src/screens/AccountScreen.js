/**
 * BASED OFF OF HOMESCREEN by:
 * @eschirtz 03-03-19
 *
 * Edited / Designed by:
 * @weinoh 03-28-19
 */
import React, { Component } from 'react';
import {
  View, Text, Image, Button, StyleSheet, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignOut } from '../store/actions/userActions';
import { alarmCalculateTime } from '../store/actions/alarmActions';

import {
  Colors,
  GlobalStyles,
} from '../constants';

// STYLESHEET FOR USER PROFILE
const styles = StyleSheet.create({
  titleView: {
    marginTop: 40,
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
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  profileRow: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    marginBottom: 10,
    height: 32,
    width: '90%',
  },
  infoColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dataColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signOutButton: {
    width: '80%',
    justifyContent: 'space-around',
    height: 80,
    marginBottom: 50,
  },
});

class AccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: 'YOUR PROFILE:',
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
      // navigation, // from react-navigation
      signOut, // Redux actions
      // calculateTime,
      firstName, // Redux store
      lastName,
      // userName,
      // email,
      // alarmTime,
      // errorMessage,
    } = this.props;
    // const { navigate } = navigation;

    return (
      <View style={[GlobalStyles.centerChildrenXY, { height: '85%', justifyContent: 'space-around' }]}>


        {/* VIEW FOR TITLE ! "YOUR PROFILE" */}
        <View style={[styles.titleView, { flex: 1 }]}>
          <Text style={[
            GlobalStyles.h2,
            { color: Colors.primary },
          ]}
          >
            {title}
          </Text>


          {/* VIEW FOR IMAGE OF USER */}
          <View style={[styles.imageView, { flex: 1 }]}>


            {/* TODO: Replace with Icon ! */}
            <Image
              source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png' }}
              style={styles.usericon}
            />
            { /* LOADING ICON FUNCTION */ }
            { this.loader() }

            { /* DISPLAY USER'S NAME BELOW IMAGE */ }
            <Text style={[GlobalStyles.h3, { color: Colors.primary }]}>
              {firstName}
              {' '}
              {lastName}
            </Text>
          </View>
          {/* END -- VIEW FOR IMAGE OF USER */}

        </View>
        { /* END -- VIEW FOR TITLE */ }

        {/* VIEW FOR USER INFO */}
        <View style={[styles.userinfopane, { flex: 1 }]}>


          {/* VIEW FOR USER'S ROUTINE TIME */}
          <View style={[styles.profileRow, { flex: 1 }]}>

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
                {'45 minutes'}
              </Text>
            </View>
          </View>
          {/* END --  VIEW FOR USER'S ROUTINE TIME */}

          {/* VIEW FOR USER'S HOME ADDRESS */}
          <View style={[styles.profileRow, { flex: 1 }]}>

            <View style={styles.infoColumn}>
              <Text style={[GlobalStyles.paragraph]}>Home</Text>
            </View>

            <View style={styles.dataColumn}>
              <Text style={[
                GlobalStyles.paragraph,
                {
                  color: Colors.primary,
                },
              ]}
              >
                {/* TODO: REPLACE WITH CURRENT LOCATION (ADDRESS) */}
                {'210 Lakelawn Place, Madison, WI'}
              </Text>
            </View>

          </View>
          {/* END --  VIEW FOR USER'S HOME ADDRESS */}


          {/* VIEW FOR USER'S WORK ADDRESS */}
          <View style={[styles.profileRow, { flex: 1 }]}>

            <View style={styles.infoColumn}>
              <Text style={[GlobalStyles.paragraph]}>Work</Text>
            </View>

            <View style={styles.dataColumn}>
              <Text style={[
                GlobalStyles.paragraph,
                {
                  color: Colors.primary,
                },
              ]}
              >
                {/* TODO: REPLACE WITH ACTUAL DESTINATION INPUT */}
                {'1308 W Dayton St, Madison, WI'}
              </Text>
            </View>
          </View>
          {/* END -- VIEW FOR USER'S WORK ADDRESS */}


        </View>
        {/* END -- VIEW FOR USER'S INFO */}


        {/* VIEW FOR SIGN OUT BUTTON */}
        <View style={styles.signOutButton}>
          <Button
            title="Sign Out"
            color={Colors.darkGray}
            onPress={signOut}
          />
        </View>
        {/* END -- VIEW FOR SIGN OUT BUTTON */}


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
  // userName: PropTypes.string,
  // email: PropTypes.string,
  // errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  // alarmTime: PropTypes.number.isRequired,
  // // Redux dispatch
  // calculateTime: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

AccountScreen.defaultProps = {
  firstName: '',
  lastName: '',
  // userName: '',
  // email: '',
  // errorMessage: '',
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
export { AccountScreen };
