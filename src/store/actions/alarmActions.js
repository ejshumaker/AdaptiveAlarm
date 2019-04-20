import Alarm from '../../custom_modules/Alarm';
import User from '../../custom_modules/User';

/**
  * Calculates the alarm time using the google maps api and input from
  * the user. Currently returns the duration between locations in traffic and
  * then subtracts the time to get ready.
  * @tsteiner4 3-9-2019
  */
/* eslint-disable import/prefer-default-export */
export function alarmCalculateTime() {
  const alarm = User.getNextAlarm();
  if (alarm !== undefined) {
    const {
      destinationLoc,
      timeToGetReady,
      alarmId,
      alarmUTC,
      soundIndex,
      modeIndex,
    } = alarm;
    const loopLimit = 4;
    const arrivalTimeBuffer = 6;
    return dispatch => dispatch({
      type: 'ALARM_SET_TIME',
      payload: Alarm.getAlarmTime(
        destinationLoc,
        timeToGetReady,
        alarmUTC,
        loopLimit,
        arrivalTimeBuffer,
        modeIndex,
      ),
    })
      .then((resp) => {
        Alarm.armAlarm(resp.value);
        dispatch({
          type: 'ALARM_SET_ARMED_STATUS',
          payload: {
            armed: true,
            currentAlarmId: alarmId,
            soundIndex,
            modeIndex,
          },
        });
      });
  }
  return dispatch => dispatch({
    type: 'ALARM_SET_ARMED_STATUS',
    payload: {
      armed: false,
      currentAlarmId: undefined,
    },
  });
}

// stub
/*
export function foo() {
  return {
    type: 'FOO',
    payload: null,
  };
}
*/
