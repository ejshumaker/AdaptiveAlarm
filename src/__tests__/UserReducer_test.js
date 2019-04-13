/* eslint-disable no-undef */
/* eslint-disable import/first */

import userReducer from '../store/reducers/userReducer';

const initialUserState = {
  uid: undefined,
  firstName: undefined,
  lastName: undefined,
  userName: undefined,
  email: undefined,
  alarms: undefined,
  destinationLoc: undefined,
  timeToGetReady: undefined,
  arrivalTime: undefined,
  error: false,
  errorMessage: undefined, // overwrite with a message
  loading: false, // global loading flag
  loadingFetch: false, // can have a more specific loading flag
};

jest.setTimeout(10000);
describe('User Reducer tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user create alarm pending action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_CREATE_ALARM_PENDING' });
    expect(result).toEqual({ ...initialUserState, loading: true });
  });

  test('user create alarm rejected action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_CREATE_ALARM_REJECTED', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState, errorMessage: 'error', error: 'bigError' });
  });

  test('user create alarm fulfilled action', async () => {
    const result = userReducer(initialUserState, {
      type: 'USER_CREATE_ALARM_FULFILLED',
      payload: { alarmId: '1', message: 'error' },
      error: 'bigError',
    });
    expect(result).toEqual({
      ...initialUserState,
      alarms: {
        1: {
          alarmId: '1',
          message: 'error',
        },
      },
      error: 'bigError',
    });
  });

  test('user create alarm fulfilled action with alarms', async () => {
    const result = userReducer(
      {
        ...initialUserState,
        alarms: {
          1: {
            alarmId: '1',
            message: 'error',
          },
        },
      }, {
        type: 'USER_CREATE_ALARM_FULFILLED',
        payload: { alarmId: '1', message: 'error' },
        error: 'bigError',
      },
    );
    expect(result).toEqual({
      ...initialUserState,
      alarms: {
        1: {
          alarmId: '1',
          message: 'error',
        },
      },
      error: 'bigError',
    });
  });

  test('user create account pending action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_CREATE_ACCOUNT_PENDING' });
    expect(result).toEqual({ ...initialUserState, loading: true });
  });

  test('user create account rejected action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_CREATE_ACCOUNT_REJECTED', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState, errorMessage: 'error', error: 'bigError' });
  });

  test('user create account fulfilled action', async () => {
    const result = userReducer(initialUserState, {
      type: 'USER_CREATE_ACCOUNT_FULFILLED',
      payload: { alarmId: '1', message: 'error' },
      error: 'bigError',
    });
    expect(result).toEqual({ ...initialUserState, error: 'bigError' });
  });

  test('user set alarm status fulfilled action', async () => {
    const result = userReducer({ ...initialUserState, alarms: { 1: { isActive: true } } },
      {
        type: 'USER_SET_ALARM_STATUS_FULFILLED',
        payload: {
          alarmId: '1', message: 'error', status: true, isActive: true,
        },
        error: 'bigError',
      });
    expect(result).toEqual({
      ...initialUserState,
      alarms: {
        1: {
          isActive: true,
        },
      },
      error: false,
    });
  });


  test('user sign in pending action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_SIGN_IN_PENDING' });
    expect(result).toEqual({ ...initialUserState, loading: true });
  });

  test('user sign in rejected action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_SIGN_IN_REJECTED', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState, errorMessage: 'error', error: 'bigError' });
  });

  test('user sign in fulfilled action', async () => {
    const result = userReducer(initialUserState, {
      type: 'USER_SIGN_IN_FULFILLED',
      payload: { alarmId: '1', message: 'error' },
      error: 'bigError',
    });
    expect(result).toEqual({
      ...initialUserState,
      error: 'bigError',
    });
  });

  test('user fetch pending action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_FETCH_PENDING' });
    expect(result).toEqual({ ...initialUserState, loading: true, loadingFetch: true });
  });

  test('user fetch rejected action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_FETCH_REJECTED', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState });
  });

  test('user fetch fulfilled action', async () => {
    const result = userReducer(initialUserState, {
      type: 'USER_FETCH_FULFILLED',
      payload: { alarmId: '1', message: 'error' },
      error: 'bigError',
    });
    expect(result).toEqual({
      ...initialUserState,
    });
  });

  test('user sign out pending action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_SIGN_OUT_PENDING', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState });
  });
  test('user sign out rejected action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_SIGN_OUT_REJECTED', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState });
  });
  test('user sign out fulfilled action', async () => {
    const result = userReducer(initialUserState, { type: 'USER_SIGN_OUT_FULFILLED', payload: { message: 'error' }, error: 'bigError' });
    expect(result).toEqual({ ...initialUserState });
  });

  test('user set action', async () => {
    const result = userReducer(initialUserState,
      {
        type: 'USER_SET',
        payload: {
          uid: '1',
          firstName: 'test',
          lastName: 'last',
          userName: 'ttt',
          email: 'test@gmail.com',
        },
      });
    expect(result).toEqual({
      ...initialUserState,
      uid: '1',
      firstName: 'test',
      lastName: 'last',
      userName: 'ttt',
      email: 'test@gmail.com',
    });
  });
  test('default case', async () => {
    const result = userReducer(undefined,
      {
        type: 'unknown',
        payload: {
          uid: '1',
          firstName: 'test',
          lastName: 'last',
          userName: 'ttt',
          email: 'test@gmail.com',
        },
      });
    expect(result).toEqual(initialUserState);
  });
});
