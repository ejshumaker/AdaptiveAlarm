/* eslint-disable no-undef */
/* eslint-disable import/first */

const mockRemove = jest.fn();

const mockRef = jest.fn(() => ({
  remove: mockRemove,
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

import User from '../../custom_modules/User';


jest.setTimeout(10000);
describe('User.js -> fetch tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('remove successfully', async () => {
    mockRemove.mockImplementation(() => new Promise((resolve) => {
      resolve();
    }));
    const result = await User.deleteAlarm(1);
    expect(result).toEqual(true);
  });
  test('remove failed', async () => {
    expect.assertions(1);
    mockRemove.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('remove failed'));
    }));
    try {
      await User.deleteAlarm(1);
    } catch (e) {
      expect(e).toEqual(Error('remove failed'));
    }
  });

  test('check ref parameters', async () => {
    mockRemove.mockImplementation(() => new Promise((resolve) => {
      resolve(true);
    }));
    await User.deleteAlarm(1);
    expect(mockRef).toHaveBeenCalledTimes(1);
    expect(mockRef).toHaveBeenLastCalledWith('users/1234/alarms/1');

    await User.deleteAlarm(2);
    expect(mockRef).toHaveBeenLastCalledWith('users/1234/alarms/2');
  });
});
