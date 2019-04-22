/* eslint-disable no-undef */
/* eslint-disable import/first */
import Alarm from '../../custom_modules/Alarm';


describe('Init Arm Alarm Tests', () => {
  beforeEach(() => {

  });

  test('init arm alarm sets navigation reference', async () => {
    const mockNav = jest.fn(() => 2);
    Alarm.initAlarm(mockNav);
    Alarm.navigateRef();
    expect(mockNav).toHaveBeenCalledTimes(1);
  });
});
