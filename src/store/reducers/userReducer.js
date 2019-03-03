/**
 * Handle action requests for the user,
 * seperating concerns into seperate reducers helps
 * to manage the application.
 * @eschirtz 03-03-19
 */
/* eslint-disable no-param-reassign */

const initialUserState = {
  name: 'Unamed User',
  age: 0,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'USER_SET_NAME':
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case 'USER_SET_AGE':
      state = {
        ...state,
        age: action.payload,
      };
      break;
    default:
  }
  return state; // The new state that will replace previous state
};

export default userReducer;
