// app/src/components/__tests__/Login-test.js
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AlarmListScreen } from '../../screens/AlarmListScreen';

jest.mock('../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });
describe('Alarm Item', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const toggleAlarmMock = jest.fn();
  const alarmId = '1';
  const navigation = { navigate: jest.fn() };
  const days = {
    sun: true,
    mon: false,
    tue: true,
    wed: true,
    thu: false,
    fri: true,
    sat: false,
  };
  const alarm = {
    arrivalTime: '8:00 AM',
    isActive: true,
    alarmId: { alarmId },
    days,
  };
  const alarms = {};

  beforeEach(() => {
    // pass the mock function as the login props
    jest.clearAllMocks();
  });

  it('alarm list matches snapshot alarm is loading', () => {
    alarms[alarm.alarmId] = alarm;
    wrapper = shallow(<AlarmListScreen
      toggleAlarm={toggleAlarmMock}
      navigation={navigation}
      alarms={alarms}
      loading
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('alarm list matches snapshot alarm not loading', () => {
    alarms[alarm.alarmId] = alarm;
    wrapper = shallow(<AlarmListScreen
      toggleAlarm={toggleAlarmMock}
      navigation={navigation}
      alarms={alarms}
      loading={false}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('alarm list matches snapshot multiple alarms', () => {
    const alarm2 = {
      arrivalTime: '10:00 AM',
      isActive: false,
      alarmId: '2',
      days: {
        sun: true,
        mon: false,
        tue: true,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
      },
    };
    const alarm3 = {
      arrivalTime: '10:00 PM',
      isActive: true,
      alarmId: '3',
      days: {
        sun: true,
        mon: false,
        tue: true,
        wed: false,
        thu: false,
        fri: false,
        sat: true,
      },
    };
    alarms[alarm.alarmId] = alarm;
    alarms[alarm2.alarmId] = alarm2;
    alarms[alarm3.alarmId] = alarm3;
    wrapper = shallow(<AlarmListScreen
      toggleAlarm={toggleAlarmMock}
      navigation={navigation}
      alarms={alarms}
      loading={false}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('press close', () => {
    alarms[alarm.alarmId] = alarm;
    wrapper = shallow(<AlarmListScreen
      toggleAlarm={toggleAlarmMock}
      navigation={navigation}
      alarms={alarms}
      loading={false}
    />);
    wrapper.find('TouchableOpacity').at(0).simulate(
      'press',
      { preventDefault() {} },
    );

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });
});
