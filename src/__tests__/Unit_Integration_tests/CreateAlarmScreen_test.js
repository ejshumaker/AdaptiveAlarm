
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';
import store from '../../store';

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
  const fetchDataMock = jest.fn();
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
    arrivalTime: '9:00 AM',
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
    const RealDate = Date;
    /* eslint no-global-assign:off */
    const constantDate = new Date(2020, 3, 26, 10, 0, 0);
    global.Date = class extends global.Date {
      constructor() {
        return constantDate;
      }
    };
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
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
      fetchData={fetchDataMock}
    />);

    wrapper.find('TextInput').at(0).simulate('ChangeText', '123');
    expect(wrapper.state('readyTime')).toEqual('123');
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
      fetchData={fetchDataMock}
    />);
    wrapper.find('[title="Delete Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });

  it('check import calendar error', () => {
    console.log = jest.fn();
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
      fetchData={fetchDataMock}
    />);
    wrapper.find('[title="Import Calendar?"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    Alert.alert.mock.calls[0][2][1].onPress();
  });

  it('check press close icon', () => {
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
      fetchData={fetchDataMock}
    />);
    wrapper.find('TouchableOpacity').at(0).simulate(
      'press',
      { preventDefault() {} },
    );

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  it('check press arrival time', () => {
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
      fetchData={fetchDataMock}
    />);
    wrapper.find('TouchableOpacity').at(1).simulate(
      'press',
      { preventDefault() {} },
    );

    expect(wrapper.state('isTimePickerVisible')).toEqual(true);
  });

  it('check press picker', () => {
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
      fetchData={fetchDataMock}
    />);
    wrapper.find('RNPickerSelect').at(0).simulate(
      'valueChange',
      ('test', 1),
    );

    expect(navigation.navigate).toHaveBeenCalledTimes(0);
  });

  it('check Transportation picker', () => {
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
      fetchData={fetchDataMock}
    />);
    wrapper.find('RNPickerSelect').at(1).simulate(
      'valueChange',
      ('test', 1),
    );

    expect(navigation.navigate).toHaveBeenCalledTimes(0);
  });

  afterAll(() => {
    global.Date = RealDate;
  });
});
