/* eslint-disable no-undef */
/* eslint-disable import/first */
import alarmReducer from '../../store/reducers/alarmReducer';

const initialAlarmState = {
  time: undefined,
  currentAlarmId: undefined,
  armed: false,
  loading: true,
  soundIndex: 1,
};

jest.setTimeout(10000);
describe('alarm Reducer tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('set time pending action', async () => {
    const result = alarmReducer(initialAlarmState, { type: 'ALARM_SET_TIME_PENDING' });
    expect(result).toEqual({ ...initialAlarmState, loading: true });
  });

  test('set time rejected action', async () => {
    const result = alarmReducer(initialAlarmState, { type: 'ALARM_SET_TIME_REJECTED' });
    expect(result).toEqual({ ...initialAlarmState, loading: false, time: -1 });
  });
  test('set time fulfilled action', async () => {
    const result = alarmReducer(initialAlarmState, { type: 'ALARM_SET_TIME_FULFILLED', payload: 1234 });
    expect(result).toEqual({ ...initialAlarmState, loading: false, time: 1234 });
  });

  test('set time pending action', async () => {
    const result = alarmReducer(initialAlarmState, {
      type: 'ALARM_SET_ARMED_STATUS',
      payload: { armed: true, currentAlarmId: '1' },
    });
    expect(result).toEqual({ ...initialAlarmState, armed: true, currentAlarmId: '1' });
  });
  test('default case', async () => {
    const result = alarmReducer(undefined,
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
    expect(result).toEqual(initialAlarmState);
  });
});
