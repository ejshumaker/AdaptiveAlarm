/**
 * These are the alarm action creators,
 * they call the API's and set their up arguments
 * @eschirtz 03-02-19
 */
import User from '../../custom_modules/User';
import { alarmCalculateTime } from './alarmActions';

/**
 * Stores alarm data in firebase and
 * returns a new alarm with associated key
 * @param  {[Object]} payload
 */
export function userCreateAlarm(payload) {
  const {
    destinationLoc,
    timeToGetReady,
    arrivalTime,
    days,
    navigate,
  } = payload;
  return dispatch => dispatch({
    type: 'USER_CREATE_ALARM',
    payload: User.createAlarm({
      destinationLoc,
      timeToGetReady,
      arrivalTime,
      days,
      isActive: true, // default new to active
    }),
  })
    .then(() => {
      const alarm = User.getNextAlarm();
      dispatch(alarmCalculateTime(alarm));
      if (navigate) navigate('Main');
    })
    .catch(error => console.log(error)); // eslint-disable-line
}

export function userSetAlarmStatus(alarmId, status, navigate) {
  return (dispatch) => {
    dispatch({
      type: 'USER_SET_ALARM_STATUS',
      payload: User.setAlarmStatus(alarmId, status),
    })
      .then(() => {
      // get new "nextAlarm"
        const alarm = User.getNextAlarm();
        dispatch(alarmCalculateTime(alarm));
      });
  };
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
        dispatch({
          type: 'ALARM_SET_ARMED_STATUS',
          payload: {
            armed: false,
            currentAlarmId: undefined,
          },
        });
      });
  };
}
/**
 * Fetches the user's data from Firebase
 * and updates the store to reflect
 * @param  {Number} uid
 */
export function userFetch(uid) {
  return dispatch => dispatch({
    type: 'USER_FETCH',
    payload: User.fetch(uid),
  })
    .then(() => {
      const alarm = User.getNextAlarm();
      console.log(alarm);
      if (alarm !== undefined) {
        dispatch(alarmCalculateTime(alarm));
      } else {
        dispatch({
          type: 'ALARM_SET_ACTIVE_STATUS',
          payload: false,
        });
      }
    });
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
