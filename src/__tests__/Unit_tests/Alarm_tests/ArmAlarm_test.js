/* eslint-disable no-undef */
/* eslint-disable import/first */
import Alarm from '../../../custom_modules/Alarm';

const MILS_PER_HOUR = 1000 * 60 * 60;

jest.useFakeTimers();

jest.mock('../../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));
describe('Arm Alarm Tests', () => {
  const RealDate = Date;
  /* eslint no-global-assign:off */
  const constantDate = new Date(2020, 3, 26, 10, 0, 0);
  global.Date = class extends global.Date {
    constructor() {
      return constantDate;
    }
  };
  const mockNav = jest.fn();


  beforeEach(() => {
    Alarm.initAlarm(mockNav);
  });

  test('arm alarm with alarmtime', async () => {
    expect.assertions(2);
    const now = new Date();

    await Alarm.armAlarm(now.getTime() + 4 * MILS_PER_HOUR);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function),
      4 * MILS_PER_HOUR);
  });

  test('test that after timeout triggerNavigate is called', async () => {
    const now = new Date();

    await Alarm.armAlarm(now.getTime() + 4 * MILS_PER_HOUR);
    expect(mockNav).not.toBeCalled();

    jest.advanceTimersByTime(4 * MILS_PER_HOUR);

    expect(mockNav).toBeCalled();
    expect(mockNav).toHaveBeenCalledTimes(1);
  });

  test('negative difference in time -> triggerNavigate is called', async () => {
    const now = new Date();

    await Alarm.armAlarm(now.getTime() - 4);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), -4);
    expect(mockNav).not.toBeCalled();

    jest.advanceTimersByTime(1);
    expect(mockNav).toBeCalled();
    expect(mockNav).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    setTimeout.mockClear();
    mockNav.mockClear();
  });
  afterAll(() => {
    global.Date = RealDate;
  });
});
