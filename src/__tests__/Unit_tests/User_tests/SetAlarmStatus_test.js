/* eslint-disable no-undef */
/* eslint-disable import/first */

const mockSet = jest.fn();

const mockRef = jest.fn(() => ({
  set: mockSet,
}));

const mockDatabase = ({
  ref: mockRef,
});

const mockAuth = ({
  currentUser: ({
    email: 'test@gmail.com',
    password: 'pass',
    uid: 1234,
  }),
});

jest.mock('firebase', () => ({
  auth: jest.fn(() => mockAuth),
  database: jest.fn(() => mockDatabase),
}));

import User from '../../../custom_modules/User';

jest.setTimeout(10000);
describe('User.js -> Set Alarm Status tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('set alarm status successfully, status = true', async () => {
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve({
        isActive: true,
      });
    }));
    const result = await User.setAlarmStatus(1, true);
    expect(result).toEqual({
      alarmId: 1,
      status: true,
    });
  });

  test('set alarm status successfully, status = false', async () => {
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve({
        isActive: true,
      });
    }));
    const result = await User.setAlarmStatus(1, false);
    expect(result).toEqual({
      alarmId: 1,
      status: false,
    });
  });

  test('set alarm status successfully, new alarm id', async () => {
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve({
        isActive: true,
      });
    }));
    const result = await User.setAlarmStatus(2, true);
    expect(result).toEqual({
      alarmId: 2,
      status: true,
    });
  });

  test('set alarm status failure', async () => {
    expect.assertions(1);
    mockSet.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('set error'));
    }));
    try {
      await User.setAlarmStatus(2, true);
    } catch (e) {
      expect(e).toEqual(Error('set error'));
    }
  });

  test('ref parameters', async () => {
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve({
        isActive: true,
      });
    }));
    await User.setAlarmStatus(1, true);
    expect(mockRef).toHaveBeenCalledTimes(1);
    expect(mockRef).toHaveBeenLastCalledWith('users/1234/alarms/1/isActive');

    await User.setAlarmStatus(2, true);
    expect(mockRef).toHaveBeenLastCalledWith('users/1234/alarms/2/isActive');
  });

  test('set parameters', async () => {
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve({
        isActive: true,
      });
    }));
    await User.setAlarmStatus(1, true);
    expect(mockSet).toHaveBeenCalledTimes(1);
    expect(mockSet).toHaveBeenLastCalledWith(true);

    await User.setAlarmStatus(2, false);
    expect(mockSet).toHaveBeenLastCalledWith(false);
  });
});
