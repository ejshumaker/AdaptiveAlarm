/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MainScreen } from '../screens/MainScreen';

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);

// TODO add other components
it('test main screen contains necessary components', () => {
  const wrapper = mount(<MainScreen />);
  expect(wrapper.exists('AnalogClock')).toBe(true);
  wrapper.unmount();
});

it('test functionality of main screen', () => {

});
