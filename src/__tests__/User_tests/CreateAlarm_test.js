/* eslint-disable no-undef */
/* eslint-disable import/first */

const mockSet = jest.fn();
const mockPush = jest.fn();

const mockRef = jest.fn(() => ({
  set: mockSet,
  push: mockPush,
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
describe('User.js -> Create Alarm tests', () => {
  let payload = {
    destinationLoc: 'Madison, WI',
    arrivalTime: new Date(2019, 3, 26, 10, 0, 0),
    timeToGetReady: 30,
    days: ['Mon', 'Tues', 'Sun'],
    isActive: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('create alarm successfully', async () => {
    mockPush.mockImplementation(() => ({
      key: 12345,
    }));
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve();
    }));
    const result = await User.updateAlarm(payload);
    expect(result).toEqual({
      destinationLoc: 'Madison, WI',
      arrivalTime: new Date(2019, 3, 26, 10, 0, 0),
      timeToGetReady: 30,
      days: ['Mon', 'Tues', 'Sun'],
      isActive: true,
      alarmId: 12345,
    });
  });

  test('create alarm successfully new payload', async () => {
    payload = {
      destinationLoc: 'Middleton, WI',
      arrivalTime: new Date(2019, 4, 26, 10, 0, 0),
      timeToGetReady: 20,
      days: ['Mon', 'Thurs', 'Sun'],
      isActive: false,
    };

    mockPush.mockImplementation(() => ({
      key: 1245,
    }));
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve();
    }));
    const result = await User.updateAlarm(payload);
    expect(result).toEqual({
      destinationLoc: 'Middleton, WI',
      arrivalTime: new Date(2019, 4, 26, 10, 0, 0),
      timeToGetReady: 20,
      days: ['Mon', 'Thurs', 'Sun'],
      alarmId: 1245,
      isActive: false,
    });
  });


  test('create alarm set failure', async () => {
    expect.assertions(1);
    mockPush.mockImplementation(() => ({
      key: 12345,
    }));
    mockSet.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('set failed'));
    }));
    mockRef.mockImplementation(() => ({
      set: mockSet,
      push: mockPush,
    }));
    try {
      await User.updateAlarm(payload);
    } catch (e) {
      expect(e).toEqual(Error('set failed'));
    }
  });


  test('create alarm with alarm id', async () => {
    payload = {
      destinationLoc: 'Middleton, WI',
      arrivalTime: new Date(2019, 4, 26, 10, 0, 0),
      timeToGetReady: 20,
      days: ['Mon', 'Thurs', 'Sun'],
      isActive: false,
      alarmId: 1245,
    };

    mockPush.mockImplementation(() => ({
      key: 1245,
    }));
    mockSet.mockImplementation(() => new Promise((resolve) => {
      resolve();
    }));
    const result = await User.updateAlarm(payload);
    expect(result).toEqual({
      destinationLoc: 'Middleton, WI',
      arrivalTime: new Date(2019, 4, 26, 10, 0, 0),
      timeToGetReady: 20,
      days: ['Mon', 'Thurs', 'Sun'],
      alarmId: 1245,
      isActive: false,
    });
  });
});
