/**
 * These are the alarm action creators,
 * they call the API's and set their up arguments
 * @eschirtz 03-02-19
 */
import User from '../../custom_modules/User';


export function userFetch(uid) {
  return {
    type: 'USER_FETCH',
    payload: User.fetch(uid),
  };
}

export function userCreateAccount(payload) {
  return dispatch => dispatch({
    type: 'USER_CREATE_ACCOUNT',
    payload: User.createAccount(payload),
  })
    // may chose to also dispatch another action to handle errors
    .catch(error => console.log(error)); // eslint-disable-line
}


export function userSignIn(payload) {
  return dispatch => dispatch({
    type: 'USER_SIGN_IN',
    payload: User.signIn(payload),
  })
    .catch(error => console.log(error)); // eslint-disable-line
}

export function userSignOut() {
  return {
    type: 'USER_SIGN_OUT',
    payload: User.signOut(),
  };
}
