
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MainScreen } from '../screens/MainScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));

Enzyme.configure({ adapter: new Adapter() });


describe('Main Screen', () => {
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

  it('User icon pressed', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('UserIcon').simulate(
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
    wrapper.find('AddIcon').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('CreateAlarm');
  });


  it('Development page pressed with alarms', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
      alarmId="1"
    />);
    wrapper.find('[title="Development Page"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('Home');
  });

  it('Development page pressed with no alarms', () => {
    wrapper = shallow(<MainScreen
      navigation={navigation}
      dismissAlarm={mockDismissAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
    />);
    wrapper.find('[title="Development Page"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
    expect(navigation.navigate.mock.calls[0][0]).toEqual('Home');
  });
});
