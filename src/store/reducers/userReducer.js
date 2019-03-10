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
  error: false,
  errorMessage: undefined, // overwrite with a message
  loading: false,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    // CREATE ACCOUNT //
    case 'USER_CREATE_ACCOUNT_PENDING':
      state = { ...state, loading: true };
      break;
    case 'USER_CREATE_ACCOUNT_REJECTED':
      state = {
        ...state,
        errorMessage:
        action.payload.message,
        error: action.error,
        loading: false,
      };
      break;
    case 'USER_CREATE_ACCOUNT_FULFILLED': {
      const {
        userName,
        firstName,
        lastName,
        email,
        uid,
      } = action.payload;
      state = {
        ...state,
        userName,
        firstName,
        lastName,
        email,
        uid,
        errorMessage: undefined,
        error: action.error,
        loading: false,
      };
      break;
    }
    // SIGN IN //
    case 'USER_SIGN_IN_PENDING':
      state = { ...state, loading: true };
      break;
    case 'USER_SIGN_IN_REJECTED':
      state = {
        ...state,
        errorMessage:
        action.payload.message,
        error: action.error,
        loading: false,
      };
      break;
    case 'USER_SIGN_IN_FULFILLED':
      state = {
        ...state,
        errorMessage: undefined,
        error: action.error,
        loading: false,
      };
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
