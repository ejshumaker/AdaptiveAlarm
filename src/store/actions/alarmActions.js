import getAlarmTime from '../../custom_modules/Alarm';

/**
  * Calculates the alarm time using the google maps api and input from
  * the user. Currently returns the duration between locations in traffic.
  * @tsteiner4 3-9-2019
  */
export function alarmCalculateTime() {
  const date = new Date();
  date.setHours(date.getHours() + 3);
  return {
    type: 'ALARM_CALCULATE_TIME',
    payload: getAlarmTime('Madison, WI', new Date(2019, 2, 26, 10, 0, 0), 30),
  };
}

export function alarmFoo(bar) {
  return {
    type: 'FOO',
    payload: bar,
  };
}
