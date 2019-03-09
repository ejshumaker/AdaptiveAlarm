import {timeWithTraffic, timeWithoutTraffic} from '../functions/timeCalc.js'
import {getDirections} from '../functions/getDirections.js'

test('time to and from the same location', () => {
  return expect(timeWithoutTraffic('Boston, MA','Burlington, WI')).resolves.toEqual({
    distance: 1000,
    duration: 60,
  });
})
/*
test('time to and from different locations', () => {
  expect(trafficTime(1,2)).toBe(3);
});

test('time to location and from current location', () => {
  expect(trafficTime(1,2)).toBe(3);
});
*/
