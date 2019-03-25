/**
 * These are the alarm action creators,
 * they will be what calls the APIs and set's up arguments
 * @eschirtz 03-02-19
 */
export function alarmCalculateTime(time) {
  return {
    type: 'ALARM_CALCULATE_TIME',
    payload: new Promise((resolve) => {
      setTimeout(() => {
        resolve(time);
      }, 2000);
    }),
  };
}

export function alarmFoo(bar) {
  return {
    type: 'FOO',
    payload: bar,
  };
}

// TODO: Turn off the alarm and navigate home
export function alarmOff(navigate) {
  return {
    type: 'FOO',
    payload: navigate,
  };
}
