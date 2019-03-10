/**
 * Handle action requests for the user,
 * seperating concerns into seperate reducers helps
 * to manage the application.
 * @eschirtz 03-03-19
 */
/* eslint-disable no-param-reassign */

const initialUserState = {
  uid: undefined,
  firstName: undefined,
  lastName: undefined,
  userName: undefined,
  email: undefined,
  errorMessage: undefined, // overwrite with a message
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    // SIGN IN //
    case 'USER_SIGN_IN_PENDING':
      state = { ...state };
      break;
    case 'USER_SIGN_IN_REJECTED':
      state = { ...state, errorMessage: action.errorMessage };
      break;
    case 'USER_SIGN_IN_FULFILLED':
      state = { ...state, error: undefined };
      break;
    // SIGN OUT //
    case 'USER_SIGN_OUT_PENDING':
      state = { ...state };
      break;
    case 'USER_SIGN_OUT_REJECTED':
      state = { ...state };
      break;
    case 'USER_SIGN_OUT_FULFILLED':
      state = { ...state };
      break;
    // /////////////////////
    // Synchronus setters //
    // /////////////////////
    case 'USER_SET':
      state = {
        ...state,
        uid: action.payload.uid,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        email: action.payload.email,
      };
      break;
    case 'USER_SET_AGE':
      state = {
        ...state,
        age: action.payload,
      };
      break;
    default:
  }
  return state; // The new state that will replace previous state
};

export default userReducer;
