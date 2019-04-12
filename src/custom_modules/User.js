/**
 * User.js holds methods that are either pure functions
 * with no side effects, or API calls. Redux handles the
 * state updates.
 */
import { auth, database } from 'firebase';
import moment from 'moment';
import { Calendar, Permissions } from 'expo';
/**
 * Calculates alarm time from user entered information
 * stores data in firebase and resolves with data to be
 * kept in local store
 * @param  {[Object]} payload [description]
 * @return {[Promise]}         [description]
 */
function createAlarm(payload) {
  const {
    destinationLoc,
    arrivalTime,
    timeToGetReady,
  } = payload;
  const { uid } = auth().currentUser;

  return new Promise((resolve, reject) => {
    const alarmKey = 'alarm1'; // uncomment below line for multiple alarms
    database().ref(`users/${uid}/alarms/${alarmKey}`)
      .set({
        destinationLoc,
        arrivalTime,
        timeToGetReady,
      })
      .then(() => {
        resolve({
          destinationLoc,
          arrivalTime,
          timeToGetReady,
          key: alarmKey,
        });
      })
      .catch(error => reject(error));
  });
}

/**
 * Deletes an alarm from firebase
 * @param {[alarmId]}
 */
function deleteAlarm(alarmId = 'alarm1') {
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

/**
 * Helper function of getNextEvents. Checks the user's calendar
 * on the specified day and returns the first event's location
 * and start time.
 * @return destinationLoc, arrivalTime
 */
async function getStartTimeAndLocation(dayStart, dayEnd) {
  let destinationLoc = '';
  let arrivalTime = 0;
  await Permissions.askAsync('calendar');
  const cals = await Calendar.getCalendarsAsync();
  // get all device calendar ids
  const data = cals.filter(item => item).map(({ id }) => ({ id }));
  // check all events for the following day and return earliest event start time
  await Calendar.getEventsAsync(data, dayStart, dayEnd).then((response) => {
    if (response.length > 0) {
      const { location } = response[0];
      if (location === '') {
        destinationLoc = undefined;
      } else {
        destinationLoc = location;
      }
      arrivalTime = response[0].startDate;
      arrivalTime = moment(arrivalTime).format('hh:mma');
    } else {
      destinationLoc = undefined;
      arrivalTime = undefined;
    }
  });
  return { destinationLoc, arrivalTime };
}

/**
 * Gets the user's calendar events for the
 * current week. Finds the first event of
 * each day and adds it to an array containing
 * each day's arrivalTime and destinationLoc.
 * Index 0 is Sunday, index 6 is Saturday.
 * @return dayArray
 */
// eslint-disable-next-line
async function getNextEvents() {
  const d = new Date();
  const currDayOfWeek = d.getDay();
  const dayArray = [];
  for (let i = 0; i < 7; i += 1) {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() + (i - currDayOfWeek));
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date();
    dayEnd.setDate(dayEnd.getDate() + (i - currDayOfWeek));
    dayEnd.setHours(23, 59, 59, 0);
    // eslint-disable-next-line
    await getStartTimeAndLocation(dayStart, dayEnd).then((response) => {
      const { destinationLoc } = response;
      const { arrivalTime } = response;
      // if no start time or location, set this array index to undefined
      if ((destinationLoc === undefined) || (arrivalTime === undefined)) {
        dayArray.push(undefined);
      } else {
        dayArray.push({ destinationLoc, arrivalTime });
      }
    });
  }
  return dayArray;
}

export default {
  signIn, createAccount, signOut, fetch, createAlarm, deleteAlarm,
};
