/* eslint-disable no-undef */
/* eslint-disable import/first */

import { alarmCalculateTime } from '../../store/actions/alarmActions';
import User from '../../custom_modules/User';
import Alarm from '../../custom_modules/Alarm';

jest.mock('react-native-background-timer', () => jest.fn());
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
    }));
    alarmSpy.mockImplementation(() => new Promise(resolve => resolve()));
    const result = await alarmCalculateTime();
    expect(result).toEqual(expect.any(Function));
  });
  test('alarm action with alarm undefined', async () => {
    spy.mockImplementation(() => undefined);
    const result = await alarmCalculateTime();
    expect(result).toEqual(expect.any(Function));
  });
});
