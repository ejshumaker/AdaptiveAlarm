
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';
import Alarm from '../../custom_modules/Alarm';

import { MainScreen } from '../../screens/MainScreen';

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

const spy = jest.spyOn(Alarm, 'getWeather');

jest.mock('@expo/vector-icons', () => 'Button');
Enzyme.configure({ adapter: new Adapter() });


describe('Main Screen', () => {
  console.log = jest.fn();
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockDismissAlarmfn = jest.fn();
  const navigation = { navigate: jest.fn() };
  const time = new Date(2019, 4, 26, 10, 0, 0);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test Main screen matches snapshot', () => {
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test Main screen matches snapshot when loading', () => {
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not have dismiss button', () => {
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
    />);
    expect(wrapper.find('[title="DISMISS"]').length).toEqual(0);
  });

  it('test Main screen matches snapshot when alarm defined', () => {
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have dismiss button when alarmid is defined', () => {
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('[title="DISMISS"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockDismissAlarmfn.mock.calls.length).toBe(1);
  });

  it('Alarm List icon pressed', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('TouchableOpacity').at(0).simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('AlarmList');
  });

  it('User icon pressed', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('TouchableOpacity').at(1).simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('Account');
  });

  it('Add icon pressed', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('TouchableOpacity').at(2).simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('CreateAlarm');
  });

  it('Add icon pressed', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('TouchableOpacity').at(2).simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('CreateAlarm');
  });

  it('test Main screen matches snapshot with weather', () => {
    spy.mockImplementation(() => new Promise(resolve({ temperature: 44, weather: 'cloudy' })));
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
