/* eslint-disable no-undef */
/* eslint-disable import/first */

import Alarm from '../custom_modules/Alarm';
import Mocks from './__mocks__/fetchMock';

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

  test('getAlarmTime few loops', async () => {
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
  /*
  test('getAlarmTime rejected fetch', () => {
    const timeToGetReady = 25;
    const timeArray = [30, 40, 50, 60, 50, 40, 30, 26];
    const loopLimit = 4;
    const timeLimit = 6;

    Mocks.fetchMockFailure();
    expect(
      Alarm.getAlarmTime('Middleton, WI', timeToGetReady, arrivalTime.getTime(), loopLimit, timeLimit),
    ).toThrow();
  });
  */
  afterAll(() => {

  });
});
