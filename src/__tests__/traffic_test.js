/* eslint-disable no-undef */
/* eslint-disable import/first */

import { getAlarmTimeFromLocation } from '../custom_modules/Alarm';

jest.setTimeout(10000);
describe('Alarm Calculation tests', () => {
  beforeAll(() => {
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
