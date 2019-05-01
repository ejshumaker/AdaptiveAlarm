/* eslint-disable no-undef */
/* eslint-disable import/first */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import {
  userUpdateAlarm,
  userSetAlarmStatus,
  userFetch,
  userDeleteAlarm,
  userCreateAccount,
  userSignIn, userSignOut,
} from '../../store/actions/userActions';

import User from '../../custom_modules/User';

const middlewares = [promiseMiddleware, thunk];
const mockStore = configureStore(middlewares);

jest.mock('react-native-background-timer', () => jest.fn());
jest.mock('../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));

const mockAuth = ({
  currentUser: ({
    email: 'test@gmail.com',
    password: 'pass',
    uid: 1234,
  }),
});

jest.mock('firebase', () => ({
  auth: jest.fn(() => mockAuth),
}));

const navigationMock = jest.fn();

const spy = jest.spyOn(User, 'signOut');

jest.setTimeout(10000);
describe('User Actions tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user update alarm action with store', async () => {
    const store = mockStore({});
    await store.dispatch(userUpdateAlarm(navigationMock));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_CREATE_ALARM_PENDING',
    });
  });

/*
  test('user update alarm action', async () => {
    const result = await userUpdateAlarm(navigationMock);
    expect(result).toEqual(expect.any(Function));
  });

  test('user set alarm action', async () => {
    const result = await userSetAlarmStatus('1', true);
    expect(result).toEqual(expect.any(Function));
  });

  test('user fetch action', async () => {
    const result = await userFetch();
    expect(result).toEqual(expect.any(Function));
  });

  test('user delete alarm action', async () => {
    const result = await userDeleteAlarm('1');
    expect(result).toEqual(expect.any(Function));
  });
  test('user create account action', async () => {
    const result = await userCreateAccount('test');
    expect(result).toEqual(expect.any(Function));
  });
  test('user sign in action', async () => {
    const result = await userSignIn('test');
    expect(result).toEqual(expect.any(Function));
  });
  test('user sign out action', async () => {
    spy.mockImplementation(() => 'payload');
    const result = await userSignOut();
    expect(result).toEqual({ type: 'USER_SIGN_OUT', payload: 'payload' });
  });
  */
});
