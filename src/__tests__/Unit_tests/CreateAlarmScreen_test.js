
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';

import { CreateAlarmScreen } from '../../screens/CreateAlarmScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));
jest.mock('react-native-background-timer', () => jest.fn());
jest.mock('../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../assets/sounds/', () => []);


describe('CreateAlarm Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockcreateAlarmfn = jest.fn();
  const deleteAlarmMock = jest.fn();
  const getParamMock = jest.fn();
  const navigation = { navigate: jest.fn(), getParam: getParamMock };
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
    timeToGetReady: '30',
    destinationLoc: 'Middleton, WI',
    isActive: true,
    days,
  };
  const mockAlert = jest.fn();
  jest.mock('Alert', () => ({
    alert: mockAlert,
  }));
  jest.spyOn(Alert, 'alert');

  beforeAll(() => {
    Alert.alert = jest.fn();
  });
  beforeEach(() => {
    // pass the mock function as the login prop
    jest.clearAllMocks();
  });

  it('test CreateAlarm screen matches snapshot', () => {
    getParamMock.mockImplementation(() => 1);
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test CreateAlarm screen matches snapshot no alarmid', () => {
    getParamMock.mockImplementation(() => undefined);
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test CreateAlarm screen matches snapshot when loading', () => {
    getParamMock.mockImplementation(() => undefined);
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading
      deleteAlarm={deleteAlarmMock}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the create alarm action', () => {
    getParamMock.mockImplementation(() => 1);
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);

    wrapper.find('[title="Save Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockcreateAlarmfn.mock.calls.length).toBe(1);
  });

  it('check create alarm is not called when no ready time', () => {
    alarm = {
      arrivalTime: '8:00 AM',
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days,
    };
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);
    wrapper.find('[title="Save Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockcreateAlarmfn).toHaveBeenCalledTimes(0);
  });

  it('check create alarm is not called when time to get ready is not a number', () => {
    alarm = {
      arrivalTime: '8:00 AM',
      destinationLoc: 'Middleton, WI',
      timeToGetReady: 'BCD',
      isActive: true,
      days,
    };
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);
    wrapper.find('[title="Save Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockcreateAlarmfn).toHaveBeenCalledTimes(0);
  });

  it('check create alarm is not called when no repeating days', () => {
    days = {
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
    };
    alarm = {
      arrivalTime: '8:00 AM',
      destinationLoc: 'Middleton, WI',
      timeToGetReady: '30',
      isActive: true,
      days,
    };
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);
    wrapper.find('[title="Save Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockcreateAlarmfn).toHaveBeenCalledTimes(0);
  });

  it('text input new ready time', () => {
    getParamMock.mockImplementation(() => 1);
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
      timeToGetReady: '30',
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days,
    };
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);

    wrapper.find('TextInput').at(0).simulate('ChangeText', '123');
    expect(wrapper.state('readyTime')).toEqual('123');
  });

  it('text input new arrival time', () => {
    getParamMock.mockImplementation(() => 1);
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
      timeToGetReady: '30',
      destinationLoc: 'Middleton, WI',
      isActive: true,
      days,
    };
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);

    wrapper.find('TextInput').at(1).simulate('ChangeText', 'test');
    expect(wrapper.state('arrivalTime')).toEqual('test');
    wrapper.find('TextInput').at(1).simulate('SubmitEditing', { preventDefault() {} });
  });

  it('check delete alarm is called', () => {
    days = {
      sun: false,
      mon: true,
      tue: false,
      wed: false,
      thu: true,
      fri: false,
      sat: false,
    };
    alarm = {
      arrivalTime: '8:00 AM',
      destinationLoc: 'Middleton, WI',
      timeToGetReady: '30',
      isActive: true,
      days,
    };
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
      deleteAlarm={deleteAlarmMock}
      alarms={{ 1: alarm }}
    />);
    wrapper.find('[title="Delete Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });
});
