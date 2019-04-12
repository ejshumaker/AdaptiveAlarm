// app/src/components/__tests__/Login-test.js
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlarmItem from '../components/AlarmItem';

Enzyme.configure({ adapter: new Adapter() });
describe('Alarm Item', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const toggleAlarmMock = jest.fn();
  const alarmId = '1';
  const navigate = jest.fn();
  let days = {
    sun: true,
    mon: false,
    tue: true,
    wed: true,
    thu: false,
    fri: true,
    sat: false,
  };
  let alarm = {
    arrivalTime: '8:00 AM',
    isActive: true,
    days,
  };

  beforeEach(() => {
    // pass the mock function as the login props
    days = {
      sun: true,
      mon: false,
      tue: true,
      wed: true,
      thu: false,
      fri: true,
      sat: false,
    };
    alarm = {
      arrivalTime: '8:00 AM',
      isActive: true,
      days,
    };
    jest.clearAllMocks();
  });

  it('test alarm item matches snapshot alarm is active', () => {
    alarm.isActive = true;
    wrapper = shallow(<AlarmItem
      toggleAlarm={toggleAlarmMock}
      alarmId={alarmId}
      navigate={navigate}
      alarm={alarm}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test alarm item matches snapshot alarm is inactive', () => {
    alarm.isActive = false;
    wrapper = shallow(<AlarmItem
      toggleAlarm={toggleAlarmMock}
      alarmId={alarmId}
      navigate={navigate}
      alarm={alarm}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the handle press function and navigate to CreateAlarm', () => {
    alarm.isActive = true;
    wrapper = shallow(<AlarmItem
      toggleAlarm={toggleAlarmMock}
      alarmId={alarmId}
      navigate={navigate}
      alarm={alarm}
    />);
    wrapper.find('TouchableOpacity').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toEqual('CreateAlarm');
  });

  it('should call the sign in action', () => {
    alarm.isActive = true;
    wrapper = shallow(<AlarmItem
      toggleAlarm={toggleAlarmMock}
      alarmId={alarmId}
      navigate={navigate}
      alarm={alarm}
    />);
    wrapper.find('TouchableOpacity').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigate.mock.calls.length).toBe(1);
  });

  it('should contain None as no days are active', () => {
    alarm.days = {
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
    };
    alarm.isActive = true;
    wrapper = shallow(<AlarmItem
      toggleAlarm={toggleAlarmMock}
      alarmId={alarmId}
      navigate={navigate}
      alarm={alarm}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle alarm value', () => {
    alarm.isActive = true;
    wrapper = shallow(<AlarmItem
      toggleAlarm={toggleAlarmMock}
      alarmId={alarmId}
      navigate={navigate}
      alarm={alarm}
    />);
    toggleAlarmMock.mockImplementation(() => new Promise(resolve => resolve()));
    wrapper.find('Switch').simulate(
      'valueChange',
      { preventDefault() {} },
    );
    expect(toggleAlarmMock.mock.calls.length).toBe(1);
  });
});
