/* eslint-disable no-undef */
import getRouteTime from '../custom_modules/getRouteTime';

test('time to and from the same location', () => expect(getRouteTime('Boston, MA', 'Burlington, WI')).resolves.toEqual({
  distance: 1000,
  duration: 60,
}));
/*
test('time to and from different locations', () => {
  expect(trafficTime(1,2)).toBe(3);
});

test('time to location and from current location', () => {
  expect(trafficTime(1,2)).toBe(3);
});
*/
