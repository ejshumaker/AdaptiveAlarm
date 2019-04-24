/* eslint-disable no-undef */
/* eslint-disable import/first */
import 'react-native';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DayPicker from '../../components/DayPicker';

// jest.mock('react-native-svg');

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
let wrapper = null;
const onChangeDayMock = jest.fn();
const days = {
  sun: false,
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: true,
  sat: false,
};


describe('DayPicker tests', () => {
  beforeEach(() => {
    wrapper = shallow(<DayPicker
      onChangeDay={onChangeDayMock}
      days={days}
    />);
    jest.clearAllMocks();
  });

  it('test daypicker matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('press monday', () => {
    wrapper.find('TouchableOpacity').at(0).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });

  it('press tuesday', () => {
    wrapper.find('TouchableOpacity').at(1).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });
  it('press wednesday', () => {
    wrapper.find('TouchableOpacity').at(2).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });
  it('press thursday', () => {
    wrapper.find('TouchableOpacity').at(3).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });
  it('press friday', () => {
    wrapper.find('TouchableOpacity').at(4).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });
  it('press saturday', () => {
    wrapper.find('TouchableOpacity').at(5).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });
  it('press sunday', () => {
    wrapper.find('TouchableOpacity').at(6).simulate('press', { preventDefault() {} });
    expect(onChangeDayMock).toHaveBeenCalledTimes(1);
  });

  it('no days', () => {
    const days2 = {};
    wrapper2 = shallow(<DayPicker
      onChangeDay={onChangeDayMock}
      days={days2}
    />);
    expect(wrapper2).toMatchSnapshot();
  });
  afterAll(() => {
    wrapper.unmount();
  });
});
