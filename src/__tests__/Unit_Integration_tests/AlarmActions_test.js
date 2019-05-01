/* eslint-disable no-undef */
/* eslint-disable import/first */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { alarmCalculateTime } from '../../store/actions/alarmActions';
import User from '../../custom_modules/User';
import Alarm from '../../custom_modules/Alarm';

const middlewares = [promiseMiddleware, thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));

const spy = jest.spyOn(User, 'getNextAlarm');
const alarmSpy = jest.spyOn(Alarm, 'getAlarmTime');

jest.setTimeout(10000);
describe('Alarm Actions tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('alarm action with alarm defined', async () => {
    spy.mockImplementation(() => ({
      destinationLoc: 'testLoc',
      timeToGetReady: '30',
      alarmId: '1',
      alarmUTC: '158760000',
      soundIndex: 1,
      modeIndex: 1,
    }));
    alarmSpy.mockImplementation(() => new Promise(resolve => resolve(1)));
    const result = await alarmCalculateTime();
    expect(result).toEqual(expect.any(Function));
  });
  test('alarm action with alarm undefined', async () => {
    spy.mockImplementation(() => undefined);
    const result = await alarmCalculateTime();
    expect(result).toEqual(expect.any(Function));
  });

  test('action from online', async () => {
    spy.mockImplementation(() => ({
      destinationLoc: 'testLoc',
      timeToGetReady: '30',
      alarmId: '2',
      alarmUTC: '158760000',
      soundIndex: 1,
      modeIndex: 1,
    }));
    alarmSpy.mockImplementation(() => new Promise(resolve => resolve(1)));
    const store = mockStore({});
    await store.dispatch(alarmCalculateTime());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ALARM_SET_TIME_PENDING',
    });
    expect(actions[1]).toEqual({
      type: 'ALARM_SET_TIME_FULFILLED',
      payload: 1,
    });
    expect(actions[2]).toEqual({
      type: 'ALARM_SET_ARMED_STATUS',
      payload: {
        armed: true,
        currentAlarmId: '2',
        soundIndex: 1,
        modeIndex: 1,
      },
    });
  });

  test('action created when undefined alarm', async () => {
    spy.mockImplementation(() => undefined);
    alarmSpy.mockImplementation(() => new Promise(resolve => resolve(1)));
    const store = mockStore({});
    await store.dispatch(alarmCalculateTime());
    const actions = store.getActions();
    return expect(actions[0]).toEqual({
      payload: {
        armed: false,
        currentAlarmId: undefined,

      },
      type: 'ALARM_SET_ARMED_STATUS',
    });
  });
});
