/* eslint-disable no-undef */
/* eslint-disable import/first */

import Alarm from '../../../custom_modules/Alarm';
import Mocks from '../../../__mocks__/fetchMock';

const MILS_PER_MIN = 1000 * 60;

function expectedAlarmTimeFn(timeArray, arrivalTime, timeToGetReady, loopLimit, timeLimit) {
  let expectedTime = 0;
  let departureTime = arrivalTime.getTime();
  for (let i = 0; i < timeArray.length; i += 1) {
    if (Math.abs(departureTime + (timeArray[i] * MILS_PER_MIN)
    - arrivalTime.getTime()) <= timeLimit * MILS_PER_MIN || i >= loopLimit) {
      expectedTime = departureTime - timeToGetReady * MILS_PER_MIN;
      break;
    } else {
      departureTime = arrivalTime.getTime() - timeArray[i] * MILS_PER_MIN;
    }
  }
  return expectedTime;
}

jest.setTimeout(10000);
describe('Alarm Calculation tests', () => {
  const arrivalTime = new Date(2019, 3, 26, 10, 0, 0);
  beforeEach(() => {
    fetch.resetMocks();
    Alarm.getCurrentLocation = jest.fn().mockImplementation(() => new Promise(resolve => resolve('Madison, WI')));
  });

  test('getAlarmTime no loops', async () => {
    expect.assertions(1);
    const timeArray = [0];
    const timeToGetReady = 30;
    const loopLimit = 4;
    const timeLimit = 6;

    Mocks.fetchMock(timeArray);
    const result = await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);
    expect(
      result,
    ).toEqual(expectedAlarmTimeFn(
      timeArray,
      arrivalTime,
      timeToGetReady,
      loopLimit,
      timeLimit,
    ));
  });

  test('getAlarmTime few loops', async () => {
    expect.assertions(1);
    const timeArray = [30, 36];
    const timeToGetReady = 30;
    const loopLimit = 4;
    const timeLimit = 6;

    Mocks.fetchMock(timeArray);
    const result = await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);
    expect(
      result,
    ).toEqual(expectedAlarmTimeFn(
      timeArray,
      arrivalTime,
      timeToGetReady,
      loopLimit,
      timeLimit,
    ));
  });

  test('Check that time to get ready is reflected in result for few loops', async () => {
    expect.assertions(1);
    const timeArray = [30, 36];
    const timeToGetReady = 25;
    const loopLimit = 4;
    const timeLimit = 6;
    Mocks.fetchMock(timeArray);
    const result = await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);

    expect(
      result,
    ).toEqual(expectedAlarmTimeFn(
      timeArray,
      arrivalTime,
      timeToGetReady,
      loopLimit,
      timeLimit,
    ));
  });


  test('getAlarmTime many loops', async () => {
    expect.assertions(1);
    const timeToGetReady = 25;
    const timeArray = [30, 40, 50, 60, 50, 40, 30, 26];
    const loopLimit = 100;
    const timeLimit = 6;
    Mocks.fetchMock(timeArray);
    const result = await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);

    expect(
      result,
    ).toEqual(expectedAlarmTimeFn(
      timeArray,
      arrivalTime,
      timeToGetReady,
      loopLimit,
      timeLimit,
    ));
  });

  test('getAlarmTime loop limit reached', async () => {
    expect.assertions(1);
    const timeToGetReady = 25;
    const timeArray = [30, 40, 50, 60, 50, 40, 30, 26];
    const loopLimit = 4;
    const timeLimit = 6;
    Mocks.fetchMock(timeArray);
    const result = await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);

    expect(
      result,
    ).toEqual(expectedAlarmTimeFn(
      timeArray,
      arrivalTime,
      timeToGetReady,
      loopLimit,
      timeLimit,
    ));
  });

  test('getAlarmTime rejected fetch before loop', async () => {
    expect.assertions(1);
    const timeToGetReady = 25;
    const timeArray = [30, 40, 50, 60, 50, 40, 30, 26];
    const loopLimit = 4;
    const timeLimit = 6;

    Mocks.fetchMockFailure(timeArray, 0);
    try {
      await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);
    } catch (e) {
      expect(e).toEqual('error');
    }
  });

  test('getAlarmTime rejected fetch in first loop', async () => {
    expect.assertions(1);
    const timeToGetReady = 25;
    const timeArray = [30, 40, 50, 60, 50, 40, 30, 26];
    const loopLimit = 4;
    const timeLimit = 6;

    Mocks.fetchMockFailure(timeArray, 1);
    try {
      await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);
    } catch (e) {
      expect(e).toEqual('error');
    }
  });

  test('getAlarmTime currentLocation rejection', async () => {
    expect.assertions(1);
    const timeToGetReady = 25;
    const timeArray = [30, 40, 50, 60, 50, 40, 30, 26];
    const loopLimit = 4;
    const timeLimit = 6;
    /* eslint-disable prefer-promise-reject-errors */
    Alarm.getCurrentLocation = jest.fn().mockImplementation(() => new Promise((resolve, reject) => reject('locationError')));

    Mocks.fetchMock(timeArray);
    try {
      await Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit);
    } catch (e) {
      expect(e).toEqual('locationError');
    }
  });

  afterAll(() => {

  });
});
