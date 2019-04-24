/* eslint-disable no-undef */
/* eslint-disable import/first */

import Alarm from '../../../custom_modules/Alarm';
import Mocks from '../../../__mocks__/fetchMock';

jest.setTimeout(10000);
describe('Route Time tests', () => {
  const departureTime = new Date(2019, 3, 26, 10, 0, 0);
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('getRouteTime status = good response', async () => {
    expect.assertions(1);
    const duration = [25];

    Mocks.fetchMock(duration);
    const result = await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    expect(
      result,
    ).toEqual(duration[0]);
  });

  test('getRouteTime status = bad response', async () => {
    expect.assertions(1);
    const duration = [30];

    Mocks.fetchMockFailure(duration, 0);
    try {
      await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    } catch (e) {
      expect(e).toEqual('error');
    }
  });

  test('getRouteTime status = bad response but no error message', async () => {
    expect.assertions(1);
    fetch.mockResponse(JSON.stringify({
      status: 'rejected',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: 20 * 60,
          },
          duration: {
            value: 25 * 60,
          },
        }],
      }],
    }));

    try {
      await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    } catch (e) {
      expect(e).toEqual('Unknown error');
    }
  });

  test('getRouteTime rows undefined', async () => {
    expect.assertions(1);

    fetch.mockResponseOnce(JSON.stringify({
      status: 'OK',
    }));
    try {
      await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    } catch (e) {
      expect(e).toEqual(TypeError('Cannot read property \'length\' of undefined'));
    }
  });

  test('getRouteTime rows length 0', async () => {
    expect.assertions(1);

    fetch.mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: { length: 0 },
    }));
    try {
      await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    } catch (e) {
      expect(e).toEqual(Error('error no rows'));
    }
  });

  test('getRouteTime no duration in traffic', async () => {
    expect.assertions(1);
    const duration = [30];

    fetch.mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration: {
            value: duration * 60,
          },
        }],
      }],
    }));
    const result = await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    expect(
      result,
    ).toEqual(duration[0]);
  });

  test('getRouteTime no elements', async () => {
    expect.assertions(1);

    fetch.mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
        }],
      }],
    }));
    try {
      await Alarm.getRouteTime('Middleton, WI', 'Madison, WI', departureTime.getTime());
    } catch (e) {
      expect(e).toEqual(Error('no elements in rows'));
    }
  });
});
