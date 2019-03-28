/**
 * Handle action requests for the alarm,
 * seperating concerns into seperate reducers helps
 * to manage the application.
 * @eschirtz 03-03-19
 */
/* eslint-disable no-param-reassign */

const initialAlarmState = {
  time: 0,
};
const alarmReducer = (state = initialAlarmState, action) => {
  switch (action.type) {
    case 'ALARM_FOO':
      state = {
        ...state,
      };
      break;
    default:
  }
  return state; // The new state that will replace previous state
};

export default alarmReducer;
