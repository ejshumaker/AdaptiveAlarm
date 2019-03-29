/**
 * User.js holds methods that are either pure functions
 * with no side effects, or API calls. Redux handles the
 * state updates.
 */
import { auth, database } from 'firebase';
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

export default {
  signIn, createAccount, signOut, fetch, createAlarm, deleteAlarm,
};
