/**
 * User.js holds methods that are either pure functions
 * with no side effects, or API calls. Redux handles the
 * state updates.
 */
import { auth, database } from 'firebase';
import moment from 'moment';
import store from '../store';

const DAY_MAP = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

function getNextAlarm() {
  const state = store.getState();
  const { alarms } = state.user;
  if (alarms === undefined) return undefined;
  const currentDay = moment().days();
  console.log('-- Getting Next Alarm --');
  let earliestAlarmTime = Number.MAX_SAFE_INTEGER;
  let earliestAlarmId;
  let ids = alarms !== undefined ? Object.keys(alarms) : [];
  ids = ids.filter(id => alarms[id].isActive && !alarms[id].hasFired);
  for (let i = 0; i < ids.length; i += 1) {
    const alarm = alarms[ids[i]];
    // find next day of week
    let nextDayNumber = Number.MAX_SAFE_INTEGER;
    const days = alarm.days || {};
    Object.entries(days)
      .filter(entry => entry[1]) // check that alarm is triggered for that day
      .forEach((entry) => {
        const day = entry[0];
        let dayNumber = DAY_MAP[day];
        // If day is earlier within the week, rollover to next week
        dayNumber = currentDay <= dayNumber ? dayNumber : dayNumber + 7;
        // If day is same, check if time is earlier
        if (dayNumber === currentDay) {
          const alarmMoment = moment(alarm.arrivalTime, 'LT');
          const currentMoment = moment();
          const isBefore = alarmMoment.isBefore(currentMoment);
          if (isBefore) {
            dayNumber += 7; // add a week if alarm has already passed
          }
        }

        // Find the nearest day, ie the lowest number
        nextDayNumber = dayNumber < nextDayNumber ? dayNumber : nextDayNumber;
      });
    const day = moment(alarm.arrivalTime, 'LT');
    day.subtract(alarm.timeToGetReady, 'minutes');
    day.day(nextDayNumber);
    const closestSoFar = day.utc() < earliestAlarmTime;
    earliestAlarmTime = closestSoFar ? day.utc() : earliestAlarmTime;
    earliestAlarmId = closestSoFar ? ids[i] : earliestAlarmId;
  }
  const earliestAlarm = alarms[earliestAlarmId];

  if (earliestAlarmId !== undefined) {
    console.log(`\tArrival Time: ${earliestAlarm.arrivalTime}`);
    console.log(`\tDestination: ${earliestAlarm.destinationLoc}`);
    return {
      ...earliestAlarm,
      alarmId: earliestAlarmId,
      alarmUTC: earliestAlarmTime, // package the actual date & time
    };
  }
  return undefined; // TODO: WTF IS THIS
}
/**
 * Calculates alarm time from user entered information
 * stores data in firebase and resolves with data to be
 * kept in local store
 * @param  {[Object]} payload [description]
 * @return {[Promise]}         [description]
 */
function updateAlarm(payload) {
  const {
    destinationLoc,
    arrivalTime,
    timeToGetReady,
    days,
    isActive,
    soundIndex,
    modeIndex,
  } = payload;
  let { alarmId } = payload;
  const { uid } = auth().currentUser;
  return new Promise((resolve, reject) => {
    if (alarmId === undefined) alarmId = database().ref(`users/${uid}/alarms/`).push().key;
    database().ref(`users/${uid}/alarms/${alarmId}`)
      .set({
        destinationLoc,
        arrivalTime,
        timeToGetReady,
        days,
        isActive,
        alarmId,
        soundIndex,
        modeIndex,
      })
      .then(() => {
        resolve({
          destinationLoc,
          arrivalTime,
          timeToGetReady,
          days,
          isActive,
          alarmId,
          soundIndex,
          modeIndex,
        });
      })
      .catch(error => reject(error));
  });
}

/**
 * Deletes an alarm from firebase
 * @param {[alarmId]}
 */
function deleteAlarm(alarmId) {
  const { uid } = auth().currentUser;
  return new Promise((resolve, reject) => {
    database().ref(`users/${uid}/alarms/${alarmId}`)
      .remove()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Deletes an alarm from firebase
 * @param {[alarmId, status]}
 */
function setAlarmStatus(alarmId, status) {
  const { uid } = auth().currentUser;
  return new Promise((resolve, reject) => {
    database().ref(`users/${uid}/alarms/${alarmId}/isActive`)
      .set(status)
      .then(() => {
        resolve({
          alarmId,
          status,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Fetches a users data from firebase database
 * @param  uid unique id as FB key
 * @return {[Promise]} wraps the Promise from Firebase
 */
function fetch() {
  const { uid } = auth().currentUser;
  return new Promise((resolve, reject) => {
    database().ref(`users/${uid}`).once('value')
      .then(snap => resolve(snap.val()))
      .catch(error => reject(error));
  });
}

/**
 * Creates a new account and stores data in database
 * @param  credentials requires email & password
 * @return {[Promise]} wraps the Promise from Firebase
 */
function createAccount(credentials) {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
  } = credentials;
  return new Promise((resolve, reject) => {
    let userData;
    auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const { user } = response;
        userData = {
          userName,
          firstName,
          lastName,
          email: user.email,
          uid: user.uid,
        };
        database().ref(`users/${user.uid}`)
          .set(userData);
      })
      .then(() => resolve(userData))
      .catch(error => reject(error));
  });
}

/**
 * Signs user in through firebase authentication
 * @param  email
 * @param  password
 * @return {[Promise]} wraps the Promise from Firebase
 */
function signIn(credentials) {
  const { email, password } = credentials;
  return new Promise((resolve, reject) => {
    auth().signInWithEmailAndPassword(email, password)
      .then(resp => resolve(resp))
      .catch(error => reject(error));
  });
}

/**
 * Signs user out through firebase authentication
 * @return {[Promise]} wraps the Promise from Firebase
 */
function signOut() {
  return new Promise((resolve, reject) => {
    auth().signOut()
      .then(resolve(true))
      .catch(reject(new Error('Sign Out Failed')));
  });
}

export default {
  setAlarmStatus, signIn, createAccount, signOut, fetch, updateAlarm, deleteAlarm, getNextAlarm,
};
