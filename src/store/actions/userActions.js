/**
 * These are the alarm action creators,
 * they will be what calls the API's and set's up arguments
 * @eschirtz 03-02-19
 */
import store from '../index';
import User from '../../custom_modules/User';

export function userSet(name) {
  return {
    type: 'USER_SET',
    payload: name,
  };
}

export function userSetAge(age) {
  return {
    type: 'USER_SET_AGE',
    payload: age,
  };
}

export function userSignIn(payload) {
  return dispatch => dispatch({
    type: 'USER_SIGN_IN',
    payload: User.signIn(payload.email, payload.password),
  })
    .catch((error) => {
      dispatch({
        type: 'USER_SIGN_IN_REJECTED',
        errorMessage: error,
      });
    });
}

export function userSignOut() {
  return {
    type: 'USER_SIGN_OUT',
    payload: User.signOut(),
  };
}
