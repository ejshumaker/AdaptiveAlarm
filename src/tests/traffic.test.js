/* eslint-disable no-undef */
/* import getRouteTime from '../custom_modules/getRouteTime';

test('time to and from the same location', () => expect(getRouteTime('Boston
, MA', 'Burlington, WI')).resolves.toEqual({
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
import React from 'react';
import HomeScreen from '../screens/HomeScreen';

let obj;
let fn;
describe('Travel Time tests', () => {
  beforeAll(() => {
    fn = jest.fn();
    obj = mount(<HomeScreen onPress={fn} />);
  });

  afterAll(() => {
    obj.unmount();
  });

  test('Button click returns text input value', () => {
    obj.find('Button').first().simulate('click');
    expect(fn).toHaveBeenCalledWith([61606]);
  });
});