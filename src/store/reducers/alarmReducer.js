/**
 * Handle action requests for the alarm,
 * seperating concerns into seperate reducers helps
 * to manage the application.
 * @eschirtz 03-03-19
 */
/* eslint-disable no-param-reassign */

const initialAlarmState = {
  time: undefined,
  active: true,
  loading: false,
};
const alarmReducer = (state = initialAlarmState, action) => {
  switch (action.type) {
    case 'ALARM_SET_TIME_PENDING':
      state = {
        ...state,
        loading: true,
        active: true, // for iteration 1 only!
      };
      break;
    case 'ALARM_SET_TIME_REJECTED':
      state = {
        ...state,
        loading: false,
      };
      break;
    case 'ALARM_SET_TIME_FULFILLED':
      state = {
        ...state,
        time: action.payload,
        loading: false,
      };
      break;
    case 'ALARM_SET_ACTIVE_STATUS':
      state = {
        ...state,
        active: action.payload,
      };
      break;
    default:
  }
  return state; // The new state that will replace previous state
};

export default alarmReducer;
