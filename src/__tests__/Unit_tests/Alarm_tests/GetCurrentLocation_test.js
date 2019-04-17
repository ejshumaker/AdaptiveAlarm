/* eslint-disable no-undef */
/* eslint-disable import/first */

jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn(),
    LOCATION: '',
  },
  Location: {
    getCurrentPositionAsync: jest.fn(() => new Promise(resolve => resolve({
      coords: {
        latitude: 1234,
        longitude: 5678,
      },
    }))),
  },
}));

import { Permissions, Location } from 'expo';
import Alarm from '../../../custom_modules/Alarm';

jest.setTimeout(10000);

describe('Get Current Location Tests', () => {
  beforeEach(() => {

  });

  test('getCurrentLocation granted permission', async () => {
    expect.assertions(1);
    Permissions.askAsync.mockImplementation(() => new Promise(resolve => resolve({ status: 'granted' })));
    const result = await Alarm.getCurrentLocation();
    expect(
      result,
    ).toEqual(
      '1234, 5678',
    );
  });

  test('getCurrentLocation did not grant permission', async () => {
    expect.assertions(1);
    Permissions.askAsync.mockImplementation(() => new Promise(resolve => resolve({ status: 'denied' })));
    try {
      await Alarm.getCurrentLocation();
    } catch (e) {
      expect(e).toEqual(Error('Permission to access location was denied'));
    }
  });

  test('getCurrentLocation ask async rejection', async () => {
    expect.assertions(1);
    Permissions.askAsync.mockImplementation(() => new Promise((resolve, reject) => reject(Error('ask async error'))));
    try {
      await Alarm.getCurrentLocation();
    } catch (e) {
      expect(e).toEqual(Error('ask async error'));
    }
  });

  test('getCurrentLocation get position async rejection', async () => {
    expect.assertions(1);
    Permissions.askAsync.mockImplementation(() => new Promise(resolve => resolve({ status: 'granted' })));
    Location.getCurrentPositionAsync.mockImplementation(() => new Promise((resolve, reject) => reject(Error('get current position async error'))));
    try {
      await Alarm.getCurrentLocation();
    } catch (e) {
      expect(e).toEqual(Error('get current position async error'));
    }
  });

  afterAll(() => {

  });
});
