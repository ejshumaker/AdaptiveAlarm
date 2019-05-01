/* eslint-disable no-undef */
/* eslint-disable import/first */
import moment from 'moment';
import User from '../../../custom_modules/User';
import store from '../../../store';

const spy = jest.spyOn(store, 'getState');

const utcMoment = moment('8:00 AM', 'LT').add(7, 'days');

global.DAY_MAP = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};


jest.setTimeout(10000);
describe('User.js -> get next alarm tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('get next alarm with only one alarm successfully', async () => {
    spy.mockImplementation(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '8:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: true,
              sat: false,
            },
          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual({
      arrivalTime: '8:00 AM',
      timeToGetReady: '30',
      alarmId: '1',
      alarmUTC: expect.anything(),
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: true,
        sat: false,
      },
    });
  });


  test('get next alarm with only two alarms successfully', async () => {
    spy.mockImplementationOnce(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '8:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: true,
              sat: false,
            },
          },
          2: {
            arrivalTime: '9:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: true,
              sat: false,
            },
          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual({
      arrivalTime: '8:00 AM',
      timeToGetReady: '30',
      alarmId: '1',
      alarmUTC: expect.anything(),
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: true,
        sat: false,
      },
    });
  });


  test('return undefined when no alarms', async () => {
    spy.mockImplementationOnce(() => ({
      user: {

      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual(undefined);
  });

  test('get next alarm with second alarm before first', async () => {
    spy.mockImplementationOnce(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '10:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: true,
              sat: false,
            },
          },
          2: {
            arrivalTime: '8:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: true,
              sat: false,
            },
          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual({
      arrivalTime: '8:00 AM',
      timeToGetReady: '30',
      alarmId: '2',
      alarmUTC: expect.anything(),
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: true,
        sat: false,
      },
    });
  });

  test('get next alarm with second alarm before first on different days', async () => {
    spy.mockImplementationOnce(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '10:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: true,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false,
            },
          },
          2: {
            arrivalTime: '8:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: true,
            },
          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual({
      arrivalTime: '8:00 AM',
      timeToGetReady: '30',
      alarmId: '2',
      alarmUTC: expect.anything(),
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: true,
      },
    });
  });


  test('get alarm with time for later on current day', async () => {
    spy.mockImplementationOnce(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '11:59 PM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: true,
              sat: false,
            },
          },
          2: {
            arrivalTime: '8:00 AM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: true,
            },
          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual({
      arrivalTime: '11:59 PM',
      timeToGetReady: '30',
      alarmId: '1',
      alarmUTC: expect.anything(),
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: true,
        sat: false,
      },
    });
  });

  test('returns undefined when no armed alarms', async () => {
    spy.mockImplementationOnce(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '11:59 PM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,
            days: {
              sun: false,
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false,
            },
          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual(undefined);
  });

  test('returns undefined when no days', async () => {
    spy.mockImplementationOnce(() => ({
      user: {
        alarms: {
          1: {
            arrivalTime: '11:59 PM',
            timeToGetReady: '30',
            destinationLoc: 'Middleton, WI',
            isActive: true,

          },
        },
      },
    }));
    const result = User.getNextAlarm();
    expect(result).toEqual(undefined);
  });
});
