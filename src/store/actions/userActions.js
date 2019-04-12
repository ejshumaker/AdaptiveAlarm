/**
 * These are the alarm action creators,
 * they call the API's and set their up arguments
 * @eschirtz 03-02-19
 */
import { auth } from 'firebase';
import User from '../../custom_modules/User';
import { alarmCalculateTime } from './alarmActions';

/**
 * Stores alarm data in firebase and
 * returns a new alarm with associated key
 * @param  {[Object]} payload
 */
export function userUpdateAlarm(payload) {
  const { navigate } = payload;
  return dispatch => dispatch({
    type: 'USER_CREATE_ALARM',
    payload: User.updateAlarm({
      ...payload,
      isActive: true, // default new to active
    }),
  })
    .then(() => {
      console.log('check?');
      dispatch(alarmCalculateTime());
      if (navigate) navigate('Main');
    })
    .catch(error => console.log(error)); // eslint-disable-line
}

export function userSetAlarmStatus(alarmId, status) {
  return (dispatch) => {
    dispatch({
      type: 'USER_SET_ALARM_STATUS',
      payload: User.setAlarmStatus(alarmId, status),
    })
      .then(() => {
        dispatch(alarmCalculateTime());
      });
  };
}

/**
 * Fetches the user's data from Firebase
 * and updates the store to reflect
 * @param  {Number} uid
 */
export function userFetch() {
  return dispatch => dispatch({
    type: 'USER_FETCH',
    payload: User.fetch(),
  })
    .then(() => { dispatch(alarmCalculateTime()); });
}

/**
 * Deletes alarm from firebase
 */
export function userDeleteAlarm(alarmId) {
  return (dispatch) => {
    dispatch({
      type: 'USER_DELETE_ALARM',
      payload: User.deleteAlarm(alarmId),
    })
      .then(() => {
        dispatch(userFetch());
      });
  };
}

/**
 * Creates an account with firebase &
 * creates an associated entry for the user in the database
 * with all their profile information
 * @param  {Object} payload
 */
export function userCreateAccount(payload) {
  return dispatch => dispatch({
    type: 'USER_CREATE_ACCOUNT',
    payload: User.createAccount(payload),
  })
    // may chose to also dispatch another action to handle errors
    .catch(error => console.log(error)); // eslint-disable-line
}

/**
 * Signs user in
 * @param payload
 */
export function userSignIn(payload) {
  return dispatch => dispatch({
    type: 'USER_SIGN_IN',
    payload: User.signIn(payload),
  })
    .catch(error => console.log(error)); // eslint-disable-line
}

/**
 * Signs user out
 */
export function userSignOut() {
  return {
    type: 'USER_SIGN_OUT',
    payload: User.signOut(),
  };
}
