/**
 * Handle action requests for the alarm,
 * seperating concerns into seperate reducers helps
 * to manage the application.
 * @eschirtz 03-03-19
 */
/* eslint-disable no-param-reassign */

const initialAlarmState = {
  time: undefined,
  loading: false,
};
const alarmReducer = (state = initialAlarmState, action) => {
  switch (action.type) {
    case 'ALARM_SET_TIME_PENDING':
      state = {
        ...state,
        loading: true,
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
    default:
  }
  return state; // The new state that will replace previous state
};

export default alarmReducer;
