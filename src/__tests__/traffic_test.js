/* eslint-disable no-undef */
/* eslint-disable import/first */

import Alarm from '../custom_modules/Alarm';

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
            value: 0 * 60,
          },
          duration: {
            value: 0 * 60,
          },
        }],
      }],
    }))
    .mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 30 * 60,
          },
          duration: {
            value: 0 * 60,
          },
        }],
      }],
    }))
    .mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 60 * 60,
          },
          duration: {
            value: 0 * 60,
          },
        }],
      }],
    }))
    .mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 20 * 60,
          },
          duration: {
            value: 0 * 60,
          },
        }],
      }],
    }))
    .mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 100 * 60,
          },
          duration: {
            value: 0 * 60,
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
            value: 0 * 60,
          },
        }],
      }],
    }));

  const expectedTime1 = new Date(2019, 3, 26, 9, 0, 0);
  const expectedTime2 = new Date(2019, 3, 26, 9, 30, 0);
  const expectedTime3 = new Date(2019, 3, 26, 7, 50, 0);
  const arrivalTime = new Date(2019, 3, 26, 10, 0, 0);
  test('Calculate Alarm time few loops', () => expect(
    Alarm.getAlarmTimeFromLocation('Madison, WI', 'Middleton, WI', 30, arrivalTime.getTime()),
  ).resolves.toEqual(expectedTime1.getTime()));

  test('Calculate Alarm time no loops', () => expect(
    Alarm.getAlarmTimeFromLocation('Madison, WI', 'Middleton, WI', 30, arrivalTime.getTime()),
  ).resolves.toEqual(expectedTime2.getTime()));

  test('Calculate Alarm time many loops (max of 4 to prevent long api call runtime)', () => expect(
    Alarm.getAlarmTimeFromLocation('Madison, WI', 'Middleton, WI', 30, arrivalTime.getTime()),
  ).resolves.toEqual(expectedTime3.getTime()));

  afterAll(() => {

  });
});
