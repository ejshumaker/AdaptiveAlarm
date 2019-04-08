/* eslint-disable no-undef */
/* eslint-disable import/first */
import Alarm from '../../custom_modules/Alarm';

const MILS_PER_HOUR = 1000 * 60 * 60;

jest.useFakeTimers();

describe('Arm Alarm Tests', () => {
  const RealDate = Date;
  /* eslint no-global-assign:off */
  const constantDate = new Date(2020, 3, 26, 10, 0, 0);
  global.Date = class extends global.Date {
    constructor() {
      return constantDate;
    }
  };
  beforeEach(() => {

  });

  test('arm alarm with alarmtime', async () => {
    expect.assertions(2);
    const now = new Date();

    await Alarm.armAlarm(now.getTime() + 4 * MILS_PER_HOUR, jest.fn());
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function),
      4 * MILS_PER_HOUR);
  });
  afterAll(() => {
    global.Date = RealDate;
  });
});
