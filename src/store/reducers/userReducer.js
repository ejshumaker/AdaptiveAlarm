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
  alarms: undefined,
  destinationLoc: undefined,
  timeToGetReady: undefined,
  arrivalTime: undefined,
  error: false,
  errorMessage: undefined, // overwrite with a message
  loading: false, // global loading flag
  loadingFetch: false, // can have a more specific loading flag
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'USER_CLEAR_ERRORS':
      state = { ...state, error: false, errorMessage: undefined };
      break;
    // CREATE ALARM //
    case 'USER_CREATE_ALARM_PENDING':
      state = { ...state, loading: true };
      break;
    case 'USER_CREATE_ALARM_REJECTED':
      state = {
        ...state,
        errorMessage:
        action.payload.message,
        error: action.error,
        loading: false,
      };
      break;
    case 'USER_ALARM_HAS_FIRED': {
      const { alarms } = state;
      const { alarmId } = action;
      alarms[alarmId].hasFired = true;
      state = { ...state, alarms };
      break;
    }
    case 'USER_CREATE_ALARM_FULFILLED': {
      // Push new alarm into alarms array
      let { alarms } = state;
      if (alarms === undefined) {
        alarms = {}; // create an empty object
      }
      const { alarmId } = action.payload;
      alarms[alarmId] = action.payload;
      state = {
        ...state,
        alarms,
        errorMessage: undefined,
        error: action.error,
        loading: false,
      };
      break;
    }
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
    // Alarm status
    case 'USER_SET_ALARM_STATUS_FULFILLED': {
      const { alarmId, status } = action.payload;
      const alarms = { ...state.alarms }; // make a copy
      alarms[alarmId].isActive = status;
      state = {
        ...state,
        alarms,
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
        errorMessage: action.payload.message,
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
    // FETCH USER DATA //
    case 'USER_FETCH_PENDING':
      state = {
        ...state,
        loading: true,
        loadingFetch: true,
      };
      break;
    case 'USER_FETCH_REJECTED':
      state = {
        ...state,
        loading: false,
        loadingFetch: false,
      };
      break;
    case 'USER_FETCH_FULFILLED': {
      const {
        firstName,
        lastName,
        userName,
        email,
        uid,
        alarms,
      } = action.payload;
      state = {
        ...state,
        firstName,
        lastName,
        userName,
        email,
        uid,
        alarms,
        loading: false,
        loadingFetch: false,
      };
      break;
    }
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
    default:
  }
  return state; // The new state that will replace previous state
};

export default userReducer;
