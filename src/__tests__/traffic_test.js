/* eslint-disable no-undef */
/* eslint-disable import/first */
jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn(),
  },
  Location: {
    getCurrentPositionAsync: jest.fn(),
  },
}));

import { getAlarmTimeFromLocation } from '../custom_modules/Alarm';

jest.setTimeout(10000);
describe('Alarm Calculation tests', () => {
  beforeAll(() => {
  });
  test('works', () => {
    expect(1).toBe(1);
  });

  fetch
    .mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 30 * 60,
          },
          duration: {
            value: 25 * 60,
          },
        }],
      }],
    }))
    .mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 50 * 60,
          },
          duration: {
            value: 25 * 60,
          },
        }],
      }],
    }))
    .mockResponse(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 30 * 60,
          },
          duration: {
            value: 25 * 60,
          },
        }],
      }],
    }));
  const expectedTime = new Date(2019, 3, 26, 9, 0, 0);
  test('time to Middleton and from Madison', () => expect(
    getAlarmTimeFromLocation('Madison, WI', 'Middleton, WI', new Date(2019, 3, 26, 10, 0, 0), 30),
  ).resolves.toEqual(expectedTime.getTime()));


  afterAll(() => {

  });
});
