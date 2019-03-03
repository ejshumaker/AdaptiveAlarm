/**
 * These are the alarm action creators,
 * they will be what calls the API's and set's up arguments
 * @eschirtz 03-02-19
 */
export function userSetName(name) {
  return {
    type: 'USER_SET_NAME',
    payload: name,
  };
}

export function userSetAge(age) {
  return {
    type: 'USER_SET_AGE',
    payload: age,
  };
}
