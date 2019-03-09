import getRouteTime from '../../custom_modules/getRouteTime';

/**
  * Calculates the alarm time using the google maps api and input from
  * the user. Currently returns the duration between locations in traffic.
  * @tsteiner4 3-9-2019
  */
export function alarmCalculateTime(time) {
  return {
    type: 'ALARM_CALCULATE_TIME',
    payload: getRouteTime('Los Angeles, CA', 'Los Angelese International Airport, Los Angelese, CA', true),
  };
}

export function alarmFoo(bar) {
  return {
    type: 'FOO',
    payload: bar,
  };
}
