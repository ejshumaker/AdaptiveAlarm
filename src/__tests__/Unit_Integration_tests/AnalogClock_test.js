/* eslint-disable no-undef */
/* eslint-disable import/first */
import 'react-native';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AnalogClock from '../../components/AnalogClock';

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
let wrapper = null;
jest.useFakeTimers();
describe('Analog Clock tests', () => {
  beforeAll(() => {
    wrapper = mount(<AnalogClock />);
  });
  it('test clock time is shown for 12:15', () => {
    wrapper.setState({
      min: 15,
      hour: 12,
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('test clock time is shown for 00:00', () => {
    wrapper.setState({
      min: 0,
      hour: 0,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('test clock time without curved hands', () => {
    wrapper.setState({
      min: 0,
      hour: 0,
    });
    wrapper.setProps({
      minuteHandCurved: false,
      hourHandCurved: false,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('test clock time is advanced by timer', () => {
    wrapper.setState({
      min: 0,
      hour: 0,
    });
    jest.advanceTimersByTime(1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(59000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  afterAll(() => {
    wrapper.unmount();
  });
});
