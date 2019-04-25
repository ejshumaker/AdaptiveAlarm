/**
 * Handle action requests for the alarm,
 * seperating concerns into seperate reducers helps
 * to manage the application.
 * @eschirtz 03-03-19
 */
/* eslint-disable no-param-reassign */

const initialAlarmState = {
  time: undefined,
  currentAlarmId: undefined,
  armed: false,
  loading: false,
  soundIndex: 1,
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
        time: -1,
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
    case 'ALARM_SET_ARMED_STATUS':
      state = {
        ...state,
        armed: action.payload.armed,
        soundIndex: action.payload.soundIndex || 1,
        modeIndex: action.payload.modeIndex,
        currentAlarmId: action.payload.currentAlarmId,
      };
      break;
    default:
  }
  return state; // The new state that will replace previous state
};

export default alarmReducer;
