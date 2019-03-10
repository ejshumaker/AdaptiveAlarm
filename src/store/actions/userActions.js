/**
 * These are the alarm action creators,
 * they call the API's and set their up arguments
 * @eschirtz 03-02-19
 */
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

export function userCreateAccount(payload) {
  return dispatch => dispatch({
    type: 'USER_CREATE_ACCOUNT',
    payload: User.createAccount(payload),
  })
    .catch((error) => {
      /* eslint-disable */
      console.log(error);
      // may additional chose to dispatch another action to handle error
      /* eslint-enable */
    });
}


export function userSignIn(payload) {
  return dispatch => dispatch({
    type: 'USER_SIGN_IN',
    payload: User.signIn(payload),
  })
    .catch((error) => {
      /* eslint-disable */
      console.log(error);
      // may additional chose to dispatch another action to handle error
      /* eslint-enable */
    });
}

export function userSignOut() {
  return {
    type: 'USER_SIGN_OUT',
    payload: User.signOut(),
  };
}
