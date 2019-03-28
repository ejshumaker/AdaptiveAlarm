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
    const styles = StyleSheet.create({
      infoColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      dataColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      profileRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
    });

    return (
      <View style={[GlobalStyles.centerChildrenXY, { height: '90%', justifyContent: 'space-around' }]}>


        {/* VIEW FOR TITLE ! "YOUR PROFILE" */}
        <View style={{ marginTop: 40, marginBottom: 0, flex: 'auto' }}>
          <Text style={[
            GlobalStyles.h2,
            { color: Colors.primary, marginTop: 0, marginBottom: 10 },
          ]}
          >
            {title}
          </Text>
        </View>
        { /* END -- VIEW FOR TITLE */ }


        {/* VIEW FOR IMAGE OF USER */}
        <View style={{
          width: '80%',
          margin: 10,
          alignItems: 'center',
          flex: 'auto',
          justifyContent: 'flex',
        }}
        >
          {/* TODO: Replace with Icon ! */}
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png' }}
            style={{
              width: 150, height: 150, borderRadius: 75, margin: 20,
            }}
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

        {/* VIEW FOR USER INFO */}
        <View style={{
          width: '95%',
          margin: 0,
          alignItems: 'center',
          flex: 'auto',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
        >
          {/* VIEW FOR USER'S ROUTINE TIME */}
          <View style={[styles.profileRow, {
            width: '100%', display: 'flex', flex: 'auto', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: Colors.white, height: 32,
          }]}
          >

            <View style={styles.infoColumn}>
              <Text style={[GlobalStyles.paragraph, { fontSize: 16 }]}>Routine Time:</Text>
            </View>

            <View style={styles.dataColumn}>
              <Text style={[
                GlobalStyles.paragraph,
                {
                  color: Colors.primary,
                  fontSize: 16,
                },
              ]}
              >
                {'45 minutes'}
              </Text>
            </View>
          </View>
          {/* END --  VIEW FOR USER'S ROUTINE TIME */}

          {/* VIEW FOR USER'S HOME ADDRESS */}
          <View style={[styles.profileRow, {
            width: '100%', display: 'flex', flex: 'auto', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: Colors.white, height: 32,
          }]}
          >

            <View style={styles.infoColumn}>
              <Text style={[GlobalStyles.paragraph, { fontSize: 16 }]}>Current Address:</Text>
            </View>

            <View style={styles.dataColumn}>
              <Text style={[
                GlobalStyles.paragraph,
                {
                  color: Colors.primary,
                  fontSize: 16,
                },
              ]}
              >
                {'210 Lakelawn Place, Madison, WI'}
              </Text>
            </View>

          </View>
          {/* END --  VIEW FOR USER'S HOME ADDRESS */}


          {/* VIEW FOR USER'S WORK ADDRESS */}
          <View style={[styles.profileRow, {
            width: '100%', display: 'flex', flex: 'auto', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: Colors.white, height: 32,
          }]}
          >
            <View style={styles.infoColumn}>
              <Text style={[GlobalStyles.paragraph, { fontSize: 16 }]}>Work Address:</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={[
                GlobalStyles.paragraph,
                {
                  color: Colors.primary,
                  fontSize: 16,
                },
              ]}
              >
                {'1308 W Dayton St, Madison, WI'}
              </Text>
            </View>
          </View>
        </View>


        <View style={[styles.profileRow, {
          width: '80%', display: 'flex', flex: 'auto', flexDirection: 'column', justifyContent: 'space-around', height: 80,
        }]}
        >
          <Button
            title="Sign Out"
            color={Colors.darkGray}
            onPress={signOut}
          />
        </View>


      </View>
    );
  }
}

AccountScreen.propTypes = {
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

AccountScreen.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
