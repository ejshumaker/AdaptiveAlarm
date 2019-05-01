/* eslint-disable no-undef */
/* eslint-disable import/first */
import BackgroundTimer from 'react-native-background-timer';
import Alarm from '../../../custom_modules/Alarm';

jest.mock('react-native-background-timer', () => jest.fn());
jest.mock('../../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));
jest.useFakeTimers();

describe('Init Arm Alarm Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    BackgroundTimer.runBackgroundTimer = setTimeout;
    BackgroundTimer.setInterval = setTimeout;
  });

  test('init arm alarm sets navigation reference', async () => {
    const mockNav = jest.fn(() => 2);
    Alarm.initAlarm(mockNav);
    Alarm.navigateRef();
    expect(mockNav).toHaveBeenCalledTimes(1);
    expect(BackgroundTimer.runBackgroundTimer).toHaveBeenCalledTimes(1);
  });


  test('calls check alarm after timeout', async () => {
    const mockNav = jest.fn(() => 2);
    Alarm.initAlarm(mockNav);
    jest.runAllTimers(10);
    expect(BackgroundTimer.runBackgroundTimer).toHaveBeenCalledTimes(1);
  });
});
