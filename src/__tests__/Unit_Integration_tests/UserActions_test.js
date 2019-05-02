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

const navMock = jest.fn();
const navigationMock = ({ navigate: navMock });

// const spy = jest.spyOn(User, 'signOut');

jest.setTimeout(10000);
describe('User Actions tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user update alarm action with store', async () => {
    const spy = jest.spyOn(User, 'updateAlarm');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userUpdateAlarm(navigationMock));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_CREATE_ALARM_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_CREATE_ALARM_FULFILLED',
    );
    expect(actions[2].type).toEqual('ALARM_SET_ARMED_STATUS');
    expect(spy).toHaveBeenCalled();
    expect(navMock).toHaveBeenCalled();
  });

  test('user update alarm action no nav', async () => {
    const spy = jest.spyOn(User, 'updateAlarm');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    const nav = jest.fn();
    await store.dispatch(userUpdateAlarm(nav));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_CREATE_ALARM_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_CREATE_ALARM_FULFILLED',
    );
    expect(actions[2].type).toEqual('ALARM_SET_ARMED_STATUS');
    expect(spy).toHaveBeenCalled();
    expect(navMock).toHaveBeenCalledTimes(0);
  });

  test('user update alarm action error', async () => {
    const spy = jest.spyOn(User, 'updateAlarm');
    spy.mockImplementation(payload => new Promise((resolve, reject) => {
      reject(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userUpdateAlarm(navigationMock));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_CREATE_ALARM_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_CREATE_ALARM_REJECTED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user set alarm status action with store', async () => {
    const spy = jest.spyOn(User, 'setAlarmStatus');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userSetAlarmStatus('1', true));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_SET_ALARM_STATUS_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_SET_ALARM_STATUS_FULFILLED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user fetch action with store', async () => {
    const spy = jest.spyOn(User, 'fetch');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userFetch());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_FETCH_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_FETCH_FULFILLED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user delete alarm action with store', async () => {
    const spy = jest.spyOn(User, 'deleteAlarm');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userDeleteAlarm('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_DELETE_ALARM_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_DELETE_ALARM_FULFILLED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user create account action with store', async () => {
    const spy = jest.spyOn(User, 'createAccount');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userCreateAccount('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_CREATE_ACCOUNT_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_CREATE_ACCOUNT_FULFILLED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user create account failure', async () => {
    const spy = jest.spyOn(User, 'createAccount');
    spy.mockImplementation(payload => new Promise((resolve, reject) => {
      reject(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userCreateAccount('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_CREATE_ACCOUNT_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_CREATE_ACCOUNT_REJECTED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user sign in action with store', async () => {
    const spy = jest.spyOn(User, 'signIn');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userSignIn({ name: 'Tristan', email: 'trist@gmail.com' }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_SIGN_IN_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_SIGN_IN_FULFILLED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user sign in failure', async () => {
    const spy = jest.spyOn(User, 'signIn');
    spy.mockImplementation(payload => new Promise((resolve, reject) => {
      reject(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userSignIn({ name: 'Tristan', email: 'trist@gmail.com' }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_SIGN_IN_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_SIGN_IN_REJECTED',
    );
    expect(spy).toHaveBeenCalled();
  });

  test('user sign out action with store', async () => {
    const spy = jest.spyOn(User, 'signOut');
    spy.mockImplementation(payload => new Promise((resolve) => {
      resolve(payload);
    }));
    const store = mockStore({});
    await store.dispatch(userSignOut());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'USER_SIGN_OUT_PENDING',
    });
    expect(actions[1].type).toEqual(
      'USER_SIGN_OUT_FULFILLED',
    );
    expect(spy).toHaveBeenCalled();
  });
});
