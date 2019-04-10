import moment from 'moment';
import Alarm from '../../custom_modules/Alarm';

/**
  * Calculates the alarm time using the google maps api and input from
  * the user. Currently returns the duration between locations in traffic and
  * then subtracts the time to get ready.
  * @tsteiner4 3-9-2019
  */
export function alarmCalculateTime(alarm) {
  const {
    destinationLoc,
    timeToGetReady,
    arrivalTime,
    alarmId,
    isActive,
  } = alarm;
  console.log(alarm);
  const date = new Date(moment(arrivalTime, 'LT')); // parse into date
  return dispatch => dispatch({
    type: 'ALARM_SET_TIME',
    payload: Alarm.getAlarmTime(
      destinationLoc,
      timeToGetReady,
      date.getTime(),
    ),
  })
    .then((resp) => {
      Alarm.armAlarm(resp.value);
      dispatch({
        type: 'ALARM_SET_ARMED_STATUS',
        payload: {
          armed: isActive,
          currentAlarmId: alarmId,
        },
      });
    });
}

// stub
export function foo() {
  return {
    type: 'FOO',
    payload: null,
  };
}
