
import Alarm from '../../custom_modules/Alarm';

/**
  * Calculates the alarm time using the google maps api and input from
  * the user. Currently returns the duration between locations in traffic and
  * then subtracts the time to get ready.
  * @tsteiner4 3-9-2019
  */
export function alarmCalculateTime(destinationLoc, timeToGetReady, arrivalTime, navigate) {
  return dispatch => dispatch({
    type: 'ALARM_SET_TIME',
    payload: Alarm.getAlarmTime(
      destinationLoc,
      timeToGetReady,
      arrivalTime,
    ),
  })
    .then((resp) => {
      Alarm.armAlarm(resp.value, navigate);
      dispatch({
        type: 'ALARM_SET_ACTIVE_STATUS',
        payload: true,
      });
    });
}

// TODO: Turn off the alarm and navigate home
export function alarmOff(navigate) {
  return {
    type: 'FOO',
    payload: navigate,
  };
}
